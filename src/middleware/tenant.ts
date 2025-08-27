// テナント認証・認可ミドルウェア
// Tenant authentication and authorization middleware

import { NextRequest, NextResponse } from 'next/server';
import { getTenantByCode, isTenantActive, TenantErrors, extractTenantIdFromPath } from '@/utils/tenant';

/**
 * テナント検証ミドルウェア
 * Tenant validation middleware
 */
export async function tenantMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // プラットフォーム管理画面はスキップ
  if (pathname.startsWith('/api/platform') || pathname.startsWith('/platform')) {
    return NextResponse.next();
  }
  
  // 静的ファイルやNext.js内部パスはスキップ
  if (pathname.startsWith('/_next') || pathname.startsWith('/static') || pathname.includes('.')) {
    return NextResponse.next();
  }
  
  // テナント固有のAPIパスの処理
  if (pathname.startsWith('/api/v1/')) {
    return await handleTenantApiRequest(request);
  }
  
  // Webアプリケーションのテナント処理
  return await handleTenantWebRequest(request);
}

/**
 * テナント固有APIリクエストの処理
 * Handle tenant-specific API requests
 */
async function handleTenantApiRequest(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const tenantId = extractTenantIdFromPath(pathname);
  
  if (!tenantId) {
    return new NextResponse(
      JSON.stringify({ error: 'Tenant ID is required in API path' }),
      { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
  
  try {
    const tenant = await getTenantByCode(tenantId);
    
    if (!tenant) {
      return new NextResponse(
        JSON.stringify({ 
          error: `Customer "${tenantId}" not found.`,
          code: 'TENANT_NOT_FOUND',
          suggestion: 'Please check the tenant ID or contact support if this tenant should exist.'
        }),
        { 
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    if (!isTenantActive(tenant)) {
      return new NextResponse(
        JSON.stringify({ 
          error: `Customer "${tenantId}" is not active.`,
          code: 'TENANT_INACTIVE', 
          status: tenant.status,
          suggestion: 'Please contact support to reactivate your account.'
        }),
        { 
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    // テナント情報をヘッダーに追加
    const response = NextResponse.next();
    response.headers.set('X-Tenant-ID', tenant.id);
    response.headers.set('X-Tenant-Code', tenant.code);
    response.headers.set('X-Tenant-Name', tenant.name);
    
    return response;
    
  } catch (error) {
    console.error('Tenant middleware error:', error);
    return new NextResponse(
      JSON.stringify({ 
        error: 'Internal server error during tenant validation',
        code: 'TENANT_VALIDATION_ERROR'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

/**
 * Webアプリケーションのテナントリクエスト処理
 * Handle tenant web application requests
 */
async function handleTenantWebRequest(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';
  
  // サブドメインからテナントを特定
  const subdomain = hostname.split('.')[0];
  
  // メインドメインの場合はテナント選択画面にリダイレクト
  if (subdomain === 'app' || subdomain === 'localhost' || !subdomain.includes('.')) {
    if (url.pathname === '/') {
      url.pathname = '/tenant-select';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }
  
  // サブドメインベースのテナント処理
  try {
    const tenant = await getTenantByCode(subdomain);
    
    if (!tenant) {
      url.hostname = 'app.connecten.com'; // メインドメインにリダイレクト
      url.pathname = '/tenant-not-found';
      url.searchParams.set('subdomain', subdomain);
      return NextResponse.redirect(url);
    }
    
    if (!isTenantActive(tenant)) {
      url.pathname = '/tenant-suspended';
      return NextResponse.rewrite(url);
    }
    
    // テナント固有のパスにリライト
    url.pathname = `/tenant/${tenant.code}${url.pathname}`;
    return NextResponse.rewrite(url);
    
  } catch (error) {
    console.error('Web tenant middleware error:', error);
    url.pathname = '/error';
    return NextResponse.rewrite(url);
  }
}

/**
 * 開発環境用のテナント作成支援
 * Development environment tenant creation helper
 */
export async function createTenantIfNotExists(tenantCode: string) {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  
  try {
    const tenant = await getTenantByCode(tenantCode);
    if (!tenant) {
      console.log(`Creating development tenant: ${tenantCode}`);
      
      // 開発環境では自動的にテナントを作成
      const response = await fetch('/api/platform/tenants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: tenantCode,
          name: `${tenantCode} Dance Studio`,
          subdomain: tenantCode,
          planType: 'standard',
          status: 'active',
        }),
      });
      
      if (response.ok) {
        console.log(`Development tenant created: ${tenantCode}`);
      }
    }
  } catch (error) {
    console.error('Error creating development tenant:', error);
  }
}