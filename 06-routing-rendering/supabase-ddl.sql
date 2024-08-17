-- Supabase doesn't support programmatic DDL
-- So we need to create the tables manually in the Supabase dashboard
-- Then we can use the Supabase SDK to interact with the database

CREATE TABLE IF NOT EXISTS news (
  id SERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  image TEXT NOT NULL,
  date DATE NOT NULL,
  content TEXT NOT NULL
);