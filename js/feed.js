// js/feed.js

const feedContainer = document.getElementById('feedContainer');

// 1. Set up a local Voter ID for the MVP Trust System
// This creates a unique ID for the browser session so users can't vote twice
let localVoterId = localStorage.getItem('visaslot_voter_id');
if (!localVoterId) {
    // Generate a random ID like 'voter_x8y9z0...'
    localVoterId = 'voter_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('visaslot_voter_id', localVoterId);
}

// 2. Fetch the feed from Supabase
async function loadFeed() {
    if (!feedContainer) return;
    
    try {
        // Fetch reports, ordering by latest first
        const { data: slots, error } = await supabase
            .from('slot_reports')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(20);

        if (error) throw error;

        feedContainer.innerHTML = ''; // Clear loading spinner

        if (slots.length === 0) {
            feedContainer.innerHTML = '<div class="loading-state">No slots reported yet. Be the first!</div>';
            return;
        }

        // Render each card
        slots.forEach(slot => {
            const card = createSlotCard(slot);
            feedContainer.appendChild(card);
        });

    } catch (err) {
        console.error('Error loading feed:', err);
        feedContainer.innerHTML = '<div class="loading-state">Error loading live feed.</div>';
    }
}

// 3. Create the HTML for each slot card
function createSlotCard(slot) {
    const div = document.createElement('div');
    // Assign class based on whether it's an available slot or an empty report
    const isFound = slot.slot_found !== false; 
    div.className = `slot-card ${isFound ? 'found' : 'not-found'}`;

    // Calculate a simple "Time Ago" label
    const reportTime = new Date(slot.created_at || Date.now());
    const timeDiffMins = Math.floor((new Date() - reportTime) / 60000);
    const timeLabel = timeDiffMins < 1 ? 'Just now' : `${timeDiffMins} mins ago`;
    
    // Determine the Freshness Badge based on our new Confidence Score
    let badgeHtml = '';
    const score = slot.confidence_score || 100;
    
    if (score >= 110) {
        badgeHtml = `<span class="freshness-badge fresh-hot">🔥 High Trust (${score})</span>`;
    } else if (score >= 80) {
        badgeHtml = `<span class="freshness-badge fresh-good">✔️ Verified (${score})</span>`;
    } else {
        badgeHtml = `<span class="freshness-badge fresh-stale">⚠️ Low Trust (${score})</span>`;
    }

    // Inject the HTML layout matching your CSS
    div.innerHTML = `
        <div class="card-header">
            <div class="card-embassy">${slot.embassy || 'Unknown Location'} ${badgeHtml}</div>
            <div class="card-time">${timeLabel}</div>
        </div>
        <div class="card-tags">
            <span class="tag tag-category">${slot.visa_category || 'Any Visa'}</span>
            ${slot.slot_date_seen ? `<span class="tag tag-date">🗓️ Seen for: ${slot.slot_date_seen}</span>` : ''}
        </div>
        
        <!-- TRUST UI ACTIONS -->
        <div class="trust-actions">
            <button class="btn-vote vote-up" onclick="submitVote('${slot.id}', 'available')">
                👍 Still Available
            </button>
            <button class="btn-vote vote-down" onclick="submitVote('${slot.id}', 'gone')">
                👎 Gone
            </button>
        </div>
    `;
    return div;
}

// 4. Handle the Vote submission securely
window.submitVote = async function(reportId, voteType) {
    try {
        // Call the custom database function we just wrote
        const { error } = await supabase.rpc('submit_vote', {
            p_report_id: reportId,
            p_voter_id: localVoterId,
            p_vote_type: voteType
        });

        if (error) {
            // Check for the UNIQUE constraint violation (code 23505)
            if (error.code === '23505' || error.message.includes('duplicate key')) {
                alert('You have already voted on this report. Thank you!');
            } else {
                console.error('Database Error:', error);
                alert('Failed to submit vote. Please try again.');
            }
            return;
        }

        // Success! 
        alert('Vote recorded! Your feedback helps the community.');
        
        // Reload the feed to display the newly calculated confidence score
        loadFeed(); 

    } catch (err) {
        console.error('Unexpected error:', err);
    }
};

// Initialize the feed when the page loads
document.addEventListener('DOMContentLoaded', loadFeed);
