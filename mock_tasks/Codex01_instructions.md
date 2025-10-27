# Codex01 作業指示書

## 担当領域
**Insights・Analytics・マーケットプレイス追加・その他機能の実装** (24画面)

## 作業ディレクトリ
```
mio_desgin_system/ui_mockups_react/connecten-ui/src/pages/
```

## 既存の参考ファイル
以下の既存ファイルを参考にしてください:
- `Dashboard.tsx` - ダッシュボード
- `ReportsAnalytics.tsx` - レポート分析
- `MarketplaceDashboard.tsx` - マーケットプレイスダッシュボード
- `MarketplaceHome.tsx` - マーケットプレイストップ
- `MarketplaceAnalytics.tsx` - マーケットプレイス分析

## 使用可能な共通コンポーネント
```typescript
import { Header } from '../components/Layout/Header';
import { Sidebar } from '../components/Layout/Sidebar';
import { MemberHeader } from '../components/Layout/MemberHeader';
import { Button } from '../components/UI/Button';
```

## タスクリスト

### Phase 1: レポート・分析機能 (優先度: 高)
1. **SalesSummary.tsx** - 売上集計
   - 期間選択（日次、週次、月次、年次）
   - 売上データ集計テーブル
   - 売上推移グラフ（Chart.js or Recharts使用）
   - カテゴリ別売上
   - エクスポート機能（CSV、Excel）

2. **StudioSummary.tsx** - スタジオ集計
   - スタジオ別パフォーマンス比較
   - 稼働率グラフ
   - 収益性評価表
   - レッスン数・参加者数統計
   - ランキング表示

3. **StudioTransition.tsx** - スタジオ遷移
   - 利用傾向分析グラフ
   - 会員移動パターン可視化
   - 時間帯別利用状況ヒートマップ
   - フロー図（Sankey diagram）
   - トレンド予測

4. **SalesForecast.tsx** - 売上予測
   - 売上予測モデル表示（グラフ）
   - シナリオ分析（楽観的、標準、悲観的）
   - 季節要因調整スライダー
   - 予測精度表示
   - 予測レポート生成

### Phase 2: Insights & Marketing (優先度: 高)
5. **AnalyticsOverview.tsx** - 分析概要
   - ビジネスインサイトカード
   - 主要KPIダッシュボード
   - トレンド分析グラフ
   - データ可視化（各種チャート）
   - アクションアイテム提案

6. **SalesAnalytics.tsx** - セールス分析
   - 販売パターン分析
   - 顧客セグメント評価（パイチャート）
   - 販売機会特定（推奨商品）
   - コンバージョンファネル
   - A/Bテスト結果

7. **MarketingManagement.tsx** - マーケティング管理
   - キャンペーン一覧
   - キャンペーン作成フォーム
   - マーケティング効果測定グラフ
   - ターゲティング設定
   - ROI計算

8. **LeadManagement.tsx** - リード管理
   - 見込み客一覧テーブル
   - リードスコアリング
   - コンバージョン分析
   - フォローアップタスク管理
   - ステージ管理（パイプライン）

### Phase 3: マーケットプレイス追加機能 (優先度: 中)
9. **MarketplaceSearchResults.tsx** - 検索結果
   - スタジオ検索結果一覧
   - 地図表示（Google Maps API想定）
   - フィルタリング機能（価格、評価、距離）
   - ソート機能
   - ページネーション

10. **MarketplaceCustomerMyPage.tsx** - 顧客マイページ（マーケットプレイス版）
    - 予約履歴
    - お気に入りスタジオ
    - レビュー投稿済み一覧
    - ポイント残高
    - クーポン一覧

11. **MarketplaceBookingPayment.tsx** - 予約・決済ページ
    - 体験レッスン選択
    - 日時選択カレンダー
    - オンライン決済フォーム
    - 予約確認サマリー
    - 利用規約同意

12. **AffiliateManagement.tsx** - アフィリエイト管理
    - パートナー一覧
    - パートナー登録フォーム
    - 成果報酬設定
    - 成果レポート（テーブル・グラフ）
    - 支払い管理

### Phase 4: ダッシュボード追加 (優先度: 中)
13. **BusinessDashboard.tsx** - ビジネスダッシュボード
    - 売上・収益グラフ（複数チャート）
    - 主要KPI表示（カード形式）
    - ビジネスメトリクス
    - 前月比・前年比
    - アラート通知

14. **NetworkDashboard.tsx** - ネットワークダッシュボード
    - 複数拠点データ統合表示
    - 拠点間比較グラフ
    - ネットワーク全体指標
    - 地図上での拠点表示
    - 拠点別パフォーマンス

### Phase 5: その他機能 (優先度: 低)
15. **DateCheck.tsx** - 日付チェック
    - システム日付確認
    - 営業日カレンダー表示
    - 休業日設定
    - 営業時間表示
    - タイムゾーン設定

16. **MemberExternalIntegration.tsx** - 外部サイト連携
    - 連携サービス一覧
    - レンタルスタジオ（外部サイト）リンク
    - ダンスキャンプ（外部サイト）リンク
    - オンラインストア（外部サイト）リンク
    - 連携設定

### Phase 6: 会員側その他 (優先度: 低)
17. **MemberTop.tsx** - 会員トップ
    - 個人ダッシュボード
    - クイックアクセスメニュー
    - 最新情報表示
    - おすすめレッスン
    - お知らせバナー

18. **MemberLogout.tsx** - ログアウト確認
    - ログアウト確認メッセージ
    - ログアウトボタン
    - キャンセルボタン
    - セッション情報表示

### Phase 7: 全般・エラー画面 (優先度: 低)
19. **AdminLogin.tsx** - 管理者ログイン
    - ログインフォーム
    - パスワードリセットリンク
    - 多要素認証（2FA）
    - ログイン履歴表示
    - セキュリティ通知

20. **NotFound.tsx** - 404ページ
    - 404エラーメッセージ
    - ホームへ戻るボタン
    - サイトマップリンク
    - 検索ボックス

21. **ErrorPage.tsx** - エラーページ
    - エラーメッセージ表示
    - エラーコード表示
    - リトライボタン
    - サポート連絡先

22. **Maintenance.tsx** - メンテナンスページ
    - メンテナンス通知
    - 復旧予定時刻表示
    - 進捗状況
    - お問い合わせ情報

23. **Help.tsx** - ヘルプページ
    - ヘルプ記事一覧
    - カテゴリ別検索
    - 検索機能
    - 人気の質問
    - お問い合わせフォーム

24. **FAQ.tsx** - よくある質問
    - FAQ一覧（アコーディオン形式）
    - カテゴリフィルタ
    - 検索機能
    - 評価ボタン（役に立った/立たなかった）

## ⚠️ 重要: コンテンツガイドライン

**必ず読んでください**: `mock_tasks/CONTENT_GUIDELINES.md`

### マーケットプレイスと社内システムの区別
- **マーケットプレイス画面**: 「体験予約」「お気に入り」「クーポン」OK
- **社内システム画面**: ❌「アップグレード」「プレミアム」禁止

### Analytics画面での注意
- ❌ 「プランをアップグレードして高度な分析を」
- ✅ 「詳細な分析機能」「業務データ分析」

## 実装ガイドライン

### グラフ・チャート実装

推奨ライブラリ: Recharts（既存プロジェクトで使用されている可能性があるため確認）

```typescript
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: '1月', 売上: 4000 },
  { name: '2月', 売上: 3000 },
  { name: '3月', 売上: 5000 },
];

<LineChart width={600} height={300} data={data}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Line type="monotone" dataKey="売上" stroke="#8884d8" />
</LineChart>
```

### KPIカード実装例
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <div className="bg-white rounded-lg shadow p-6">
    <div className="text-sm text-gray-600 mb-2">総売上</div>
    <div className="text-3xl font-bold text-gray-900">¥1,234,567</div>
    <div className="text-sm text-green-600 mt-2">↑ 12% vs 先月</div>
  </div>
</div>
```

### テーブル with ソート
```typescript
const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

const sortedData = [...data].sort((a, b) => {
  if (sortConfig.key) {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    return sortConfig.direction === 'asc'
      ? aValue > bValue ? 1 : -1
      : aValue < bValue ? 1 : -1;
  }
  return 0;
});
```

### マップ統合（ダミー）
```typescript
<div className="bg-gray-200 rounded-lg p-4 h-96 flex items-center justify-center">
  <p className="text-gray-500">地図表示エリア（Google Maps API統合予定）</p>
</div>
```

## ダミーデータ例

### 売上データ
```typescript
const salesData = [
  { month: '1月', revenue: 500000, cost: 300000, profit: 200000 },
  { month: '2月', revenue: 550000, cost: 320000, profit: 230000 },
  // ...
];
```

### リードデータ
```typescript
const leadsData = [
  { id: 1, name: '山田太郎', email: 'yamada@example.com', score: 85, stage: '商談中' },
  { id: 2, name: '佐藤花子', email: 'sato@example.com', score: 70, stage: '提案済み' },
];
```

## 進捗報告

作業開始時と完了時に以下のファイルを更新してください:
```
mock_tasks/progress/Codex01_progress.md
```

### 報告フォーマット
```markdown
## 作業日: 2025-10-27

### 完了したタスク
- [x] SalesSummary.tsx
- [x] StudioSummary.tsx

### 作業中のタスク
- [ ] SalesForecast.tsx (50%完了)

### 問題・質問
- グラフライブラリの選定について相談したい
```

## 注意事項

1. **ファイル命名規則**
   - PascalCaseを使用
   - 機能を明確に表す名前

2. **グラフライブラリ**
   - 既存プロジェクトで使用されているライブラリを確認
   - なければRechartsを使用

3. **パフォーマンス**
   - 大量データの場合はページネーション必須
   - グラフは適切なサイズで表示

4. **競合回避**
   - 担当ファイル以外は編集しない
   - 共通コンポーネントの変更は**ClaudeMain**に報告

## 完了基準

各画面について:
- [ ] TypeScriptコンパイルエラーなし
- [ ] 画面が正しく表示される
- [ ] グラフ・チャートが適切に表示
- [ ] レスポンシブデザイン対応
- [ ] ダミーデータで動作確認済み

## 質問・報告先

問題が発生した場合:
- **ClaudeMain**に報告
- `mock_tasks/progress/Codex01_progress.md`に記載

---

**グラフやチャートが多いため、ビジュアル面に特に注意してください。**
**Good luck!**
