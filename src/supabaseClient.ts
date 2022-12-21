import { createClient } from '@supabase/supabase-js'

//import supabase url and anon key from .env file
const supabaseUrl = 'https://upitztcwknhoaikrutlw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwaXR6dGN3a25ob2Fpa3J1dGx3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkwNDM5NTAsImV4cCI6MTk4NDYxOTk1MH0.1F7Z2ZqsvLZY2TYVubyn1kKBbqkTbsUOHA0z80HctL4'


export const supabase = createClient(supabaseUrl, supabaseKey)
