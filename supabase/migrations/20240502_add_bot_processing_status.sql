-- Add bot_processing_status column to orders table
ALTER TABLE orders ADD COLUMN IF NOT EXISTS bot_processing_status TEXT DEFAULT 'pending';

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_orders_bot_processing_status ON orders(bot_processing_status);

-- Add comment for documentation
COMMENT ON COLUMN orders.bot_processing_status IS 'Status of bot processing: pending, sent, failed, completed';
