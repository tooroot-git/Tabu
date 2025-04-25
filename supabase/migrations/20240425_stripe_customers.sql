-- Create customers table for Stripe integration
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS customers_user_id_idx ON customers(user_id);
CREATE INDEX IF NOT EXISTS customers_stripe_customer_id_idx ON customers(stripe_customer_id);

-- Add RLS policies
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Only allow users to see their own customer data
CREATE POLICY "Users can view their own customer data" 
  ON customers FOR SELECT 
  USING (auth.uid() = user_id);

-- Only allow system to insert/update customer data
CREATE POLICY "System can insert customer data" 
  ON customers FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "System can update customer data" 
  ON customers FOR UPDATE 
  USING (auth.uid() = user_id);
