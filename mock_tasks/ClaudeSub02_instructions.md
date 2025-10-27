# ClaudeSub02 作業指示書

## 担当領域
**管理画面（POS・コース・貸しスタジオ・通知）の実装** (18画面)

## 作業ディレクトリ
```
mio_desgin_system/ui_mockups_react/connecten-ui/src/pages/
```

## 既存の参考ファイル
以下の既存ファイルを参考にしてください:
- `Dashboard.tsx` - ダッシュボード
- `MemberManagement.tsx` - 会員管理
- `StaffManagement.tsx` - スタッフ管理
- `PaymentManagement.tsx` - 支払い管理
- `SchoolManagement.tsx` - スクール管理

## 使用可能な共通コンポーネント
```typescript
import { Header } from '../components/Layout/Header';
import { Sidebar } from '../components/Layout/Sidebar';
import { Button } from '../components/UI/Button';
// その他、既存のcomponentsフォルダ内のコンポーネント
```

## タスクリスト

### Phase 1: POS・販売管理 (優先度: 高)
1. **POSSearch.tsx** - POS検索
   - 販売履歴検索フォーム（日付、商品、金額）
   - 検索結果一覧テーブル
   - レシート再発行ボタン
   - 返品・交換処理モーダル
   - エクスポート機能

2. **CashDenomination.tsx** - 金種表
   - 各金種の枚数入力フォーム（10,000円、5,000円、etc.）
   - 合計金額の自動計算
   - 釣銭計算機能
   - 印刷ボタン

3. **POSSettings.tsx** - POS設定
   - POS端末設定タブ
   - 商品マスタ管理（商品一覧、追加、編集、削除）
   - 割引設定（割引率、期間設定）
   - 税率設定
   - レシート設定

4. **RetailManagement.tsx** - 小売管理
   - 商品在庫管理テーブル
   - 在庫アラート設定
   - 販売実績グラフ
   - 商品カテゴリ管理
   - 発注管理

### Phase 2: コース・月謝管理 (優先度: 高)
5. **CourseList.tsx** - コース一覧
   - コース一覧テーブル
   - フィルタ（カテゴリ、レベル、価格）
   - ソート機能
   - コース追加ボタン
   - コース編集・削除機能

6. **CourseDetail.tsx** - コース詳細
   - コース基本情報表示
   - レッスンスケジュールカレンダー
   - 料金・定員情報
   - 申込者一覧
   - コース編集ボタン

7. **MonthlyFeeSearch.tsx** - 月謝検索
   - 検索フォーム（会員名、月、ステータス）
   - 月謝一覧テーブル
   - 支払い状況（未払い、支払い済み）
   - 料金調整機能
   - 一括処理機能

### Phase 3: 会員管理追加機能 (優先度: 高)
8. **MemberEnrollment.tsx** - 入会管理
   - 新規会員登録フォーム
   - 会員プラン選択
   - 初期設定（月謝、コース選択）
   - 契約書生成
   - 入会完了処理

9. **MemberSearch.tsx** - 会員検索
   - 詳細検索フォーム（名前、電話、メール、ステータス）
   - 検索結果一覧
   - 検索結果フィルタリング
   - 一括操作（メール送信、ステータス変更）
   - エクスポート機能

### Phase 4: レッスン管理追加 (優先度: 中)
10. **OnlineLessonManagement.tsx** - オンラインレッスン管理
    - オンラインレッスン一覧
    - 配信URL管理（Zoom、YouTube等）
    - 参加者管理
    - 録画管理
    - テクニカルサポート記録

### Phase 5: 貸しスタジオ管理 (優先度: 中)
11. **RentalStudioList.tsx** - 貸しスタジオ一覧
    - スタジオ一覧カード表示
    - 空き状況カレンダー
    - クイック予約機能
    - スタジオ情報編集

12. **RentalStudioDetail.tsx** - 貸しスタジオ詳細
    - 施設詳細情報（広さ、設備、写真）
    - 料金プラン表示
    - 設備・備品リスト
    - 予約状況カレンダー
    - 編集ボタン

13. **RentalStudioReservation.tsx** - 貸しスタジオ予約
    - カレンダーから日時選択
    - 時間帯選択
    - オプション選択（機材レンタル等）
    - 予約者情報入力
    - 予約確認と確定

14. **RentalStudioPayment.tsx** - 貸しスタジオ決済
    - 料金計算（基本料金＋オプション）
    - 割引適用
    - 支払い方法選択
    - 領収書発行
    - キャンセルポリシー表示

### Phase 6: 通知管理 (優先度: 中)
15. **EmailDistribution.tsx** - メール配信
    - メールテンプレート選択
    - ターゲット選択（全会員、セグメント別）
    - 配信スケジュール設定
    - プレビュー機能
    - 配信履歴

16. **NotificationManagement.tsx** - お知らせ管理
    - お知らせ一覧
    - お知らせ作成フォーム
    - 公開設定（公開日時、対象者）
    - プッシュ通知設定
    - お知らせ履歴

### Phase 7: 支払い管理追加 (優先度: 低)
17. **CardRegistration.tsx** - カード登録
    - クレジットカード登録フォーム
    - 会員カード発行
    - セキュリティ確認（CVV、3Dセキュア）
    - 登録済みカード一覧
    - カード削除機能

18. **CardWriting.tsx** - カード書き込み
    - ICカード情報書き込みインターフェース
    - カードリーダー接続状態表示
    - カード検証
    - エラーハンドリング表示
    - 書き込み履歴

## 実装ガイドライン

### 基本テンプレート（管理画面）
```typescript
import React from 'react';
import { Header } from '../components/Layout/Header';
import { Sidebar } from '../components/Layout/Sidebar';
import { Button } from '../components/UI/Button';

const ComponentName: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold mb-6">ページタイトル</h1>
          {/* コンテンツ */}
        </main>
      </div>
    </div>
  );
};

export default ComponentName;
```

### テーブル実装例
```typescript
<div className="bg-white rounded-lg shadow overflow-hidden">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
          項目名
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map((item) => (
        <tr key={item.id}>
          <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

### フォーム実装例
```typescript
<form className="space-y-4">
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      項目名
    </label>
    <input
      type="text"
      className="w-full border border-gray-300 rounded-lg px-3 py-2"
      placeholder="入力してください"
    />
  </div>
  <Button type="submit">送信</Button>
</form>
```

### モーダル実装例
```typescript
{showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 max-w-md w-full">
      <h2 className="text-xl font-bold mb-4">モーダルタイトル</h2>
      {/* モーダルコンテンツ */}
      <div className="flex gap-2 mt-4">
        <Button onClick={() => setShowModal(false)}>キャンセル</Button>
        <Button variant="primary">確定</Button>
      </div>
    </div>
  </div>
)}
```

## ダミーデータ例

### POS販売データ
```typescript
const dummySalesData = [
  { id: 1, date: '2025-10-27', item: 'レッスンチケット', amount: 5000, payment: 'クレジットカード' },
  { id: 2, date: '2025-10-26', item: 'ダンスシューズ', amount: 8000, payment: '現金' },
];
```

### コースデータ
```typescript
const dummyCourses = [
  { id: 1, name: 'ヒップホップ初級', level: '初級', price: 8000, capacity: 20, enrolled: 15 },
  { id: 2, name: 'バレエ中級', level: '中級', price: 10000, capacity: 15, enrolled: 12 },
];
```

## 進捗報告

作業開始時と完了時に以下のファイルを更新してください:
```
mock_tasks/progress/ClaudeSub02_progress.md
```

### 報告フォーマット
```markdown
## 作業日: 2025-10-27

### 完了したタスク
- [x] POSSearch.tsx
- [x] CashDenomination.tsx

### 作業中のタスク
- [ ] POSSettings.tsx (60%完了)

### 問題・質問
- 商品マスタのデータ構造について確認が必要
```

## 注意事項

1. **ファイル命名規則**
   - PascalCaseを使用
   - 機能を明確に表す名前
   - 例: `POSSearch.tsx`, `CourseList.tsx`

2. **競合回避**
   - 担当ファイル以外は編集しない
   - 共通コンポーネントの変更が必要な場合は**ClaudeMain**に報告

3. **データ管理**
   - ダミーデータは各ファイル内で定義
   - 将来的にAPIに置き換えられることを想定した構造

4. **権限管理**
   - 管理画面なので権限チェックは後回し
   - モックアップでは全機能が表示される想定

## 完了基準

各画面について:
- [ ] TypeScriptコンパイルエラーなし
- [ ] 画面が正しく表示される
- [ ] テーブル・フォームが適切に配置
- [ ] レスポンシブデザイン対応
- [ ] ダミーデータで動作確認済み

## 質問・報告先

問題が発生した場合:
- **ClaudeMain**に報告
- `mock_tasks/progress/ClaudeSub02_progress.md`に記載

---

**開始前に必ず既存の管理画面ファイルを確認し、UIパターンを統一してください。**
**Good luck!**
