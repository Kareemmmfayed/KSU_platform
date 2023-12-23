-- Create the 'semester' table
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE semester (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  level_id UUID,
  FOREIGN KEY (level_id) REFERENCES level(id) ON UPDATE CASCADE ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
