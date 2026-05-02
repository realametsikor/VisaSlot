/**
 * js/feed.js
 */

// NEW: Global array to hold our data for instant frontend filtering
let globalFeedData = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchFeedData();
    setInterval(fetchFeedData, 60000);
    
    // NEW: Add event listeners to our filter inputs
    document.getElementById('searchInput').addEventListener('input', applyFilters);
    document.getElementById('countryFilter').addEventListener('change', applyFilters);
    document.getElementById('visaFilter').addEventListener('change', applyFilters);
});

async function fetchFeedData() {
    try {
        const { data, error } = await supabaseClient
            .from('slot_reports')
            .select('*')
            .order('reported_at', { ascending: false });

        if (error) throw error;

        if (data) {
            // NEW: Store data globally, then apply filters before updating the feed
            globalFeedData = data; 
            
            updateStatsCounter(data);
            updateStatusBoard(data);
            applyFilters(); 
            
            document.getElementById('loadingState').style.display = 'none';
        }
    } catch (error) {
        console.error("Error fetching feed data:", error);
        document.getElementById('loadingState').innerHTML = '<p>Error loading live slots. Please try again.</p>';
    }
}

// NEW: Filtering Logic
function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const country = document.getElementById('countryFilter').value;
    const visa = document.getElementById('visaFilter').value;

    const filteredData = globalFeedData.filter(report => {
        // Check if embassy name matches the search text
        const matchesSearch = report.embassy.toLowerCase().includes(searchTerm);
        // Check if country matches (or if 'all' is selected)
        const matchesCountry = country === 'all' || report.country === country;
        // Check if visa matches (or if 'all' is selected)
        const matchesVisa = visa === 'all' || report.visa_category === visa;

        return matchesSearch && matchesCountry && matchesVisa;
    });

    updateLiveFeed(filteredData);
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
        counterElement.textContent = `${uniqueEmbassies} embassies watched · ${slotsToday} slots reported today`;
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
        boardContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary); font-size: 0.9rem; padding: 1rem 0;">No embassy checks reported yet.</p>';
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
        feedContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">No slots match your search. Be the first to report!</p>';
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
