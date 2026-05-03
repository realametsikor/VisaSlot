/**
 * js/feed.js
 * Merged: Bulletproof Safety Checks, Backend Filtering, Pagination, and Trust System!
 */

// --- TRUST SYSTEM SETUP ---
// Generate a unique ID for the browser so users can't spam-vote the same slot
let localVoterId = localStorage.getItem('visaslot_voter_id');
if (!localVoterId) {
    localVoterId = 'voter_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('visaslot_voter_id', localVoterId);
}

// --- GLOBAL VARIABLES ---
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
    if (loadingState) loadingState.style.display = 'flex'; // Use flex to center spinner
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

        // Fetching from supabaseClient using YOUR correct column: reported_at
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

            // Safety check: only manipulate the button if it exists
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
            // Added detailed error output for easier debugging
            loadingState.innerHTML = `<p style="color: #ef4444; padding: 20px;">Error loading slots: ${error.message}</p>`;
        }
    }
}

function updateStatsCounter(data) {
    // If you ever add the stats counter elements back to HTML, this will populate them
    const statEmbassies = document.getElementById('statEmbassies');
    const statSlots = document.getElementById('statSlots');
    const statReports = document.getElementById('statReports');

    if (statEmbassies && statSlots && statReports) {
        const uniqueEmbassies = new Set(data.map(item => item.embassy)).size;
        const slotsToday = data.filter(item => item.slot_found === true).length;
        
        statEmbassies.textContent = uniqueEmbassies;
        statSlots.textContent = slotsToday;
        statReports.textContent = data.length;
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
        const countryText = row.country ? `, ${row.country}` : '';

        html += `
            <div class="status-row">
                <div class="status-embassy">📍 ${row.embassy}${countryText}</div>
                <div class="status-meta" style="display: flex; gap: 8px; align-items: center;">
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
        const countryText = report.country ? `, ${report.country}` : '';
        
        // Date Display
        const dateDisplay = report.slot_found 
            ? `<span class="badge badge-date">📅 Seen for: ${formatDate(report.slot_date_seen)}</span>`
            : `<span class="badge" style="background: #e2e8f0; color: var(--text-secondary);">Checked — no slots</span>`;

        // Trust System: Calculate Confidence Score & Badge
        const score = report.confidence_score !== undefined ? report.confidence_score : 100;
        let badgeHtml = '';
        if (score >= 110) {
            badgeHtml = `<span class="freshness-badge fresh-hot">🔥 High Trust (${score})</span>`;
        } else if (score >= 80) {
            badgeHtml = `<span class="freshness-badge fresh-good">✔️ Verified (${score})</span>`;
        } else {
            badgeHtml = `<span class="freshness-badge fresh-stale">⚠️ Low Trust (${score})</span>`;
        }

        // Trust System: Voting Buttons (Only show voting if a slot was actually found)
        let trustActionsHtml = '';
        if (report.slot_found) {
            trustActionsHtml = `
                <div class="trust-actions">
                    <button class="btn-vote vote-up" onclick="submitVote('${report.id}', 'available')">
                        👍 Still Available
                    </button>
                    <button class="btn-vote vote-down" onclick="submitVote('${report.id}', 'gone')">
                        👎 Gone
                    </button>
                </div>
            `;
        }

        html += `
            <div class="slot-card ${cardClass}">
                <div class="slot-header" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <div class="slot-title" style="font-size: 1.1rem; font-weight: 700;">
                        ${report.embassy}${countryText} ${badgeHtml}
                    </div>
                    <div class="slot-time" style="font-size: 0.8rem; color: var(--text-secondary);">${timeAgo}</div>
                </div>
                <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 12px;">
                    ${dateDisplay}
                    <span class="badge badge-visa" style="background: var(--surface2); border: 1px solid var(--border-hard);">${report.visa_category}</span>
                </div>
                <div class="reporter-icon" style="font-size: 0.85rem; color: var(--text-muted);">
                    👤 Checked by a human
                </div>
                ${trustActionsHtml}
            </div>
        `;
    });

    feedContainer.innerHTML = html;
}

// --- TRUST SYSTEM: VOTE SUBMISSION ---
window.submitVote = async function(reportId, voteType) {
    try {
        // We use YOUR supabaseClient instance
        const { error } = await supabaseClient.rpc('submit_vote', {
            p_report_id: reportId,
            p_voter_id: localVoterId,
            p_vote_type: voteType
        });

        if (error) {
            if (error.code === '23505' || error.message.includes('duplicate key')) {
                alert('You have already voted on this report. Thank you!');
            } else {
                console.error('Database Error:', error);
                alert('Failed to submit vote: ' + error.message);
            }
            return;
        }

        alert('Vote recorded! Your feedback helps the community.');
        
        // Reload the feed to show updated confidence scores
        applyFilters(); 

    } catch (err) {
        console.error('Unexpected error:', err);
    }
};

// --- HELPER FUNCTIONS ---
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
    if (interval > 1) return Math.floor(interval) + " mins ago";
    return "Just now";
}

function formatDate(dateString) {
    if (!dateString) return 'Unknown Date';
    // Ensure we parse the date correctly by appending time if missing to avoid timezone shifts
    const d = new Date(dateString.includes('T') ? dateString : dateString + 'T12:00:00');
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}
