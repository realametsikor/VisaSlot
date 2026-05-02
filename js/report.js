/**
 * js/report.js
 * 
 * Purpose: Handles the submission of slot reports to the Supabase database.
 * Dependencies: Requires supabaseClient from js/supabase.js.
 */

async function submitReport() {
    // 1. Gather form data
    const statusElements = document.getElementsByName('slotStatus');
    let isFound = true;
    for (const el of statusElements) {
        if (el.checked) {
            isFound = (el.value === 'found');
            break;
        }
    }

    const country = document.getElementById('country').value;
    const embassy = document.getElementById('embassy').value.trim();
    const visaCategory = document.getElementById('visaCategory').value;
    const slotDate = document.getElementById('slotDate').value;
    const reporterEmail = document.getElementById('reporterEmail').value.trim();

    // 2. Basic Validation
    if (!embassy) {
        alert('Please enter an embassy city.');
        return;
    }

    if (isFound && !slotDate) {
        alert('Please select the slot date you saw.');
        return;
    }

    // 3. Prepare data payload for Supabase
    const payload = {
        embassy: embassy,
        country: country,
        visa_category: visaCategory,
        slot_found: isFound,
        reporter_email: reporterEmail || null // Send null if empty
    };

    // Only add the date to the payload if a slot was actually found
    if (isFound) {
        payload.slot_date_seen = slotDate;
    }

    try {
        // Change button to show loading state
        const submitBtn = document.querySelector('button[onclick="submitReport()"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        // 4. Insert into Supabase
        const { error } = await supabaseClient
            .from('slot_reports')
            .insert([payload]);

        if (error) throw error;

        // 5. Handle Success state
        document.getElementById('successMessage').style.display = 'block';
        
        // Clear the form fields and reset the UI after 3 seconds
        setTimeout(() => {
            document.getElementById('embassy').value = '';
            document.getElementById('slotDate').value = '';
            document.getElementById('reporterEmail').value = '';
            document.getElementById('successMessage').style.display = 'none';
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 3000);

    } catch (error) {
        console.error('Error submitting report:', error);
        alert('There was an error submitting your report. Please try again.');
        
        // Reset button on error
        const submitBtn = document.querySelector('button[onclick="submitReport()"]');
        submitBtn.textContent = 'Submit Report';
        submitBtn.disabled = false;
    }
}
