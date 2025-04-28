-- Strengthen RLS policies for orders table

-- First, drop existing policies
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
DROP POLICY IF EXISTS "Users can insert their own orders" ON orders;
DROP POLICY IF EXISTS "Users can update their own orders" ON orders;
DROP POLICY IF EXISTS "Admin can view all orders" ON orders;

-- Create stronger policies for orders
CREATE POLICY "Users can view their own orders" 
  ON orders FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders" 
  ON orders FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders" 
  ON orders FOR UPDATE 
  USING (auth.uid() = user_id AND status = 'pending');

-- Admin policies for orders
CREATE POLICY "Admin can view all orders" 
  ON orders FOR SELECT 
  USING (
    auth.uid() IN (
      SELECT id FROM auth.users 
      WHERE auth.users.email IN (
        SELECT email FROM admin_users
      )
    )
  );

CREATE POLICY "Admin can update all orders" 
  ON orders FOR UPDATE 
  USING (
    auth.uid() IN (
      SELECT id FROM auth.users 
      WHERE auth.users.email IN (
        SELECT email FROM admin_users
      )
    )
  );

-- Strengthen RLS policies for profiles table

-- First, drop existing policies
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;

-- Create stronger policies for profiles
CREATE POLICY "Users can view their own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Create policies for storage
CREATE POLICY "Users can view their own documents" 
  ON storage.objects FOR SELECT 
  USING (
    bucket_id = 'fulfilled-orders' AND 
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Admin can upload documents" 
  ON storage.objects FOR INSERT 
  WITH CHECK (
    bucket_id = 'fulfilled-orders' AND
    auth.uid() IN (
      SELECT id FROM auth.users 
      WHERE auth.users.email IN (
        SELECT email FROM admin_users
      )
    )
  );

CREATE POLICY "Admin can delete documents" 
  ON storage.objects FOR DELETE 
  USING (
    bucket_id = 'fulfilled-orders' AND
    auth.uid() IN (
      SELECT id FROM auth.users 
      WHERE auth.users.email IN (
        SELECT email FROM admin_users
      )
    )
  );

-- Create admin_users table if it doesn't exist
CREATE TABLE IF NOT EXISTS admin_users (
  email TEXT PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert admin emails
INSERT INTO admin_users (email)
VALUES ('admin@tabuisrael.co.il')
ON CONFLICT (email) DO NOTHING;
