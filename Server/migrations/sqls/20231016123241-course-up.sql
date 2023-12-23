-- Create the course table
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE course(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  credit_hours INTEGER NOT NULL,
  code VARCHAR(255) NOT NULL,

  semester_id UUID,
  FOREIGN KEY (semester_id ) REFERENCES semester(id) ON UPDATE CASCADE ON DELETE CASCADE,

  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
