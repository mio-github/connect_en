// テナント管理に関するユーティリティ関数
// Tenant management utility functions

export interface Tenant {
  id: string;
  code: string;
  name: string;
  subdomain: string;
  planType: 'basic' | 'standard' | 'premium' | 'enterprise';
  status: 'active' | 'suspended' | 'cancelled';
  contractStartDate: string;
  contractEndDate: string;
  settings: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface TenantContext {
  tenant: Tenant;
  userId: string;
  permissions: string[];
}

/**
 * テナントコードからテナント情報を取得
 * Get tenant information by tenant code
 */
export async function getTenantByCode(code: string): Promise<Tenant | null> {
  try {
    // TODO: 実際のデータベース接続に置き換える
    // Replace with actual database connection
    const response = await fetch(`/api/platform/tenants/${code}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch tenant: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching tenant:', error);
    return null;
  }
}

/**
 * テナントサブドメインからテナント情報を取得
 * Get tenant information by subdomain
 */
export async function getTenantBySubdomain(subdomain: string): Promise<Tenant | null> {
  try {
    const response = await fetch(`/api/platform/tenants/by-subdomain/${subdomain}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch tenant: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching tenant by subdomain:', error);
    return null;
  }
}

/**
 * テナントのアクティブ状態を確認
 * Check if tenant is active
 */
export function isTenantActive(tenant: Tenant): boolean {
  if (tenant.status !== 'active') {
    return false;
  }
  
  const now = new Date();
  const endDate = new Date(tenant.contractEndDate);
  
  return endDate > now;
}

/**
 * テナントコンテキストの検証
 * Validate tenant context
 */
export function validateTenantContext(tenantId: string, requestTenantId: string): boolean {
  return tenantId === requestTenantId;
}

/**
 * テナント固有のAPIエンドポイントを生成
 * Generate tenant-specific API endpoint
 */
export function getTenantApiEndpoint(tenantId: string, path: string): string {
  return `/api/v1/${tenantId}${path.startsWith('/') ? path : '/' + path}`;
}

/**
 * リクエストからテナントIDを抽出
 * Extract tenant ID from request
 */
export function extractTenantIdFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/api\/v1\/([^\/]+)/);
  return match ? match[1] : null;
}

/**
 * テナントのエラーメッセージを生成
 * Generate tenant error messages
 */
export class TenantError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 400
  ) {
    super(message);
    this.name = 'TenantError';
  }
}

export const TenantErrors = {
  NOT_FOUND: (tenantCode: string) => 
    new TenantError(`Tenant "${tenantCode}" not found`, 'TENANT_NOT_FOUND', 404),
  
  INACTIVE: (tenantCode: string) => 
    new TenantError(`Tenant "${tenantCode}" is not active`, 'TENANT_INACTIVE', 403),
  
  SUSPENDED: (tenantCode: string) => 
    new TenantError(`Tenant "${tenantCode}" is suspended`, 'TENANT_SUSPENDED', 403),
  
  EXPIRED: (tenantCode: string) => 
    new TenantError(`Tenant "${tenantCode}" contract has expired`, 'TENANT_EXPIRED', 403),
  
  INVALID_CONTEXT: () => 
    new TenantError('Invalid tenant context', 'INVALID_TENANT_CONTEXT', 400),
}