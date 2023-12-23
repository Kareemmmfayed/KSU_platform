ALTER TABLE applicant_program_year_payments
   ADD status VARCHAR(255) CHECK (status IN ('pending', 'approved')) DEFAULT 'pending';
ALTER TABLE applicant_program_year_payments
    ALTER COLUMN amount_paid DROP NOT NULL;
ALTER TABLE applicant_program_year_payments
    ALTER COLUMN purchase_number TYPE VARCHAR(255);
ALTER TABLE applicant_program_year_payments
    ALTER COLUMN purchase_number DROP NOT NULL;
