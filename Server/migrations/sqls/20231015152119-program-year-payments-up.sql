-- Create junction table program_year_payments
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE program_year_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  program_id UUID,
  FOREIGN KEY (program_id) REFERENCES program(id) ON DELETE CASCADE ON UPDATE CASCADE, 

  payment_id UUID,
  FOREIGN KEY (payment_id) REFERENCES payment(id) ON DELETE CASCADE ON UPDATE CASCADE, 

  year_id UUID,
  FOREIGN KEY (year_id) REFERENCES year(id) ON DELETE CASCADE ON UPDATE CASCADE, 

  price NUMERIC NOT NULL,
  date TIMESTAMP DEFAULT NOW(),

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
)
