# タスク割り当て表

## 全体進捗
- **総画面数**: 88画面
- **完成済み**: 26画面 (30%)
- **残タスク**: 62画面 (70%)

---

## ClaudeSub01 担当: 会員側画面 (20画面)

### ログイン前
- [ ] MemberRegistration.tsx - 会員登録
- [ ] MemberTerms.tsx - 利用規約・プライバシーポリシー

### レッスン関連
- [ ] MemberLessonBookingConfirm.tsx - 予約確認
- [ ] MemberLessonBookingComplete.tsx - 予約完了
- [ ] MemberOnlineLesson.tsx - オンラインレッスン
- [ ] MemberEvents.tsx - イベント・ワークショップ

### 予約・履歴管理
- [ ] MemberReservationHistory.tsx - 予約・キャンセル履歴
- [ ] MemberLessonHistory.tsx - レッスン履歴
- [ ] MemberRentalStudioHistory.tsx - 貸しスタジオ履歴

### 通知・メッセージ
- [ ] MemberNotifications.tsx - 通知一覧
- [ ] MemberMessages.tsx - メッセージ

### 決済・ポイント関連
- [ ] MemberPointPurchase.tsx - Enポイント購入
- [ ] MemberTicketPurchase.tsx - チケット購入
- [ ] MemberMonthlyTuition.tsx - 月謝支払い
- [ ] MemberPurchaseHistory.tsx - 購入履歴

### 友達紹介・シェア
- [ ] MemberReferral.tsx - 友達紹介
- [ ] MemberShare.tsx - シェア機能

### 設定
- [ ] MemberSettingsTop.tsx - 設定トップ
- [ ] MemberEmailChange.tsx - メールアドレス変更
- [ ] MemberPasswordChange.tsx - パスワード変更
- [ ] MemberPaymentSettings.tsx - 支払い設定

**担当ファイル数**: 20ファイル

---

## ClaudeSub02 担当: 管理画面（POS・コース・貸しスタジオ）(18画面)

### POS関連
- [ ] POSSearch.tsx - POS検索
- [ ] CashDenomination.tsx - 金種表
- [ ] POSSettings.tsx - POS設定
- [ ] RetailManagement.tsx - 小売管理

### コース・月謝
- [ ] CourseList.tsx - コース一覧
- [ ] CourseDetail.tsx - コース詳細
- [ ] MonthlyFeeSearch.tsx - 月謝検索

### 会員管理（追加）
- [ ] MemberEnrollment.tsx - 入会管理
- [ ] MemberSearch.tsx - 会員検索

### レッスン管理（追加）
- [ ] OnlineLessonManagement.tsx - オンラインレッスン管理

### 貸しスタジオ
- [ ] RentalStudioList.tsx - 貸しスタジオ一覧
- [ ] RentalStudioDetail.tsx - 貸しスタジオ詳細
- [ ] RentalStudioReservation.tsx - 貸しスタジオ予約
- [ ] RentalStudioPayment.tsx - 貸しスタジオ決済

### 通知管理
- [ ] EmailDistribution.tsx - メール配信
- [ ] NotificationManagement.tsx - お知らせ管理

### 支払い（追加）
- [ ] CardRegistration.tsx - カード登録
- [ ] CardWriting.tsx - カード書き込み

**担当ファイル数**: 18ファイル

---

## Codex01 担当: Insights・Analytics・その他 (24画面)

### レポート・分析
- [ ] SalesSummary.tsx - 売上集計
- [ ] StudioSummary.tsx - スタジオ集計
- [ ] StudioTransition.tsx - スタジオ遷移
- [ ] SalesForecast.tsx - 売上予測

### Insights & Marketing
- [ ] AnalyticsOverview.tsx - 分析概要
- [ ] SalesAnalytics.tsx - セールス分析
- [ ] MarketingManagement.tsx - マーケティング管理
- [ ] LeadManagement.tsx - リード管理

### マーケットプレイス（追加）
- [ ] MarketplaceSearchResults.tsx - 検索結果
- [ ] MarketplaceCustomerMyPage.tsx - 顧客マイページ（マーケットプレイス版）
- [ ] MarketplaceBookingPayment.tsx - 予約・決済ページ
- [ ] AffiliateManagement.tsx - アフィリエイト管理

### ダッシュボード（追加）
- [ ] BusinessDashboard.tsx - ビジネスダッシュボード
- [ ] NetworkDashboard.tsx - ネットワークダッシュボード

### その他機能
- [ ] DateCheck.tsx - 日付チェック
- [ ] MemberExternalIntegration.tsx - 外部サイト連携

### 会員側その他
- [ ] MemberTop.tsx - 会員トップ
- [ ] MemberLogout.tsx - ログアウト確認

### 全般
- [ ] AdminLogin.tsx - 管理者ログイン
- [ ] NotFound.tsx - 404ページ
- [ ] ErrorPage.tsx - エラーページ
- [ ] Maintenance.tsx - メンテナンスページ
- [ ] Help.tsx - ヘルプページ
- [ ] FAQ.tsx - よくある質問

**担当ファイル数**: 24ファイル

---

## 共通タスク（全員）

### 実装時の注意事項
1. **既存コンポーネントの活用**
   - `src/components/Layout/Header.tsx`
   - `src/components/Layout/Sidebar.tsx`
   - `src/components/Layout/MemberHeader.tsx`
   - `src/components/UI/Button.tsx`
   - その他共通コンポーネント

2. **デザインシステム準拠**
   - Tailwind CSSクラスを使用
   - 既存のカラーパレット・スペーシングに従う
   - `tailwind.config.js`の設定を参照

3. **TypeScript型定義**
   - 必要に応じて`src/types/`に型定義を追加
   - interfaceは明確に定義

4. **ルーティング**
   - ファイル名とURLパスを一致させる
   - 必要に応じて`App.tsx`にルートを追加

5. **状態管理**
   - モックアップなので複雑な状態管理は不要
   - useStateで簡易的に実装

---

## 競合回避ルール

### ファイル編集権限
- **ClaudeSub01**: `src/pages/Member*.tsx`のみ編集可
- **ClaudeSub02**: `src/pages/POS*.tsx`, `src/pages/*Course*.tsx`, `src/pages/*Rental*.tsx`, `src/pages/*Card*.tsx`, `src/pages/Email*.tsx`, `src/pages/Notification*.tsx`のみ編集可
- **Codex01**: 上記以外のファイル編集可

### 共通コンポーネント
- 新規共通コンポーネントの作成は**ClaudeMain**に報告
- 既存コンポーネントの変更も**ClaudeMain**に報告

### 進捗報告
- 各自、作業開始時と完了時に`progress/`フォルダ内のファイルを更新
- 問題発生時は即座に**ClaudeMain**に報告

---

## 完了基準チェックリスト

各画面について以下を確認:
- [ ] TypeScriptコンパイルエラーなし
- [ ] 画面が表示される
- [ ] 基本的なレイアウト完成
- [ ] レスポンシブ対応（モバイル・タブレット・デスクトップ）
- [ ] 既存デザインシステムに準拠
- [ ] ダミーデータで動作確認済み

---

## タイムライン（目安）

- **Week 1**: 各担当者がタスクの50%完了
- **Week 2**: 全タスク完了、統合テスト
- **Week 3**: 調整・修正、顧客レビュー準備
