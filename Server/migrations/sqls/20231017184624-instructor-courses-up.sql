-- Create the table 'instructor_courses'
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE instructor_courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  instructor_id UUID,
  FOREIGN KEY(instructor_id) REFERENCES instructor(id) ON DELETE CASCADE ON UPDATE CASCADE,

  course_id UUID,
  FOREIGN KEY(course_id) REFERENCES course(id) ON DELETE CASCADE ON UPDATE CASCADE,

  year_id UUID,
  FOREIGN KEY(year_id) REFERENCES year(id) ON DELETE CASCADE ON UPDATE CASCADE,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
