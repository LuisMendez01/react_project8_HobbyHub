import { createClient } from '@supabase/supabase-js'

const URL = 'https://vwsuxfxmlogjihdfwhtn.supabase.co';

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3c3V4ZnhtbG9namloZGZ3aHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgxOTU3MjEsImV4cCI6MjAxMzc3MTcyMX0.O1JccIz_BfaKXWs3T9rIW9PBNba6vlmB4SeUJcgLRUg';

export const supabase = createClient(URL, API_KEY);