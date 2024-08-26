-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY, 
  first_name TEXT, 
  last_name TEXT,
  email TEXT
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY, 
  image_url TEXT NOT NULL,
  title TEXT NOT NULL, 
  content TEXT NOT NULL, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER, 
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create likes table
CREATE TABLE IF NOT EXISTS likes (
  user_id INTEGER, 
  post_id INTEGER, 
  PRIMARY KEY (user_id, post_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, 
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);