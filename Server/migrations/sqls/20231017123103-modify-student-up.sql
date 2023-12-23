DROP TABLE IF EXISTS student;

-- Create the 'applicant' table
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE student (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    FOREIGN KEY(id) REFERENCES applicant(id) ON DELETE CASCADE ON UPDATE CASCADE,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    national_id VARCHAR(255) UNIQUE NOT NULL,

    collage_id UUID,
    FOREIGN KEY(collage_id) REFERENCES collage(id) ON DELETE CASCADE ON UPDATE CASCADE,

    gender VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
