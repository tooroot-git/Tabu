-- Create orders table if it doesn't exist
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  block TEXT NOT NULL,
  parcel TEXT NOT NULL,
  subparcel TEXT,
  order_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  price DECIMAL NOT NULL,
  payment_id TEXT,
  file_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own orders" 
  ON orders FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders" 
  ON orders FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy for admin access (assuming admin role exists)
CREATE POLICY "Admins can view all orders" 
  ON orders FOR SELECT 
  USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE auth.users.role = 'admin'
  ));

CREATE POLICY "Admins can update all orders" 
  ON orders FOR UPDATE 
  USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE auth.users.role = 'admin'
  ));

-- Create storage bucket for order documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('order_documents', 'order_documents', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policy for documents
CREATE POLICY "Users can view their own documents" 
  ON storage.objects FOR SELECT 
  USING (auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Admins can upload documents" 
  ON storage.objects FOR INSERT 
  WITH CHECK (auth.uid() IN (
    SELECT id FROM auth.users WHERE auth.users.role = 'admin'
  ));
