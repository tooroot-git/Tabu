-- Create customers table to store Stripe customer IDs
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS customers_user_id_idx ON customers(user_id);

-- Create index on stripe_customer_id for faster lookups
CREATE INDEX IF NOT EXISTS customers_stripe_customer_id_idx ON customers(stripe_customer_id);

-- Add RLS policies
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Only allow users to see their own customer data
CREATE POLICY "Users can view their own customer data" 
  ON customers FOR SELECT 
  USING (auth.uid() = user_id);

-- Only allow authenticated users to insert their own customer data
CREATE POLICY "Users can insert their own customer data" 
  ON customers FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Only allow authenticated users to update their own customer data
CREATE POLICY "Users can update their own customer data" 
  ON customers FOR UPDATE 
  USING (auth.uid() = user_id);
