# 🚀 Phase 2 作業開始指示

**発行日**: 2025-10-27
**対象**: ClaudeSub01, ClaudeSub02, Codex01

---

## 🎉 Phase 1 完了おめでとうございます!

Phase 1で21画面のモックアップが完成しました。
引き続きPhase 2に進みます。

---

## 📊 Phase 1 完成状況

| 担当者 | 完成画面数 | 達成率 |
|--------|-----------|--------|
| ClaudeSub01 | 6/20 | 30% |
| ClaudeSub02 | 7/18 | 39% |
| Codex01 | 8/24 | 33% |
| **合計** | **21/88** | **24%** |

---

## 🎯 Phase 2 の目標

**Phase 2完了後の目標進捗: 78/88画面 (89%)**

Phase 2では残りの中優先度機能を実装します。

---

## 👥 各担当者への Phase 2 指示

### ClaudeSub01 への指示

**Phase 2 タスク**: 履歴・通知・決済機能（9画面）

#### 履歴・通知管理（5画面）
1. **MemberReservationHistory.tsx** - 予約・キャンセル履歴
   - 予約一覧テーブル
   - フィルタ（期間、ステータス）
   - キャンセルボタン
   - 参考: テーブルレイアウトは既存の管理画面参照

2. **MemberLessonHistory.tsx** - レッスン履歴
   - 受講済みレッスン一覧
   - 評価・フィードバック入力モーダル
   - 評価星表示

3. **MemberRentalStudioHistory.tsx** - 貸しスタジオ履歴
   - 利用履歴一覧
   - 統計グラフ（簡易的なもの）

4. **MemberNotifications.tsx** - 通知一覧
   - 通知リスト（未読/既読の区別）
   - 通知詳細モーダル
   - 既読/未読切り替え

5. **MemberMessages.tsx** - メッセージ
   - メッセージ一覧
   - メッセージ詳細表示
   - 返信フォーム（ダミー）

#### 決済・ポイント関連（4画面）
6. **MemberPointPurchase.tsx** - Enポイント購入
   - ポイントパッケージ選択カード
   - 決済フォーム
   - 購入履歴表示

7. **MemberTicketPurchase.tsx** - チケット購入
   - チケット種類選択
   - 数量選択
   - 合計金額表示

8. **MemberMonthlyTuition.tsx** - 月謝支払い
   - 月謝情報表示
   - 支払い履歴テーブル
   - 支払い方法変更リンク

9. **MemberPurchaseHistory.tsx** - 購入履歴
   - 購入履歴一覧テーブル
   - レシート表示モーダル
   - エクスポートボタン

**進捗報告**: `mock_tasks/progress/ClaudeSub01_progress.md`

---

### ClaudeSub02 への指示

**Phase 2 タスク**: 会員・レッスン・貸しスタジオ・通知（9画面）

#### 会員管理追加機能（2画面）
1. **MemberEnrollment.tsx** - 入会管理
   - 新規会員登録フォーム（管理側）
   - 会員プラン選択
   - 初期設定（月謝、コース選択）
   - 契約書生成ボタン

2. **MemberSearch.tsx** - 会員検索
   - 詳細検索フォーム
   - 検索結果一覧テーブル
   - 一括操作機能

#### レッスン管理追加（1画面）
3. **OnlineLessonManagement.tsx** - オンラインレッスン管理
   - オンラインレッスン一覧
   - 配信URL管理（Zoom、YouTube等）
   - 参加者管理テーブル

#### 貸しスタジオ管理（4画面）
4. **RentalStudioList.tsx** - 貸しスタジオ一覧
   - スタジオ一覧カード表示
   - 空き状況カレンダー（簡易）
   - クイック予約ボタン

5. **RentalStudioDetail.tsx** - 貸しスタジオ詳細
   - 施設詳細情報
   - 料金プラン表示
   - 設備・備品リスト
   - 写真ギャラリー（ダミー）

6. **RentalStudioReservation.tsx** - 貸しスタジオ予約
   - カレンダーから日時選択
   - 時間帯選択
   - オプション選択
   - 予約者情報入力

7. **RentalStudioPayment.tsx** - 貸しスタジオ決済
   - 料金計算（基本料金＋オプション）
   - 支払い方法選択
   - 領収書発行ボタン

#### 通知管理（2画面）
8. **EmailDistribution.tsx** - メール配信
   - メールテンプレート選択
   - ターゲット選択（全会員、セグメント別）
   - 配信スケジュール設定
   - プレビュー機能

9. **NotificationManagement.tsx** - お知らせ管理
   - お知らせ一覧
   - お知らせ作成フォーム
   - 公開設定
   - プッシュ通知設定

**進捗報告**: `mock_tasks/progress/ClaudeSub02_progress.md`

---

### Codex01 への指示

**Phase 2 タスク**: マーケットプレイス・ダッシュボード・その他（10画面）

#### マーケットプレイス追加機能（4画面）
1. **MarketplaceSearchResults.tsx** - 検索結果
   - スタジオ検索結果一覧
   - 地図表示（ダミー）
   - フィルタリング機能（価格、評価、距離）
   - ソート機能

2. **MarketplaceCustomerMyPage.tsx** - 顧客マイページ
   - 予約履歴
   - お気に入りスタジオ
   - レビュー投稿済み一覧
   - ポイント残高

3. **MarketplaceBookingPayment.tsx** - 予約・決済ページ
   - 体験レッスン選択
   - 日時選択カレンダー
   - オンライン決済フォーム
   - 予約確認サマリー

4. **AffiliateManagement.tsx** - アフィリエイト管理
   - パートナー一覧テーブル
   - パートナー登録フォーム
   - 成果報酬設定
   - 成果レポート

#### ダッシュボード追加（2画面）
5. **BusinessDashboard.tsx** - ビジネスダッシュボード
   - 売上・収益グラフ（複数チャート）
   - 主要KPI表示（カード形式）
   - ビジネスメトリクス
   - 前月比・前年比表示

6. **NetworkDashboard.tsx** - ネットワークダッシュボード
   - 複数拠点データ統合表示
   - 拠点間比較グラフ
   - ネットワーク全体指標
   - 地図上での拠点表示（ダミー）

#### その他機能（4画面）
7. **DateCheck.tsx** - 日付チェック
   - システム日付確認
   - 営業日カレンダー表示
   - 休業日設定
   - 営業時間表示

8. **MemberExternalIntegration.tsx** - 外部サイト連携
   - 連携サービス一覧
   - 外部サイトリンク
   - 連携設定

9. **MemberTop.tsx** - 会員トップ
   - 個人ダッシュボード
   - クイックアクセスメニュー
   - 最新情報表示
   - おすすめレッスン

10. **MemberLogout.tsx** - ログアウト確認
    - ログアウト確認メッセージ
    - ログアウトボタン
    - キャンセルボタン

**進捗報告**: `mock_tasks/progress/Codex01_progress.md`

---

## ✅ Phase 2 作業開始前のチェックリスト

全担当者共通:
- [ ] Phase 1で完成した画面を確認
- [ ] `mock_tasks/PHASE2_TASKS.md`を読む
- [ ] Phase 1のコーディングスタイルを踏襲
- [ ] 進捗報告ファイルを更新してから作業開始

---

## 🎨 Phase 2 の重要ポイント

### 1. 一貫性の維持
- Phase 1で確立したUIパターンを継承
- ボタン、フォーム、テーブルのスタイルを統一
- カラースキーム、スペーシングを一貫させる

### 2. データ構造の統一
```typescript
// ダミーデータの形式例
interface Reservation {
  id: number;
  date: string;
  lessonName: string;
  instructor: string;
  status: 'confirmed' | 'cancelled' | 'completed';
}
```

### 3. エラーハンドリング
```typescript
// ローディング状態
{isLoading && <div>読み込み中...</div>}

// エラー状態
{error && <div className="text-red-600">{error}</div>}
```

### 4. レスポンシブ対応
```typescript
// グリッドレイアウトの基本パターン
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

---

## 📊 進捗報告フォーマット

```markdown
## 作業日: 2025-10-27

### 完了したタスク (Phase 2)
- [x] ファイル名.tsx - 説明

### 作業中のタスク (Phase 2)
- [ ] ファイル名.tsx - XX%完了

### 次のタスク (Phase 2)
- [ ] ファイル名.tsx

### 問題・質問
- なし / 具体的な問題
```

---

## 🚨 重要な注意事項

1. **Phase 2のタスクのみに集中**
   - Phase 3のタスクには着手しない
   - Phase 2完了後は作業停止

2. **競合回避**
   - 担当領域外のファイルは編集しない
   - 共通コンポーネント変更はClaudeMainに報告

3. **品質基準**
   - TypeScriptエラーなし
   - レスポンシブ対応
   - ダミーデータで動作確認

4. **問題報告**
   - TypeScriptエラー → 即座に報告
   - 技術的困難 → 進捗ファイルに記載
   - 不明点 → ClaudeMainに質問

---

## 🎯 Phase 2 完了基準

### 各画面
- [ ] TypeScriptコンパイルエラーなし
- [ ] 画面表示正常
- [ ] レスポンシブ対応完了
- [ ] ダミーデータで動作確認済み
- [ ] Phase 1との一貫性確保

### 全体
- [ ] `npm run build`成功
- [ ] コンソールエラーなし
- [ ] ナビゲーション動作確認

---

## 📞 連絡・報告

- **進捗報告**: `mock_tasks/progress/[担当者名]_progress.md`
- **問題・質問**: 同じファイルに記載
- **緊急時**: ClaudeMainに報告

---

## 🎉 Phase 2 完了後

全員がPhase 2を完了したら:
1. ClaudeMainが統合テスト実施
2. 品質チェック
3. Phase 3（最終フェーズ）の指示発行

---

**Phase 2 作業を開始してください! 頑張りましょう! 🚀**
