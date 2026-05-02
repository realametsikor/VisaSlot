/**
 * js/supabase.js
 * 
 * Purpose: Initializes the Supabase client to connect the front-end to the database.
 * Usage: This file is loaded before other script files in your HTML, making the 
 * 'supabase' object available globally.
 */

// 1. Define your connection variables
// IMPORTANT: Replace these string values with your actual project URL and Anon Key from your Supabase dashboard (Project Settings -> API).
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// 2. Initialize the client
// We wrap this in a try/catch block just in case the Supabase CDN script fails to load in the HTML.
let supabaseClient;

try {
    // The supabase object is provided by the CDN script we included in the HTML <head>
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("Supabase client initialized successfully.");
} catch (error) {
    console.error("Failed to initialize Supabase client. Ensure the CDN script is loaded.", error);
}

// Note: Because we are using standard HTML/JS without a bundler, 
// 'supabaseClient' is now attached to the global window object and 
// can be accessed by any script loaded after this one.
