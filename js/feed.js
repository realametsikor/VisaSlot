/**
 * js/feed.js
 * 
 * Purpose: Handles fetching, processing, and displaying live slot data on index.html.
 * Dependencies: Requires supabaseClient to be initialized globally (via js/supabase.js).
 */

// Run when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initial data fetch
    fetchFeedData();

    // Set up auto-refresh every 60 seconds (60,000 milliseconds)
    setInterval(fetchFeedData, 60000);
    
    // Optional: Set up Supabase Realtime for instant updates on INSERT
    setupRealtimeSubscription();
});

/**
 * Main function to fetch data from Supabase and update all UI sections
 */
async function fetchFeedData() {
    try {
        // Fetch all reports, ordered by newest first
        const { data, error } = await supabaseClient
            .from('slot_reports')
            .select('*')
            .order('reported_at', { ascending: false });

        if (error) throw error;

        if (data) {
            updateStatsCounter(data);
            updateStatusBoard(data);
            updateLiveFeed(data);
            
            // Hide the loading spinner on the live feed
            document.getElementById('loadingState').style.display = 'none';
        }
    } catch (error) {
        console.error("Error fetching feed data:", error);
        document.getElementById('loadingState').innerHTML = '<p>Error loading live slots. Please try again.</p>';
    }
}

/**
 * 1. Updates the Hero Stats Counter
 * "X embassies watched · Y slots reported today"
 */
function updateStatsCounter(data) {
    // Calculate unique embassies using a Set
    const uniqueEmbassies = new Set(data.map(item => item.embassy)).size;

    // Calculate slots reported today
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of today

    const slotsToday = data.filter(item => {
        const reportDate = new Date(item.reported_at);
        // Only count if slot_found is true AND it was reported today
        return item.slot_found === true && reportDate >= today;
    }).length;

    const counterElement = document.getElementById('statsCounter');
    if (counterElement) {
        counterElement.textContent = `${uniqueEmbassies} embassies watched · ${slotsToday} slots reported today`;
    }
}

/**
 * 2. Updates the "Embassy Watch" Status Board
 * Groups by embassy + visa category, takes the newest report.
 */
function updateStatusBoard(data) {
    const boardContainer = document.getElementById('statusBoardContainer');
    if (!boardContainer) return;

    // Grouping logic to find the latest report per embassy + visa category
    const latestReports = {};

    data.forEach(report => {
        const key = `${report.embassy}-${report.visa_category}`;
        // Since data is ordered DESC, the first one we hit for a key is the newest
        if (!latestReports[key]) {
            latestReports[key] = report;
        }
    });

    // Convert object back to array, sort by reported_at DESC, limit to 10
    const boardRows = Object.values(latestReports)
        .sort((a, b) => new Date(b.reported_at) - new Date(a.reported_at))
        .slice(0, 10);

    if (boardRows.length === 0) {
        boardContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary); font-size: 0.9rem; padding: 1rem 0;">No embassy checks reported yet.</p>';
        return;
    }

    // Generate HTML for the rows
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

/**
 * 3. Updates the Live Feed Section
 * Generates cards based on whether a slot was found or not.
 */
function updateLiveFeed(data) {
    const feedContainer = document.getElementById('feedContainer');
    if (!feedContainer) return;

    if (data.length === 0) {
        feedContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">No slots reported yet. Be the first to report!</p>';
        return;
    }

    let html = '';
    data.forEach(report => {
        const timeAgo = timeSince(new Date(report.reported_at));
        
        // Determine card styling based on slot_found boolean
        const cardClass = report.slot_found ? 'found' : 'empty';
        
        // If slot found, show the date. If not, show "Checked — no slots"
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

/**
 * Optional: Supabase Realtime Subscription
 * Listens for new rows added to slot_reports and refreshes the feed.
 */
function setupRealtimeSubscription() {
    try {
        supabaseClient
            .channel('public:slot_reports')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'slot_reports' }, payload => {
                console.log('New report detected in realtime!', payload);
                fetchFeedData(); // Re-fetch to update UI smoothly
            })
            .subscribe();
    } catch (error) {
        console.error("Realtime subscription failed:", error);
    }
}

/**
 * Helper Utility: Calculates "Time Ago" string
 */
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

/**
 * Helper Utility: Formats date string safely
 */
function formatDate(dateString) {
    if (!dateString) return 'Unknown Date';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}
