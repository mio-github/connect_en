import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ja' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ja: {
    // Header
    'header.notifications': '通知',
    'header.darkMode': 'ダークモード',
    'header.lightMode': 'ライトモード',
    'header.settings': '設定',
    'header.userMenu': 'ユーザーメニュー',

    // Dashboard
    'dashboard.title': 'ダッシュボード',
    'dashboard.activeMembers': 'アクティブ生徒数',
    'dashboard.todayAttendance': '今日の出席率',
    'dashboard.paymentOverdue': '支払い滞納者',
    'dashboard.monthlySales': '今月の売上',
    'dashboard.studioUtilization': 'スタジオ稼働率',
    'dashboard.instructorAssignment': '講師配置状況',
    'dashboard.selectSchool': '表示スクール:',
    'dashboard.allSchools': '全スクール',
    'dashboard.salesGoal': '売上目標達成率',
    'dashboard.goalSettings': '目標設定',
    'dashboard.targetAmount': '目標金額',
    'dashboard.actualAmount': '実績金額',
    'dashboard.progressRate': '進捗率',
    'dashboard.remaining': '残り',
    'dashboard.schoolComparison': 'スクール別パフォーマンス比較',
    'dashboard.schoolName': 'スクール名',
    'dashboard.memberCount': '会員数',
    'dashboard.attendanceRate': '出席率',
    'dashboard.salesActual': '売上実績',
    'dashboard.achievementRate': '目標達成率',
    'dashboard.utilizationRate': '稼働率',

    // Member Management
    'members.title': '会員一覧',
    'members.description': '会員情報の確認・編集・新規登録を行えます',
    'members.totalMembers': '総会員数',
    'members.activeMembers': 'アクティブ会員',
    'members.newThisMonth': '今月の新規会員',
    'members.search': '会員名、メール、電話番号で検索',
    'members.export': 'エクスポート',
    'members.addNew': '新規会員登録',
    'members.backToList': '一覧に戻る',
    'members.editTitle': '会員情報編集',
    'members.addTitle': '新規会員登録',
    'members.editDescription': '会員情報を編集してください',
    'members.addDescription': '新しい会員の情報を入力してください',

    // Member Form
    'form.basicInfo': '基本情報',
    'form.contactInfo': '連絡先情報',
    'form.cardInfo': '会員カード・入会情報',
    'form.paymentInfo': '支払い情報',
    'form.otherInfo': '紹介・その他',
    'form.memberId': '会員ID',
    'form.status': 'ステータス',
    'form.name': '氏名',
    'form.nameKana': 'フリガナ',
    'form.gender': '性別',
    'form.birthDate': '生年月日',
    'form.postalCode': '郵便番号',
    'form.address': '住所',
    'form.email': 'メールアドレス',
    'form.emailMobile': 'モバイルメールアドレス',
    'form.phone': '電話番号（固定）',
    'form.phoneMobile': '電話番号（携帯）',
    'form.emergencyContact': '緊急連絡先',
    'form.emergencyContactRelation': '緊急連絡先（続柄）',
    'form.cardNumber': '会員カード番号',
    'form.enrollmentDate': '入会日',
    'form.course': 'コース',
    'form.monthlyFee': '月謝',
    'form.ticketType': 'チケット種別',
    'form.currentPoints': '現在のポイント',
    'form.paymentMethod': '支払い方法',
    'form.withdrawalDate': '引落日',
    'form.bankName': '銀行名',
    'form.bankBranch': '支店名',
    'form.accountType': '口座種別',
    'form.accountNumber': '口座番号',
    'form.accountHolder': '口座名義人',
    'form.creditCardLast4': 'クレジットカード下4桁',
    'form.referralMemberId': '紹介者会員ID',
    'form.campaignCode': 'キャンペーンコード',
    'form.notes': '備考・メモ',
    'form.specialEvents': 'スペシャルイベントに参加',
    'form.cancel': 'キャンセル',
    'form.save': '保存',
    'form.register': '登録',
    'form.update': '更新',

    // Status
    'status.active': '有効',
    'status.inactive': '退会',
    'status.suspended': '停止中',
    'status.pending': '入会手続き中',

    // Gender
    'gender.male': '男性',
    'gender.female': '女性',
    'gender.other': 'その他',

    // Payment Method
    'payment.credit': 'クレジットカード',
    'payment.bank': '口座振替',
    'payment.cash': '現金',

    // Account Type
    'account.normal': '普通',
    'account.current': '当座',

    // Studios
    'studio.endance': 'EnDanceスタジオ',
    'studio.a': 'Aスタジオ',
  },
  en: {
    // Header
    'header.notifications': 'Notifications',
    'header.darkMode': 'Dark Mode',
    'header.lightMode': 'Light Mode',
    'header.settings': 'Settings',
    'header.userMenu': 'User Menu',

    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.activeMembers': 'Active Students',
    'dashboard.todayAttendance': 'Today\'s Attendance',
    'dashboard.paymentOverdue': 'Payment Overdue',
    'dashboard.monthlySales': 'Monthly Sales',
    'dashboard.studioUtilization': 'Studio Utilization',
    'dashboard.instructorAssignment': 'Instructor Assignment',
    'dashboard.selectSchool': 'Display School:',
    'dashboard.allSchools': 'All Schools',
    'dashboard.salesGoal': 'Sales Goal Achievement',
    'dashboard.goalSettings': 'Goal Settings',
    'dashboard.targetAmount': 'Target Amount',
    'dashboard.actualAmount': 'Actual Amount',
    'dashboard.progressRate': 'Progress Rate',
    'dashboard.remaining': 'Remaining',
    'dashboard.schoolComparison': 'School Performance Comparison',
    'dashboard.schoolName': 'School Name',
    'dashboard.memberCount': 'Member Count',
    'dashboard.attendanceRate': 'Attendance Rate',
    'dashboard.salesActual': 'Sales Actual',
    'dashboard.achievementRate': 'Achievement Rate',
    'dashboard.utilizationRate': 'Utilization Rate',

    // Member Management
    'members.title': 'Member List',
    'members.description': 'View, edit, and register member information',
    'members.totalMembers': 'Total Members',
    'members.activeMembers': 'Active Members',
    'members.newThisMonth': 'New This Month',
    'members.search': 'Search by name, email, or phone',
    'members.export': 'Export',
    'members.addNew': 'Add New Member',
    'members.backToList': 'Back to List',
    'members.editTitle': 'Edit Member',
    'members.addTitle': 'Add New Member',
    'members.editDescription': 'Edit member information',
    'members.addDescription': 'Enter new member information',

    // Member Form
    'form.basicInfo': 'Basic Information',
    'form.contactInfo': 'Contact Information',
    'form.cardInfo': 'Member Card & Enrollment',
    'form.paymentInfo': 'Payment Information',
    'form.otherInfo': 'Referral & Other',
    'form.memberId': 'Member ID',
    'form.status': 'Status',
    'form.name': 'Name',
    'form.nameKana': 'Name (Kana)',
    'form.gender': 'Gender',
    'form.birthDate': 'Birth Date',
    'form.postalCode': 'Postal Code',
    'form.address': 'Address',
    'form.email': 'Email',
    'form.emailMobile': 'Mobile Email',
    'form.phone': 'Phone (Home)',
    'form.phoneMobile': 'Phone (Mobile)',
    'form.emergencyContact': 'Emergency Contact',
    'form.emergencyContactRelation': 'Emergency Contact (Relation)',
    'form.cardNumber': 'Card Number',
    'form.enrollmentDate': 'Enrollment Date',
    'form.course': 'Course',
    'form.monthlyFee': 'Monthly Fee',
    'form.ticketType': 'Ticket Type',
    'form.currentPoints': 'Current Points',
    'form.paymentMethod': 'Payment Method',
    'form.withdrawalDate': 'Withdrawal Date',
    'form.bankName': 'Bank Name',
    'form.bankBranch': 'Bank Branch',
    'form.accountType': 'Account Type',
    'form.accountNumber': 'Account Number',
    'form.accountHolder': 'Account Holder',
    'form.creditCardLast4': 'Credit Card Last 4',
    'form.referralMemberId': 'Referral Member ID',
    'form.campaignCode': 'Campaign Code',
    'form.notes': 'Notes',
    'form.specialEvents': 'Participate in Special Events',
    'form.cancel': 'Cancel',
    'form.save': 'Save',
    'form.register': 'Register',
    'form.update': 'Update',

    // Status
    'status.active': 'Active',
    'status.inactive': 'Inactive',
    'status.suspended': 'Suspended',
    'status.pending': 'Pending',

    // Gender
    'gender.male': 'Male',
    'gender.female': 'Female',
    'gender.other': 'Other',

    // Payment Method
    'payment.credit': 'Credit Card',
    'payment.bank': 'Bank Transfer',
    'payment.cash': 'Cash',

    // Account Type
    'account.normal': 'Normal',
    'account.current': 'Current',

    // Studios
    'studio.endance': 'EnDance Studio',
    'studio.a': 'A-Studio',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'ja';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ja']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
