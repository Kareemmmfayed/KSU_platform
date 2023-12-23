-- Create indecies on table that is most used (student, applicant)

CREATE INDEX applicant_email_idx ON applicant (email);
CREATE INDEX applicant_national_id_idx ON applicant (national_id);

CREATE INDEX student_email_idx ON student (email);
CREATE INDEX student_national_id_idx ON student (national_id);
