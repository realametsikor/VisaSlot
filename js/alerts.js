/**
 * js/alerts.js
 * 
 * Purpose: Handles the submission of email alert signups to the Supabase database.
 * Dependencies: Requires supabaseClient from js/supabase.js.
 */

async function submitAlert() {
    // 1. Gather form data
    const email = document.getElementById('alertEmail').value.trim();
    const embassy = document.getElementById('alertEmbassy').value.trim();
    const visaCategory = document.getElementById('alertVisaCategory').value;

    // 2. Basic Validation
    if (!email) {
        alert('Please enter your email address.');
        return;
    }

    if (!embassy) {
        alert('Please enter an embassy city.');
        return;
    }

    // 3. Prepare data payload for Supabase
    const payload = {
        email: email,
        embassy: embassy,
        visa_category: visaCategory
    };

    try {
        // Change button to show loading state
        const submitBtn = document.querySelector('button[onclick="submitAlert()"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Subscribing...';
        submitBtn.disabled = true;

        // 4. Insert into Supabase
        const { error } = await supabaseClient
            .from('alert_signups')
            .insert([payload]);

        if (error) throw error;

        // 5. Handle Success state
        document.getElementById('alertSuccessMessage').style.display = 'block';
        
        // Clear the form fields and reset the UI after 3 seconds
        setTimeout(() => {
            document.getElementById('alertEmail').value = '';
            document.getElementById('alertEmbassy').value = '';
            document.getElementById('alertSuccessMessage').style.display = 'none';
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 3000);

    } catch (error) {
        console.error('Error subscribing to alerts:', error);
        alert('There was an error subscribing. Please try again.');
        
        // Reset button on error
        const submitBtn = document.querySelector('button[onclick="submitAlert()"]');
        submitBtn.textContent = 'Subscribe to Alerts';
        submitBtn.disabled = false;
    }
}
