import React from 'react';

interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  status: 'active' | 'suspended' | 'cancelled';
}

interface TenantSelectorProps {
  currentTenant: Tenant | null;
  availableTenants: Tenant[];
  onTenantChange: (tenant: Tenant) => void;
}

export default function TenantSelector({ 
  currentTenant, 
  availableTenants, 
  onTenantChange 
}: TenantSelectorProps) {
  return (
    <div className="relative">
      <div className="flex items-center space-x-2 bg-white rounded-lg shadow px-3 py-2">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-900">
            {currentTenant?.name || 'テナントを選択'}
          </span>
        </div>
      </div>
      
      {availableTenants.length > 1 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {availableTenants.map((tenant) => (
            <button
              key={tenant.id}
              onClick={() => onTenantChange(tenant)}
              className={`w-full px-3 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                currentTenant?.id === tenant.id ? 'bg-blue-50 text-blue-900' : 'text-gray-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{tenant.name}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  tenant.status === 'active' ? 'bg-green-100 text-green-800' :
                  tenant.status === 'suspended' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {tenant.status}
                </span>
              </div>
              <div className="text-sm text-gray-500">{tenant.subdomain}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}