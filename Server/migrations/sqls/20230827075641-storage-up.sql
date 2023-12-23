-- Create the 'storage' table
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE storage (
    path VARCHAR(255) NOT NULL,
    unique_name VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    type VARCHAR(255), -- Assuming MIME Type is stored as a string
    owner UUID,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);