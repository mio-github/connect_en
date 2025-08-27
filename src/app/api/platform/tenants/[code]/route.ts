// プラットフォーム管理: テナント情報取得API
// Platform management: Tenant information API

import { NextRequest, NextResponse } from 'next/server';

// 開発環境用の仮データ
// Mock data for development environment
const MOCK_TENANTS = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    code: 'endance',
    name: 'En Dance Studio',
    subdomain: 'endance',
    planType: 'enterprise',
    status: 'active',
    contractStartDate: '2025-01-01',
    contractEndDate: '2025-12-31',
    settings: {
      timezone: 'Asia/Tokyo',
      currency: 'JPY',
      language: 'ja'
    },
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    code: 'demo',
    name: 'Demo Dance Studio',
    subdomain: 'demo',
    planType: 'basic',
    status: 'active',
    contractStartDate: '2025-01-01',
    contractEndDate: '2025-12-31',
    settings: {
      timezone: 'Asia/Tokyo',
      currency: 'JPY',
      language: 'ja'
    },
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    code: 'testdance',
    name: 'Test Dance Academy',
    subdomain: 'testdance',
    planType: 'premium',
    status: 'active',
    contractStartDate: '2025-01-01',
    contractEndDate: '2025-12-31',
    settings: {
      timezone: 'Asia/Tokyo',
      currency: 'JPY',
      language: 'ja'
    },
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  }
];

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params;
    
    if (!code) {
      return NextResponse.json(
        { error: 'Tenant code is required' },
        { status: 400 }
      );
    }
    
    // 開発環境では仮データを使用
    // Use mock data in development environment
    if (process.env.NODE_ENV === 'development') {
      const tenant = MOCK_TENANTS.find(t => t.code === code);
      
      if (!tenant) {
        return NextResponse.json(
          { 
            error: `Customer "${code}" not found`,
            code: 'TENANT_NOT_FOUND',
            suggestion: 'Available tenants: endance, demo, testdance'
          },
          { status: 404 }
        );
      }
      
      return NextResponse.json(tenant);
    }
    
    // TODO: 本番環境では実際のデータベースから取得
    // TODO: In production, fetch from actual database
    /*
    const tenant = await db.tenants.findUnique({
      where: { code },
      select: {
        id: true,
        code: true,
        name: true,
        subdomain: true,
        planType: true,
        status: true,
        contractStartDate: true,
        contractEndDate: true,
        settings: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    
    if (!tenant) {
      return NextResponse.json(
        { error: `Customer "${code}" not found` },
        { status: 404 }
      );
    }
    
    return NextResponse.json(tenant);
    */
    
    return NextResponse.json(
      { error: 'Database not configured yet' },
      { status: 503 }
    );
    
  } catch (error) {
    console.error('Error fetching tenant:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}