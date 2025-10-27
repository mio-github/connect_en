import React, { useState } from 'react';
import { FileText, Shield, Building, Check, X } from 'lucide-react';

type TabType = 'terms' | 'privacy' | 'commerce';

interface TabContent {
  id: TabType;
  label: string;
  labelEn: string;
  icon: React.ReactNode;
  content: string[];
}

export const MemberTerms: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('terms');
  const [hasAgreed, setHasAgreed] = useState(false);

  const tabs: TabContent[] = [
    {
      id: 'terms',
      label: '利用規約',
      labelEn: 'Terms of Service',
      icon: <FileText className="h-5 w-5" />,
      content: [
        '第1条（適用）',
        '本規約は、En Dance Studio（以下「当スタジオ」といいます。）が提供するサービス（以下「本サービス」といいます。）の利用条件を定めるものです。会員の皆様（以下「会員」といいます。）には、本規約に従って、本サービスをご利用いただきます。',
        '',
        '第2条（利用登録）',
        '1. 登録希望者が当スタジオの定める方法によって利用登録を申請し、当スタジオがこれを承認することによって、利用登録が完了するものとします。',
        '2. 当スタジオは、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあり、その理由については一切の開示義務を負わないものとします。',
        '  (1) 利用登録の申請に際して虚偽の事項を届け出た場合',
        '  (2) 本規約に違反したことがある者からの申請である場合',
        '  (3) その他、当スタジオが利用登録を相当でないと判断した場合',
        '',
        '第3条（会員情報の変更）',
        '会員は、登録情報に変更があった場合、速やかに当スタジオの定める方法により当該変更事項を届け出るものとします。',
        '',
        '第4条（禁止事項）',
        '会員は、本サービスの利用にあたり、以下の行為をしてはなりません。',
        '1. 法令または公序良俗に違反する行為',
        '2. 犯罪行為に関連する行為',
        '3. 当スタジオのサーバーまたはネットワークの機能を破壊したり、妨害したりする行為',
        '4. 当スタジオのサービスの運営を妨害するおそれのある行為',
        '5. 他の会員に関する個人情報等を収集または蓄積する行為',
        '6. 他の会員に成りすます行為',
        '7. 当スタジオのサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為',
        '8. その他、当スタジオが不適切と判断する行為',
        '',
        '第5条（本サービスの提供の停止等）',
        '当スタジオは、以下のいずれかの事由があると判断した場合、会員に事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。',
        '1. 本サービスにかかるコンピュータシステムの保守点検または更新を行う場合',
        '2. 地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合',
        '3. コンピュータまたは通信回線等が事故により停止した場合',
        '4. その他、当スタジオが本サービスの提供が困難と判断した場合',
        '',
        '第6条（免責事項）',
        '1. 当スタジオは、本サービスに関して、会員と他の会員または第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。',
        '2. 当スタジオは、本サービスが会員の特定の目的に適合すること、期待する機能・商品的価値・正確性・有用性を有すること、会員による本サービスの利用が会員に適用のある法令または業界団体の内部規則等に適合すること、および不具合が生じないことについて、何ら保証するものではありません。',
      ]
    },
    {
      id: 'privacy',
      label: 'プライバシーポリシー',
      labelEn: 'Privacy Policy',
      icon: <Shield className="h-5 w-5" />,
      content: [
        'プライバシーポリシー',
        '',
        'En Dance Studio（以下「当スタジオ」）は、以下のとおり個人情報保護方針を定め、個人情報保護の仕組みを構築し、全従業員に個人情報保護の重要性の認識と取組みを徹底させることにより、個人情報の保護を推進致します。',
        '',
        '個人情報の管理',
        '当スタジオは、お客さまの個人情報を正確かつ最新の状態に保ち、個人情報への不正アクセス・紛失・破損・改ざん・漏洩などを防止するため、セキュリティシステムの維持・管理体制の整備・社員教育の徹底等の必要な措置を講じ、安全対策を実施し個人情報の厳重な管理を行ないます。',
        '',
        '個人情報の利用目的',
        '当スタジオは、お客さまからお預かりした個人情報を以下の目的で利用します。',
        '1. 当スタジオが提供するサービスの提供・運営のため',
        '2. お客さまからのお問い合わせに回答するため（本人確認を行うことを含む）',
        '3. お客さまが利用中のサービスの新機能、更新情報、キャンペーン等及び当スタジオが提供する他のサービスの案内のメールを送付するため',
        '4. メンテナンス、重要なお知らせなど必要に応じたご連絡のため',
        '5. 利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーの特定をし、ご利用をお断りするため',
        '6. ユーザーにご自身の登録情報の閲覧や変更、削除、ご利用状況の閲覧を行っていただくため',
        '7. 上記の利用目的に付随する目的',
        '',
        '個人情報の第三者への開示・提供の禁止',
        '当スタジオは、お客さまよりお預かりした個人情報を適切に管理し、次のいずれかに該当する場合を除き、個人情報を第三者に開示いたしません。',
        '1. お客さまの同意がある場合',
        '2. お客さまが希望されるサービスを行なうために当スタジオが業務を委託する業者に対して開示する場合',
        '3. 法令に基づき開示することが必要である場合',
        '',
        '個人情報の安全対策',
        '当スタジオは、個人情報の正確性及び安全性確保のために、セキュリティに万全の対策を講じています。',
        '',
        'ご本人の照会',
        'お客さまがご本人の個人情報の照会・修正・削除などをご希望される場合には、ご本人であることを確認の上、対応させていただきます。',
        '',
        '法令、規範の遵守と見直し',
        '当スタジオは、保有する個人情報に関して適用される日本の法令、その他規範を遵守するとともに、本ポリシーの内容を適宜見直し、その改善に努めます。',
        '',
        'お問い合わせ',
        '当スタジオの個人情報の取扱に関するお問い合わせは下記までご連絡ください。',
        '',
        'En Dance Studio',
        'メール：privacy@en-dance-studio.com',
        '電話：03-1234-5678',
      ]
    },
    {
      id: 'commerce',
      label: '特定商取引法に基づく表記',
      labelEn: 'Commercial Transactions Act',
      icon: <Building className="h-5 w-5" />,
      content: [
        '特定商取引法に基づく表記',
        '',
        '事業者名',
        'En Dance Studio',
        '',
        '代表者',
        '代表取締役 山田太郎',
        '',
        '所在地',
        '〒150-0001',
        '東京都渋谷区神宮前1-2-3 En ビル5F',
        '',
        '電話番号',
        '03-1234-5678',
        '受付時間：10:00-19:00（土日祝日を除く）',
        '',
        'メールアドレス',
        'info@en-dance-studio.com',
        '',
        '販売価格',
        '各サービスページに記載',
        '',
        '販売価格以外でお客様に発生する金銭',
        '消費税、振込手数料',
        '',
        '代金の支払時期',
        'クレジットカード決済：各カード会社の引き落とし日',
        '銀行振込：予約確定後7日以内',
        '',
        '代金の支払方法',
        '・クレジットカード決済',
        '・銀行振込',
        '・コンビニ決済',
        '',
        '役務または商品の引渡時期',
        'レッスン予約：予約確定後、指定日時',
        'ポイント購入：決済完了後即時',
        '月謝：毎月1日',
        '',
        '返品・キャンセルについて',
        'レッスン予約のキャンセル：開始24時間前まで無料',
        '※24時間以内のキャンセルは50%、当日キャンセルは100%のキャンセル料が発生します',
        'ポイント購入：購入後の返金不可',
        '月謝：前月20日までに退会申請で翌月から停止',
        '',
        '不良品の取扱条件',
        'サービスに不具合があった場合、速やかにお問い合わせください。',
        '状況確認後、返金またはレッスンの振替対応をいたします。',
        '',
        '販売数量',
        '各サービスページに記載（レッスンは定員制）',
        '',
        '動作環境',
        'オンラインレッスン利用の場合：',
        '・インターネット環境（推奨：10Mbps以上）',
        '・PC、スマートフォン、タブレット',
        '・Zoom、Google Meet等のビデオ会議アプリ',
        '',
        '表現、及び商品に関する注意書き',
        '本サービスの利用により得られる効果には個人差があります。',
      ]
    }
  ];

  const currentTab = tabs.find(tab => tab.id === activeTab);

  const handleAgree = () => {
    setHasAgreed(true);
    // 同意後の処理（前の画面に戻る、または次の画面に進むなど）
    console.log('User agreed to terms');
  };

  const handleDecline = () => {
    // 同意しない場合の処理
    console.log('User declined terms');
  };

  return (
    <div className="min-h-screen bg-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* フェーズバッジ */}
        <div className="flex justify-end mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border-2 border-blue-300">
            Phase 1
          </span>
        </div>

        {/* ヘッダー */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">En</span>
          </div>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            利用規約
          </h1>
          <p className="mt-2 text-gray-600">
            Terms & Policies
          </p>
        </div>

        {/* タブナビゲーション */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-4 px-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    {tab.icon}
                    <div>
                      <div className="hidden md:block">{tab.label}</div>
                      <div className="text-xs text-gray-400 hidden md:block">{tab.labelEn}</div>
                      <div className="md:hidden text-xs">{tab.label}</div>
                    </div>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* コンテンツエリア */}
          <div className="p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {currentTab?.label}
              </h2>
              <p className="text-sm text-gray-600">{currentTab?.labelEn}</p>
            </div>

            {/* スクロール可能なテキストエリア */}
            <div className="bg-gray-50 rounded-lg p-6 h-96 overflow-y-auto border border-gray-200">
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                {currentTab?.content.map((paragraph, index) => (
                  <p key={index} className={paragraph === '' ? 'h-2' : ''}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* 同意セクション */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-gray-700">
                    <p className="font-medium text-blue-900 mb-1">
                      重要なお知らせ
                    </p>
                    <p>
                      本サービスをご利用いただくには、上記の内容をすべてご確認いただき、同意していただく必要があります。
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleDecline}
                  className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <X className="h-5 w-5" />
                  <span>同意しない / Decline</span>
                </button>

                <button
                  onClick={handleAgree}
                  disabled={hasAgreed}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Check className="h-5 w-5" />
                  <span>{hasAgreed ? '同意済み / Agreed' : '同意する / Agree'}</span>
                </button>
              </div>

              {hasAgreed && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 text-green-800">
                    <Check className="h-5 w-5" />
                    <span className="font-medium">ご同意いただきありがとうございます</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    引き続きサービスをご利用いただけます。
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 戻るリンク */}
        <div className="text-center mt-6">
          <button className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
            ← 前の画面に戻る / Back
          </button>
        </div>

        {/* フッター */}
        <div className="text-center text-xs text-gray-500 mt-6">
          <p>© 2024 En Dance Studio. All rights reserved.</p>
          <p className="mt-1">最終更新日：2024年10月27日</p>
        </div>
      </div>
    </div>
  );
};
