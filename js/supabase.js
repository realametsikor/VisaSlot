/**
 * js/supabase.js
 * 
 * Purpose: Initializes the Supabase client to connect the front-end to the database.
 * Usage: This file is loaded before other script files in your HTML, making the 
 * 'supabase' object available globally.
 */

// 1. Define your connection variables
// IMPORTANT: Replace these string values with your actual project URL and Anon Key from your Supabase dashboard (Project Settings -> API).
const SUPABASE_URL = 'https://rcplpistzbefowlgsrpt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjcGxwaXN0emJlZm93bGdzcnB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3NTA4NjgsImV4cCI6MjA5MzMyNjg2OH0.2xWIBLQb7cqlrHfX84ZLA4JqL-eP5rDAnK2iYwcPoPw';
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
