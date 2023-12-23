-- Create the table 'student_courses'
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE student_courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  student_id UUID,
  FOREIGN KEY(student_id) REFERENCES student(id) ON DELETE CASCADE ON UPDATE CASCADE,

  instructor_courses_id UUID,
  FOREIGN KEY(instructor_courses_id) REFERENCES instructor_courses(id) ON DELETE CASCADE ON UPDATE CASCADE,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
