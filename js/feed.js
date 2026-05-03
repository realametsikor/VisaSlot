/**
 * js/feed.js
 * Updated with Bulletproof Safety Checks, Backend Filtering, and Pagination
 */

let globalFeedData = [];
let currentPage = 0;
const ITEMS_PER_PAGE = 15;

document.addEventListener('DOMContentLoaded', () => {
    fetchFeedData(false);
    
    // Listen for filter changes
    const searchInput = document.getElementById('searchInput');
    const countryFilter = document.getElementById('countryFilter');
    const visaFilter = document.getElementById('visaFilter');
    
    if (searchInput) searchInput.addEventListener('input', () => debounce(applyFilters, 500)());
    if (countryFilter) countryFilter.addEventListener('change', applyFilters);
    if (visaFilter) visaFilter.addEventListener('change', applyFilters);
});

let timeoutId;
function debounce(func, delay) {
    return function() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func();
        }, delay);
    };
}

function applyFilters() {
    currentPage = 0; 
    
    const feedContainer = document.getElementById('feedContainer');
    const loadingState = document.getElementById('loadingState');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (feedContainer) feedContainer.innerHTML = ''; 
    if (loadingState) loadingState.style.display = 'block';
    if (loadMoreBtn) loadMoreBtn.style.display = 'none';
    
    fetchFeedData(false);
}

function loadMore() {
    currentPage++;
    const btn = document.getElementById('loadMoreBtn');
    if (btn) {
        btn.textContent = 'Loading...';
        btn.disabled = true;
    }
    fetchFeedData(true); 
}

async function fetchFeedData(isLoadMore) {
    try {
        const searchTerm = document.getElementById('searchInput') ? document.getElementById('searchInput').value.trim() : '';
        const country = document.getElementById('countryFilter') ? document.getElementById('countryFilter').value : 'all';
        const visa = document.getElementById('visaFilter') ? document.getElementById('visaFilter').value : 'all';

        const from = currentPage * ITEMS_PER_PAGE;
        const to = from + ITEMS_PER_PAGE - 1;

        let query = supabaseClient
            .from('slot_reports')
            .select('*', { count: 'exact' }) 
            .order('reported_at', { ascending: false })
            .range(from, to);

        if (searchTerm) {
            query = query.ilike('embassy', `%${searchTerm}%`);
        }
        if (country !== 'all') {
            query = query.eq('country', country);
        }
        if (visa !== 'all') {
            query = query.eq('visa_category', visa);
        }

        const { data, error, count } = await query;

        if (error) throw error;

        if (data) {
            if (isLoadMore) {
                globalFeedData = [...globalFeedData, ...data]; 
            } else {
                globalFeedData = data; 
            }

            updateLiveFeed(globalFeedData);
            updateStatusBoard(globalFeedData); 
            updateStatsCounter(globalFeedData);

            // Safety check: only manipulate the button if it exists in the HTML
            const loadMoreBtn = document.getElementById('loadMoreBtn');
            if (loadMoreBtn) {
                if (count !== null && globalFeedData.length < count) {
                    loadMoreBtn.style.display = 'block';
                    loadMoreBtn.textContent = 'Load More Slots';
                    loadMoreBtn.disabled = false;
                } else {
                    loadMoreBtn.style.display = 'none';
                }
            }
        }
        
        const loadingState = document.getElementById('loadingState');
        if (loadingState) loadingState.style.display = 'none';

    } catch (error) {
        console.error("Error fetching feed data:", error);
        const loadingState = document.getElementById('loadingState');
        if (loadingState) {
            loadingState.innerHTML = '<p style="color: #ef4444;">Error loading live slots. Please try again.</p>';
        }
    }
}

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
