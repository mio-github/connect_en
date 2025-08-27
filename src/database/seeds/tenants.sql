-- テナント初期データのシードスクリプト
-- Initial tenant data seed script

-- テナントテーブルの作成（存在しない場合）
-- Create tenants table if not exists
CREATE TABLE IF NOT EXISTS tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  subdomain VARCHAR(100) UNIQUE,
  plan_type VARCHAR(20) DEFAULT 'basic',
  status VARCHAR(20) DEFAULT 'active',
  contract_start_date DATE,
  contract_end_date DATE,
  settings JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 初期テナントデータの挿入
-- Insert initial tenant data

-- En Dance Studio (本家テナント)
INSERT INTO tenants (code, name, subdomain, plan_type, status, contract_start_date, contract_end_date, settings) 
VALUES (
  'endance',
  'En Dance Studio',
  'endance',
  'enterprise',
  'active',
  '2025-01-01',
  '2025-12-31',
  '{"timezone": "Asia/Tokyo", "currency": "JPY", "language": "ja"}'::jsonb
) ON CONFLICT (code) DO NOTHING;


-- テスト用テナント（開発環境用）
INSERT INTO tenants (code, name, subdomain, plan_type, status, contract_start_date, contract_end_date, settings) 
VALUES (
  'demo',
  'Demo Dance Studio',
  'demo',
  'basic',
  'active',
  '2025-01-01',
  '2025-12-31',
  '{"timezone": "Asia/Tokyo", "currency": "JPY", "language": "ja"}'::jsonb
) ON CONFLICT (code) DO NOTHING;

-- もう一つのテスト用テナント
INSERT INTO tenants (code, name, subdomain, plan_type, status, contract_start_date, contract_end_date, settings) 
VALUES (
  'testdance',
  'Test Dance Academy',
  'testdance',
  'premium',
  'active',
  '2025-01-01',
  '2025-12-31',
  '{"timezone": "Asia/Tokyo", "currency": "JPY", "language": "ja"}'::jsonb
) ON CONFLICT (code) DO NOTHING;

-- プラットフォーム管理者ユーザーテーブル
CREATE TABLE IF NOT EXISTS platform_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  is_platform_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- プラットフォーム管理者の作成
INSERT INTO platform_users (email, is_platform_admin) 
VALUES (
  'admin@miosystem.com',
  true
) ON CONFLICT (email) DO NOTHING;

-- サブスクリプションプランテーブル
CREATE TABLE IF NOT EXISTS subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  price_monthly DECIMAL(10, 2),
  price_yearly DECIMAL(10, 2),
  max_members INTEGER,
  max_staff INTEGER,
  max_locations INTEGER,
  features JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- サブスクリプションプランの作成
INSERT INTO subscription_plans (name, code, description, price_monthly, price_yearly, max_members, max_staff, max_locations, features) 
VALUES 
(
  'Basic Plan',
  'basic',
  '小規模スタジオ向けベーシックプラン',
  9800.00,
  98000.00,
  100,
  5,
  1,
  '["member_management", "basic_scheduling", "payment_tracking"]'::jsonb
),
(
  'Standard Plan', 
  'standard',
  '中規模スタジオ向けスタンダードプラン',
  19800.00,
  198000.00,
  500,
  20,
  3,
  '["member_management", "advanced_scheduling", "payment_tracking", "marketing_tools", "basic_analytics"]'::jsonb
),
(
  'Premium Plan',
  'premium', 
  '大規模スタジオ向けプレミアムプラン',
  39800.00,
  398000.00,
  2000,
  50,
  10,
  '["member_management", "advanced_scheduling", "payment_tracking", "marketing_tools", "advanced_analytics", "api_access", "custom_integrations"]'::jsonb
),
(
  'Enterprise Plan',
  'enterprise',
  'エンタープライズ向けプラン',
  99800.00,
  998000.00,
  999999,
  999999,
  999999,
  '["all_features", "priority_support", "custom_development", "on_premise_option"]'::jsonb
)
ON CONFLICT (code) DO NOTHING;

-- テナントサブスクリプション関連付け
CREATE TABLE IF NOT EXISTS tenant_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id),
  plan_id UUID REFERENCES subscription_plans(id),
  start_date DATE NOT NULL,
  end_date DATE,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 各テナントにプランを割り当て
INSERT INTO tenant_subscriptions (tenant_id, plan_id, start_date, end_date, status)
SELECT 
  t.id as tenant_id,
  sp.id as plan_id,
  t.contract_start_date as start_date,
  t.contract_end_date as end_date,
  'active' as status
FROM tenants t
JOIN subscription_plans sp ON sp.code = t.plan_type
WHERE NOT EXISTS (
  SELECT 1 FROM tenant_subscriptions ts 
  WHERE ts.tenant_id = t.id AND ts.status = 'active'
);