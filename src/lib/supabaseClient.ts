
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://knrsjxphbczcfzamiawj.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtucnNqeHBoYmN6Y2Z6YW1pYXdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4MjA0OTUsImV4cCI6MjA2NTM5NjQ5NX0.R9ZtGqB1uHhKWKqffqMLH-SQFnrEpUB_gd22SUCrf6w";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
