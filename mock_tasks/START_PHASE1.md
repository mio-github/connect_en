# 🚀 Phase 1 作業開始指示

**発行日**: 2025-10-27
**対象**: ClaudeSub01, ClaudeSub02, Codex01

---

## 📢 重要なお知らせ

**フェーズ1の内容のみを優先して進めてください。**
**フェーズ1完了後は作業を停止し、ClaudeMainの次の指示を待ってください。**

---

## 👥 各担当者への指示

### ClaudeSub01 への指示

**Phase 1 タスク**: レッスン予約フロー（4画面）

完了済み:
- ✅ MemberRegistration.tsx
- ✅ MemberTerms.tsx

**今すぐ着手**:
1. **MemberLessonBookingConfirm.tsx** - 予約確認
   - 選択したレッスン情報を表示
   - 確定ボタン、戻るボタン
   - 参考: `MemberLessonBooking.tsx`

2. **MemberLessonBookingComplete.tsx** - 予約完了
   - 予約完了メッセージ
   - QRコード表示
   - マイページへ戻るボタン

3. **MemberOnlineLesson.tsx** - オンラインレッスン
   - オンラインレッスン一覧
   - 参加URL表示（ダミー）

4. **MemberEvents.tsx** - イベント・ワークショップ
   - イベント一覧カード
   - 申込ボタン

**進捗報告**: 各画面完了後、`mock_tasks/progress/ClaudeSub01_progress.md`を即座に更新

---

### ClaudeSub02 への指示

**Phase 1 タスク**: POS・コース管理（6画面）

完了済み:
- ✅ POSSearch.tsx

**今すぐ着手**:
1. **CashDenomination.tsx** - 金種表
   - 各金種の枚数入力フォーム
   - 合計金額自動計算
   - 釣銭計算機能

2. **POSSettings.tsx** - POS設定
   - POS端末設定
   - 商品マスタ管理
   - 割引設定

3. **RetailManagement.tsx** - 小売管理
   - 商品在庫管理テーブル
   - 販売実績グラフ

4. **CourseList.tsx** - コース一覧
   - コース一覧テーブル
   - フィルタ・ソート機能

5. **CourseDetail.tsx** - コース詳細
   - コース基本情報
   - レッスンスケジュール

6. **MonthlyFeeSearch.tsx** - 月謝検索
   - 検索フォーム
   - 月謝一覧テーブル

**進捗報告**: 各画面完了後、`mock_tasks/progress/ClaudeSub02_progress.md`を即座に更新

---

### Codex01 への指示

**Phase 1 タスク**: レポート・分析・マーケティング（8画面）

**今すぐ着手**:

#### レポート・分析機能
1. **SalesSummary.tsx** - 売上集計
   - 売上推移グラフ（Chart.js/Recharts）
   - 期間選択
   - エクスポート機能

2. **StudioSummary.tsx** - スタジオ集計
   - スタジオ別パフォーマンス
   - 稼働率グラフ

3. **StudioTransition.tsx** - スタジオ遷移
   - 利用傾向分析グラフ
   - ヒートマップ

4. **SalesForecast.tsx** - 売上予測
   - 売上予測グラフ
   - シナリオ分析

#### Insights & Marketing
5. **AnalyticsOverview.tsx** - 分析概要
   - KPIダッシュボード
   - ビジネスインサイト

6. **SalesAnalytics.tsx** - セールス分析
   - 販売パターン分析
   - コンバージョンファネル

7. **MarketingManagement.tsx** - マーケティング管理
   - キャンペーン一覧
   - ROI計算

8. **LeadManagement.tsx** - リード管理
   - 見込み客一覧
   - リードスコアリング

**グラフライブラリ**: 既存プロジェクトを確認後、Rechartsまたは類似ライブラリを使用

**進捗報告**: 各画面完了後、`mock_tasks/progress/Codex01_progress.md`を即座に更新

---

## ✅ 作業開始前のチェックリスト

全担当者共通:
- [ ] 自分の指示書を再確認（`mock_tasks/[担当者名]_instructions.md`）
- [ ] 既存ファイルのコーディングスタイルを確認
- [ ] 進捗報告ファイルを更新してから作業開始
- [ ] TypeScriptエラーが出たら即座にClaudeMainに報告

---

## 🎯 Phase 1 完了基準

### 各画面について
- [ ] TypeScriptコンパイルエラーなし
- [ ] 画面が正しく表示される
- [ ] 基本的なレイアウト完成
- [ ] レスポンシブデザイン対応
- [ ] ダミーデータで動作確認済み

### 全体
- [ ] `npm run build`が成功する
- [ ] 全画面でコンソールエラーなし

---

## 🚨 重要な注意事項

1. **Phase 1のタスクのみに集中**
   - Phase 2, 3のタスクには着手しない

2. **競合回避**
   - 担当領域外のファイルは絶対に編集しない

3. **進捗報告を怠らない**
   - 各画面完了時に即座に報告

4. **問題が発生したら即座に報告**
   - TypeScriptエラー
   - 技術的困難
   - 不明点

5. **Phase 1完了後は必ず作業停止**
   - ClaudeMainの次の指示を待つ

---

## 📞 連絡・報告方法

- **進捗報告**: `mock_tasks/progress/[担当者名]_progress.md`に記載
- **問題・質問**: 同じファイルの「問題・質問」セクションに記載
- **緊急時**: ClaudeMainに直接報告

---

## 🎉 Phase 1 完了後

全員がPhase 1を完了したら:
1. ClaudeMainが統合テストを実施
2. 品質チェック
3. Phase 2の指示を発行

---

**それでは、Phase 1作業を開始してください!**
**Good luck! 🚀**
