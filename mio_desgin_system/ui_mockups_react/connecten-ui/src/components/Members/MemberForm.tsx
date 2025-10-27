import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';

interface MemberFormData {
  // 基本情報
  memberId: string;
  name: string;
  nameKana: string;
  gender: 'male' | 'female' | 'other';
  birthDate: string;

  // 連絡先情報
  postalCode: string;
  address: string;
  email: string;
  emailMobile: string;
  phone: string;
  phoneMobile: string;
  emergencyContact: string;
  emergencyContactRelation: string;

  // 会員カード情報
  cardNumber: string;

  // 支払い情報
  paymentMethod: 'credit' | 'bank' | 'cash';
  bankName: string;
  bankBranch: string;
  accountType: 'normal' | 'current';
  accountNumber: string;
  accountHolder: string;
  creditCardLast4: string;
  withdrawalDate: string;

  // 入会情報
  enrollmentDate: string;
  course: string;
  monthlyFee: string;
  ticketType: string;

  // 紹介・キャンペーン
  referralMemberId: string;
  campaignCode: string;

  // ポイント・チケット
  currentPoints: string;

  // その他
  notes: string;
  specialEvents: boolean;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
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
    memberId: initialData?.memberId || '',
    name: initialData?.name || '',
    nameKana: initialData?.nameKana || '',
    gender: initialData?.gender || 'other',
    birthDate: initialData?.birthDate || '',
    postalCode: initialData?.postalCode || '',
    address: initialData?.address || '',
    email: initialData?.email || '',
    emailMobile: initialData?.emailMobile || '',
    phone: initialData?.phone || '',
    phoneMobile: initialData?.phoneMobile || '',
    emergencyContact: initialData?.emergencyContact || '',
    emergencyContactRelation: initialData?.emergencyContactRelation || '',
    cardNumber: initialData?.cardNumber || '',
    paymentMethod: initialData?.paymentMethod || 'credit',
    bankName: initialData?.bankName || '',
    bankBranch: initialData?.bankBranch || '',
    accountType: initialData?.accountType || 'normal',
    accountNumber: initialData?.accountNumber || '',
    accountHolder: initialData?.accountHolder || '',
    creditCardLast4: initialData?.creditCardLast4 || '',
    withdrawalDate: initialData?.withdrawalDate || '',
    enrollmentDate: initialData?.enrollmentDate || new Date().toISOString().split('T')[0],
    course: initialData?.course || '',
    monthlyFee: initialData?.monthlyFee || '',
    ticketType: initialData?.ticketType || '',
    referralMemberId: initialData?.referralMemberId || '',
    campaignCode: initialData?.campaignCode || '',
    currentPoints: initialData?.currentPoints || '0',
    notes: initialData?.notes || '',
    specialEvents: initialData?.specialEvents || false,
    status: initialData?.status || 'active'
  });

  const [errors, setErrors] = useState<Partial<Record<keyof MemberFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof MemberFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = '氏名は必須です';
    }

    if (!formData.nameKana.trim()) {
      newErrors.nameKana = 'フリガナは必須です';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスは必須です';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '正しいメールアドレスを入力してください';
    }

    if (!formData.phone.trim() && !formData.phoneMobile.trim()) {
      newErrors.phone = '電話番号またはモバイル番号のいずれかは必須です';
    }

    if (!formData.birthDate) {
      newErrors.birthDate = '生年月日は必須です';
    }

    if (!formData.address.trim()) {
      newErrors.address = '住所は必須です';
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

  const handleInputChange = (field: keyof MemberFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const genderOptions = [
    { value: 'male', label: '男性' },
    { value: 'female', label: '女性' },
    { value: 'other', label: 'その他' }
  ];

  const paymentMethodOptions = [
    { value: 'credit', label: 'クレジットカード' },
    { value: 'bank', label: '口座振替' },
    { value: 'cash', label: '現金' }
  ];

  const accountTypeOptions = [
    { value: 'normal', label: '普通' },
    { value: 'current', label: '当座' }
  ];

  const statusOptions = [
    { value: 'active', label: '有効' },
    { value: 'inactive', label: '退会' },
    { value: 'suspended', label: '停止中' },
    { value: 'pending', label: '入会手続き中' }
  ];

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {/* 基本情報 */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <i className="fas fa-user text-primary-500" />
          基本情報
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="会員ID"
            value={formData.memberId}
            onChange={(e) => handleInputChange('memberId', e.target.value)}
            placeholder="SV000005"
            fullWidth
            icon="fas fa-id-card"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              ステータス <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value as MemberFormData['status'])}
              className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2.5 text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              required
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

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

          <Input
            label="フリガナ"
            value={formData.nameKana}
            onChange={(e) => handleInputChange('nameKana', e.target.value)}
            error={errors.nameKana}
            placeholder="ヤマダタロウ"
            required
            fullWidth
            icon="fas fa-user"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              性別 <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value as MemberFormData['gender'])}
              className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2.5 text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              required
            >
              {genderOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="生年月日"
            type="date"
            value={formData.birthDate}
            onChange={(e) => handleInputChange('birthDate', e.target.value)}
            error={errors.birthDate}
            required
            fullWidth
            icon="fas fa-calendar"
          />
        </div>
      </div>

      {/* 連絡先情報 */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <i className="fas fa-address-book text-primary-500" />
          連絡先情報
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="郵便番号"
            value={formData.postalCode}
            onChange={(e) => handleInputChange('postalCode', e.target.value)}
            placeholder="123-4567"
            fullWidth
            icon="fas fa-map-marker-alt"
          />

          <div className="md:col-span-2">
            <Input
              label="住所"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              error={errors.address}
              placeholder="東京都渋谷区..."
              required
              fullWidth
              icon="fas fa-home"
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
            label="モバイルメールアドレス"
            type="email"
            value={formData.emailMobile}
            onChange={(e) => handleInputChange('emailMobile', e.target.value)}
            placeholder="mobile@domain.com"
            fullWidth
            icon="fas fa-envelope"
          />

          <Input
            label="電話番号（固定）"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            error={errors.phone}
            placeholder="03-1234-5678"
            fullWidth
            icon="fas fa-phone"
          />

          <Input
            label="電話番号（携帯）"
            type="tel"
            value={formData.phoneMobile}
            onChange={(e) => handleInputChange('phoneMobile', e.target.value)}
            placeholder="090-1234-5678"
            fullWidth
            icon="fas fa-mobile-alt"
          />

          <Input
            label="緊急連絡先"
            type="tel"
            value={formData.emergencyContact}
            onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
            placeholder="090-9876-5432"
            fullWidth
            icon="fas fa-phone-alt"
          />

          <Input
            label="緊急連絡先（続柄）"
            value={formData.emergencyContactRelation}
            onChange={(e) => handleInputChange('emergencyContactRelation', e.target.value)}
            placeholder="父、母、配偶者など"
            fullWidth
            icon="fas fa-users"
          />
        </div>
      </div>

      {/* 会員カード・入会情報 */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <i className="fas fa-id-badge text-primary-500" />
          会員カード・入会情報
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="会員カード番号"
            value={formData.cardNumber}
            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
            placeholder="カード番号"
            fullWidth
            icon="fas fa-credit-card"
          />

          <Input
            label="入会日"
            type="date"
            value={formData.enrollmentDate}
            onChange={(e) => handleInputChange('enrollmentDate', e.target.value)}
            required
            fullWidth
            icon="fas fa-calendar-check"
          />

          <Input
            label="コース"
            value={formData.course}
            onChange={(e) => handleInputChange('course', e.target.value)}
            placeholder="ダンスコース"
            fullWidth
            icon="fas fa-book"
          />

          <Input
            label="月謝"
            value={formData.monthlyFee}
            onChange={(e) => handleInputChange('monthlyFee', e.target.value)}
            placeholder="10000"
            fullWidth
            icon="fas fa-yen-sign"
          />

          <Input
            label="チケット種別"
            value={formData.ticketType}
            onChange={(e) => handleInputChange('ticketType', e.target.value)}
            placeholder="回数券など"
            fullWidth
            icon="fas fa-ticket-alt"
          />

          <Input
            label="現在のポイント"
            value={formData.currentPoints}
            onChange={(e) => handleInputChange('currentPoints', e.target.value)}
            placeholder="0"
            fullWidth
            icon="fas fa-star"
          />
        </div>
      </div>

      {/* 支払い情報 */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <i className="fas fa-credit-card text-primary-500" />
          支払い情報
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              支払い方法
            </label>
            <select
              value={formData.paymentMethod}
              onChange={(e) => handleInputChange('paymentMethod', e.target.value as MemberFormData['paymentMethod'])}
              className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2.5 text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              {paymentMethodOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="引落日"
            value={formData.withdrawalDate}
            onChange={(e) => handleInputChange('withdrawalDate', e.target.value)}
            placeholder="27日"
            fullWidth
            icon="fas fa-calendar-day"
          />

          {formData.paymentMethod === 'bank' && (
            <>
              <Input
                label="銀行名"
                value={formData.bankName}
                onChange={(e) => handleInputChange('bankName', e.target.value)}
                placeholder="三菱UFJ銀行"
                fullWidth
                icon="fas fa-university"
              />

              <Input
                label="支店名"
                value={formData.bankBranch}
                onChange={(e) => handleInputChange('bankBranch', e.target.value)}
                placeholder="渋谷支店"
                fullWidth
                icon="fas fa-building"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  口座種別
                </label>
                <select
                  value={formData.accountType}
                  onChange={(e) => handleInputChange('accountType', e.target.value as MemberFormData['accountType'])}
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2.5 text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  {accountTypeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label="口座番号"
                value={formData.accountNumber}
                onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                placeholder="1234567"
                fullWidth
                icon="fas fa-hashtag"
              />

              <Input
                label="口座名義人"
                value={formData.accountHolder}
                onChange={(e) => handleInputChange('accountHolder', e.target.value)}
                placeholder="ヤマダタロウ"
                fullWidth
                icon="fas fa-user"
              />
            </>
          )}

          {formData.paymentMethod === 'credit' && (
            <Input
              label="クレジットカード下4桁"
              value={formData.creditCardLast4}
              onChange={(e) => handleInputChange('creditCardLast4', e.target.value)}
              placeholder="****"
              maxLength={4}
              fullWidth
              icon="fas fa-credit-card"
            />
          )}
        </div>
      </div>

      {/* 紹介・その他 */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <i className="fas fa-info-circle text-primary-500" />
          紹介・その他
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="紹介者会員ID"
            value={formData.referralMemberId}
            onChange={(e) => handleInputChange('referralMemberId', e.target.value)}
            placeholder="SV000001"
            fullWidth
            icon="fas fa-user-friends"
          />

          <Input
            label="キャンペーンコード"
            value={formData.campaignCode}
            onChange={(e) => handleInputChange('campaignCode', e.target.value)}
            placeholder="SPRING2025"
            fullWidth
            icon="fas fa-tag"
          />

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              備考・メモ
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="特記事項など"
              rows={4}
              className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2.5 text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.specialEvents}
                onChange={(e) => handleInputChange('specialEvents', e.target.checked)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                スペシャルイベントに参加
              </span>
            </label>
          </div>
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