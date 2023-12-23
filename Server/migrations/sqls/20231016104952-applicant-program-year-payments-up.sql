-- Create the junction table applicant_program_year_payments
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE applicant_program_year_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  program_year_payments_id UUID,
  FOREIGN KEY (program_year_payments_id) REFERENCES program_year_payments(id) ON DELETE CASCADE ON UPDATE CASCADE, 

  applicant_id UUID,
  FOREIGN KEY (applicant_id) REFERENCES applicant(id) ON DELETE CASCADE ON UPDATE CASCADE, 

  amount_paid NUMERIC NOT NULL,
  payment_date TIMESTAMP DEFAULT NOW(),
  purchase_number INTEGER NOT NULL,
  purchase_image TEXT,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
)
