# ClaudeSub01 作業指示書

## 担当領域
**会員側画面の実装** (20画面)

## 作業ディレクトリ
```
mio_desgin_system/ui_mockups_react/connecten-ui/src/pages/
```

## 既存の参考ファイル
以下の既存ファイルを参考にしてください:
- `MemberLogin.tsx` - ログイン画面
- `MemberMyPage.tsx` - マイページ
- `MemberLessonBooking.tsx` - レッスン予約
- `MemberPoints.tsx` - ポイント管理
- `MemberQR.tsx` - QRコード表示

## 使用可能な共通コンポーネント
```typescript
import { MemberHeader } from '../components/Layout/MemberHeader';
import { Button } from '../components/UI/Button';
// その他、既存のcomponentsフォルダ内のコンポーネント
```

## タスクリスト

### Phase 1: ログイン・登録関連 (優先度: 高)
1. **MemberRegistration.tsx** - 会員登録
   - フォーム: 氏名、メール、パスワード、電話番号
   - バリデーション表示
   - 利用規約への同意チェックボックス
   - 登録完了後の遷移（MemberMyPageへ）

2. **MemberTerms.tsx** - 利用規約・プライバシーポリシー
   - タブ切り替え（利用規約 / プライバシーポリシー / 特定商取引法）
   - スクロール可能なテキストエリア
   - 同意ボタン

### Phase 2: レッスン予約フロー (優先度: 高)
3. **MemberLessonBookingConfirm.tsx** - 予約確認
   - 選択したレッスン情報表示
   - 日時、インストラクター、料金
   - 確定ボタン、戻るボタン

4. **MemberLessonBookingComplete.tsx** - 予約完了
   - 予約完了メッセージ
   - 予約詳細表示
   - QRコード表示
   - マイページへ戻るボタン

5. **MemberOnlineLesson.tsx** - オンラインレッスン
   - オンラインレッスン一覧
   - 参加URL表示（ダミー）
   - 視聴環境テストボタン

6. **MemberEvents.tsx** - イベント・ワークショップ
   - イベント一覧カード
   - イベント詳細モーダル
   - 申込ボタン

### Phase 3: 履歴・通知管理 (優先度: 中)
7. **MemberReservationHistory.tsx** - 予約・キャンセル履歴
   - 予約一覧テーブル
   - フィルタ（期間、ステータス）
   - キャンセルボタン

8. **MemberLessonHistory.tsx** - レッスン履歴
   - 受講済みレッスン一覧
   - 評価・フィードバック入力モーダル

9. **MemberRentalStudioHistory.tsx** - 貸しスタジオ履歴
   - 利用履歴一覧
   - 統計グラフ（ダミー）

10. **MemberNotifications.tsx** - 通知一覧
    - 通知リスト（未読/既読）
    - 通知詳細モーダル
    - 通知設定リンク

11. **MemberMessages.tsx** - メッセージ
    - メッセージ一覧
    - メッセージ詳細表示
    - 返信フォーム

### Phase 4: 決済・ポイント (優先度: 中)
12. **MemberPointPurchase.tsx** - Enポイント購入
    - ポイントパッケージ選択
    - 決済フォーム
    - 購入履歴表示

13. **MemberTicketPurchase.tsx** - チケット購入
    - チケット種類選択
    - 数量選択
    - 決済フォーム

14. **MemberMonthlyTuition.tsx** - 月謝支払い
    - 月謝情報表示
    - 支払い履歴
    - 支払い方法変更リンク

15. **MemberPurchaseHistory.tsx** - 購入履歴
    - 購入履歴一覧
    - レシート表示モーダル
    - エクスポートボタン

### Phase 5: ソーシャル機能 (優先度: 低)
16. **MemberReferral.tsx** - 友達紹介
    - 紹介コード表示
    - 紹介リンク生成
    - 紹介特典説明
    - 紹介実績表示

17. **MemberShare.tsx** - シェア機能
    - QRコード生成
    - SNSシェアボタン（LINE, X, Facebook）
    - シェアURL生成

### Phase 6: 設定画面 (優先度: 中)
18. **MemberSettingsTop.tsx** - 設定トップ
    - 設定メニューリスト
    - 各設定へのリンク

19. **MemberEmailChange.tsx** - メールアドレス変更
    - 現在のメール表示
    - 新しいメール入力フォーム
    - 確認メール送信

20. **MemberPasswordChange.tsx** - パスワード変更
    - 現在のパスワード入力
    - 新しいパスワード入力（×2）
    - パスワード強度表示

21. **MemberPaymentSettings.tsx** - 支払い設定
    - 登録済みカード一覧
    - カード追加フォーム
    - デフォルト設定

## ⚠️ 重要: コンテンツガイドライン

**必ず読んでください**: `mock_tasks/CONTENT_GUIDELINES.md`

### 使用禁止表現
会員側画面（社内システム）では以下の表現を使わないでください:
- ❌ 「アップグレード」「プレミアム機能」
- ❌ 「有料プラン」「無料プラン」
- ❌ 「サブスクリプション」

✅ 正しい表現:
- 「設定」「機能」
- 「権限」「アクセス権」
- 「会員登録」

## 実装ガイドライン

### 基本テンプレート
```typescript
import React from 'react';
import { MemberHeader } from '../components/Layout/MemberHeader';
import { Button } from '../components/UI/Button';

const ComponentName: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <MemberHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">ページタイトル</h1>
        {/* コンテンツ */}
      </main>
    </div>
  );
};

export default ComponentName;
```

### デザインガイドライン
- **カラー**: 既存のTailwindカラーパレットを使用
- **スペーシング**: `p-4`, `mb-6`, `gap-4`など、4の倍数を基本とする
- **ボタン**: `<Button variant="primary">` などを使用
- **フォーム**: `border border-gray-300 rounded-lg p-2` などの統一スタイル

### レスポンシブ対応
```typescript
// モバイルファースト
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

### ダミーデータの使い方
```typescript
const dummyData = [
  { id: 1, name: 'サンプル1', date: '2025-11-01' },
  { id: 2, name: 'サンプル2', date: '2025-11-02' },
];
```

## 進捗報告

作業開始時と完了時に以下のファイルを更新してください:
```
mock_tasks/progress/ClaudeSub01_progress.md
```

### 報告フォーマット
```markdown
## 作業日: 2025-10-27

### 完了したタスク
- [x] MemberRegistration.tsx
- [x] MemberTerms.tsx

### 作業中のタスク
- [ ] MemberLessonBookingConfirm.tsx (70%完了)

### 問題・質問
- 特になし
```

## 注意事項

1. **ファイル命名規則**
   - 必ず`Member`プレフィックスを付ける
   - PascalCaseを使用
   - 例: `MemberRegistration.tsx`

2. **競合回避**
   - `src/pages/Member*.tsx`以外は編集しない
   - 共通コンポーネントの変更が必要な場合は**ClaudeMain**に報告

3. **コミット**
   - こまめにコミット（機能単位）
   - コミットメッセージは明確に

4. **テスト**
   - 各画面をブラウザで表示確認
   - TypeScriptエラーがないことを確認
   - `npm run dev`で動作確認

## 完了基準

各画面について:
- [ ] TypeScriptコンパイルエラーなし
- [ ] 画面が正しく表示される
- [ ] レスポンシブデザイン対応
- [ ] ダミーデータで動作確認済み
- [ ] 既存デザインシステムに準拠

## 質問・報告先

問題が発生した場合やサポートが必要な場合:
- **ClaudeMain**に報告
- `mock_tasks/progress/ClaudeSub01_progress.md`に記載

---

**開始前に必ず既存ファイルを確認し、コーディングスタイルを統一してください。**
**Good luck!**
