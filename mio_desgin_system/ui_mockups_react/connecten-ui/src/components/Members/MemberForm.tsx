import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';

interface MemberFormData {
  name: string;
  email: string;
  phone: string;
  plan: string;
  status: 'active' | 'inactive' | 'suspended';
}

interface MemberFormProps {
  initialData?: Partial<MemberFormData>;
  onSubmit: (data: MemberFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const MemberForm: React.FC<MemberFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<MemberFormData>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    plan: initialData?.plan || 'basic',
    status: initialData?.status || 'active'
  });

  const [errors, setErrors] = useState<Partial<MemberFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<MemberFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = '氏名は必須です';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスは必須です';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '正しいメールアドレスを入力してください';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '電話番号は必須です';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof MemberFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const plans = [
    { value: 'basic', label: 'ベーシック' },
    { value: 'premium', label: 'プレミアム' },
    { value: 'vip', label: 'VIP' }
  ];

  const statusOptions = [
    { value: 'active', label: '有効' },
    { value: 'inactive', label: '無効' },
    { value: 'suspended', label: '停止中' }
  ];

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Input
            label="氏名"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            error={errors.name}
            placeholder="山田太郎"
            required
            fullWidth
            icon="fas fa-user"
          />
        </div>

        <Input
          label="メールアドレス"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={errors.email}
          placeholder="example@domain.com"
          required
          fullWidth
          icon="fas fa-envelope"
        />

        <Input
          label="電話番号"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          error={errors.phone}
          placeholder="090-1234-5678"
          required
          fullWidth
          icon="fas fa-phone"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            プラン <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.plan}
            onChange={(e) => handleInputChange('plan', e.target.value)}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            required
          >
            {plans.map(plan => (
              <option key={plan.value} value={plan.value}>
                {plan.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            ステータス <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.status}
            onChange={(e) => handleInputChange('status', e.target.value as MemberFormData['status'])}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            required
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          キャンセル
        </Button>
        <Button
          type="submit"
          variant="primary"
          loading={isLoading}
          icon={!isLoading ? "fas fa-save" : undefined}
        >
          {initialData ? '更新' : '登録'}
        </Button>
      </div>
    </motion.form>
  );
};