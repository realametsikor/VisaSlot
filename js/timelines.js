/**
 * js/timelines.js
 * 
 * Purpose: Handles the submission of visa processing timelines and renders 
 *          the average processing time chart using Chart.js.
 * Dependencies: Requires supabaseClient from js/supabase.js and Chart.js CDN.
 */

// Store the chart instance globally so we can destroy/re-render it when new data is added
let timelineChartInstance = null;

// Initialize chart when the page loads
document.addEventListener('DOMContentLoaded', () => {
    renderChart();
});

/**
 * Fetches data and renders the Chart.js horizontal bar chart
 */
async function renderChart() {
    try {
        // Fetch all processing data
        const { data, error } = await supabaseClient
            .from('processing_reports')
            .select('*');

        if (error) throw error;

        // Group data to calculate averages
        const groupedData = {};
        
        if (data && data.length > 0) {
            data.forEach(report => {
                if (report.submitted_date && report.decision_date) {
                    const start = new Date(report.submitted_date);
                    const end = new Date(report.decision_date);
                    
                    // Calculate difference in days
                    const diffTime = Math.abs(end - start);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    
                    const key = `${report.embassy} (${report.visa_category})`;
                    
                    if (!groupedData[key]) {
                        groupedData[key] = { totalDays: 0, count: 0 };
                    }
                    groupedData[key].totalDays += diffDays;
                    groupedData[key].count += 1;
                }
            });
        }

        // Prepare arrays for Chart.js
        const labels = [];
        const avgDays = [];

        for (const [key, value] of Object.entries(groupedData)) {
            labels.push(key);
            avgDays.push(Math.round(value.totalDays / value.count));
        }

        // If no data exists yet, provide dummy data to show how the chart looks
        if (labels.length === 0) {
            labels.push('Awaiting Data (F1)', 'Awaiting Data (B1/B2)');
            avgDays.push(0, 0);
        }

        // Render Chart
        const ctx = document.getElementById('timelineChart').getContext('2d');
        
        // Destroy the old chart if it exists to prevent hover glitches
        if (timelineChartInstance) {
            timelineChartInstance.destroy(); 
        }

        timelineChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Average Processing Time (Days)',
                    data: avgDays,
                    backgroundColor: 'rgba(59, 130, 246, 0.85)', // var(--primary-color)
                    borderColor: 'rgba(37, 99, 235, 1)',
                    borderWidth: 1,
                    borderRadius: 6
                }]
            },
            options: {
                indexAxis: 'y', // Converts vertical bars to horizontal
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Average Days to Decision',
                            color: '#64748b' // var(--text-secondary)
                        }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return ` ${context.raw} Days`;
                            }
                        }
                    }
                }
            }
        });

    } catch (error) {
        console.error("Error fetching or rendering chart:", error);
    }
}

/**
 * Handles the submission of a user's timeline data
 */
async function submitTimeline() {
    const embassy = document.getElementById('timelineEmbassy').value.trim();
    const visaCategory = document.getElementById('timelineVisaCategory').value;
    const dateSubmitted = document.getElementById('dateSubmitted').value;
    const dateDecision = document.getElementById('dateDecision').value;
    const outcome = document.getElementById('visaOutcome').value;

    // 1. Basic validation
    if (!embassy || !dateSubmitted || !dateDecision) {
        alert('Please fill out the embassy and both dates.');
        return;
    }

    const start = new Date(dateSubmitted);
    const end = new Date(dateDecision);
    if (end < start) {
        alert('Decision date cannot be earlier than the submission date.');
        return;
    }

    // 2. Prepare payload
    const payload = {
        embassy: embassy,
        visa_category: visaCategory,
        submitted_date: dateSubmitted,
        decision_date: dateDecision,
        outcome: outcome
    };

    try {
        // UI Loading state
        const submitBtn = document.querySelector('button[onclick="submitTimeline()"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        // 3. Insert into Supabase
        const { error } = await supabaseClient
            .from('processing_reports')
            .insert([payload]);

        if (error) throw error;

        // 4. Success State & Refresh
        document.getElementById('timelineSuccessMessage').style.display = 'block';
        
        // Re-render the chart immediately so the user sees their data added
        renderChart();

        // Clear UI after 3 seconds
        setTimeout(() => {
            document.getElementById('timelineEmbassy').value = '';
            document.getElementById('dateSubmitted').value = '';
            document.getElementById('dateDecision').value = '';
            document.getElementById('timelineSuccessMessage').style.display = 'none';
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 3000);

    } catch (error) {
        console.error('Error submitting timeline:', error);
        alert('There was an error submitting your timeline. Please try again.');
        
        // Reset button on error
        const submitBtn = document.querySelector('button[onclick="submitTimeline()"]');
        submitBtn.textContent = 'Submit Timeline';
        submitBtn.disabled = false;
    }
}
