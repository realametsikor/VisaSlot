/**
 * js/feed.js
 * Updated with Backend Filtering and Pagination
 */

let globalFeedData = [];
let currentPage = 0;
const ITEMS_PER_PAGE = 15;

document.addEventListener('DOMContentLoaded', () => {
    fetchFeedData(false); // false means "do not append, this is a fresh load"
    
    // Listen for filter changes, but now they trigger a fresh backend search
    document.getElementById('searchInput').addEventListener('input', () => debounce(applyFilters, 500)());
    document.getElementById('countryFilter').addEventListener('change', applyFilters);
    document.getElementById('visaFilter').addEventListener('change', applyFilters);
});

// A simple debounce function so we don't spam the database on every single keystroke
let timeoutId;
function debounce(func, delay) {
    return function() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func();
        }, delay);
    };
}

// Triggered when a user types or uses a dropdown
function applyFilters() {
    currentPage = 0; // Reset to page 0 when searching
    document.getElementById('feedContainer').innerHTML = ''; // Clear current feed
    document.getElementById('loadingState').style.display = 'block';
    document.getElementById('loadMoreBtn').style.display = 'none';
    fetchFeedData(false);
}

// Triggered by the "Load More" button
function loadMore() {
    currentPage++;
    const btn = document.getElementById('loadMoreBtn');
    btn.textContent = 'Loading...';
    btn.disabled = true;
    fetchFeedData(true); // true means "append data to existing list"
}

// Main fetch function handling filters and pagination
async function fetchFeedData(isLoadMore) {
    try {
        const searchTerm = document.getElementById('searchInput').value.trim();
        const country = document.getElementById('countryFilter').value;
        const visa = document.getElementById('visaFilter').value;

        // Calculate our range for pagination
        const from = currentPage * ITEMS_PER_PAGE;
        const to = from + ITEMS_PER_PAGE - 1;

        // 1. Build the Supabase Query dynamically
        let query = supabaseClient
            .from('slot_reports')
            .select('*', { count: 'exact' }) // Ask Supabase for the total count of matching rows
            .order('reported_at', { ascending: false })
            .range(from, to);

        // 2. Add filters to the backend query if they exist
        if (searchTerm) {
            query = query.ilike('embassy', `%${searchTerm}%`); // Case-insensitive search
        }
        if (country !== 'all') {
            query = query.eq('country', country);
        }
        if (visa !== 'all') {
            query = query.eq('visa_category', visa);
        }

        // 3. Execute the query
        const { data, error, count } = await query;

        if (error) throw error;

        if (data) {
            if (isLoadMore) {
                globalFeedData = [...globalFeedData, ...data]; // Append new data
            } else {
                globalFeedData = data; // Replace with fresh data
            }

            // Update UI
            updateLiveFeed(globalFeedData);
            updateStatusBoard(globalFeedData); 
            
            // Note: In a production app, you might want a separate query for the total stats counter 
            // so it isn't limited by our 15-item pagination, but we will use the local data for now to keep it simple!
            updateStatsCounter(globalFeedData);

            // Handle "Load More" button visibility
            const loadMoreBtn = document.getElementById('loadMoreBtn');
            if (globalFeedData.length < count) {
                loadMoreBtn.style.display = 'block';
                loadMoreBtn.textContent = 'Load More Slots';
                loadMoreBtn.disabled = false;
            } else {
                loadMoreBtn.style.display = 'none';
            }
        }
        
        document.getElementById('loadingState').style.display = 'none';

    } catch (error) {
        console.error("Error fetching feed data:", error);
        document.getElementById('loadingState').innerHTML = '<p style="color: red;">Error loading live slots. Please try again.</p>';
    }
}

// --- The UI rendering functions below remain unchanged ---

function updateStatsCounter(data) {
    const uniqueEmbassies = new Set(data.map(item => item.embassy)).size;
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    const slotsToday = data.filter(item => {
        const reportDate = new Date(item.reported_at);
        return item.slot_found === true && reportDate >= today;
    }).length;

    const counterElement = document.getElementById('statsCounter');
    if (counterElement) {
        counterElement.textContent = `Viewing ${uniqueEmbassies} embassies · ${slotsToday} slots reported today (in this view)`;
    }
}

function updateStatusBoard(data) {
    const boardContainer = document.getElementById('statusBoardContainer');
    if (!boardContainer) return;

    const latestReports = {};
    data.forEach(report => {
        const key = `${report.embassy}-${report.visa_category}`;
        if (!latestReports[key]) {
            latestReports[key] = report;
        }
    });

    const boardRows = Object.values(latestReports)
        .sort((a, b) => new Date(b.reported_at) - new Date(a.reported_at))
        .slice(0, 10);

    if (boardRows.length === 0) {
        boardContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary); font-size: 0.9rem; padding: 1rem 0;">No embassy checks found.</p>';
        return;
    }

    let html = '';
    boardRows.forEach(row => {
        const timeAgo = timeSince(new Date(row.reported_at));
        const statusClass = row.slot_found ? 'status-green' : 'status-red';
        const statusText = row.slot_found ? 'Slot Available 🟢' : 'No Slots 🔴';

        html += `
            <div class="status-row">
                <div class="status-embassy">📍 ${row.embassy}, ${row.country}</div>
                <div class="status-meta">
                    <span>${row.visa_category}</span>
                    <span>${timeAgo}</span>
                    <span class="status-badge ${statusClass}">${statusText}</span>
                </div>
            </div>
        `;
    });

    boardContainer.innerHTML = html;
}

function updateLiveFeed(data) {
    const feedContainer = document.getElementById('feedContainer');
    if (!feedContainer) return;

    if (data.length === 0) {
        feedContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">No slots match your search.</p>';
        return;
    }

    let html = '';
    data.forEach(report => {
        const timeAgo = timeSince(new Date(report.reported_at));
        const cardClass = report.slot_found ? 'found' : 'empty';
        
        const dateDisplay = report.slot_found 
            ? `<span class="badge badge-date">📅 ${formatDate(report.slot_date_seen)}</span>`
            : `<span class="badge" style="background: #e2e8f0; color: var(--text-secondary);">Checked — no slots</span>`;

        html += `
            <div class="slot-card ${cardClass}">
                <div class="slot-header">
                    <div class="slot-title">${report.embassy}, ${report.country}</div>
                    <div class="slot-time">${timeAgo}</div>
                </div>
                <div style="display: flex; gap: 0.5rem; align-items: center;">
                    ${dateDisplay}
                    <span class="badge badge-visa">${report.visa_category}</span>
                </div>
                <div class="reporter-icon">
                    👤 Checked by a human
                </div>
            </div>
        `;
    });

    feedContainer.innerHTML = html;
}

function timeSince(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
}

function formatDate(dateString) {
    if (!dateString) return 'Unknown Date';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}
