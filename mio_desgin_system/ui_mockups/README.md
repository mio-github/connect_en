# ConnectEn SaaS UI Mockups

## 📁 プロジェクト構成

```
ui_mockups/
├── shared/
│   ├── css/
│   │   └── common.css          # 共通スタイル
│   ├── js/
│   │   ├── common.js          # 共通JavaScript機能
│   │   └── components.js      # コンポーネントローダー
│   ├── components/
│   │   ├── header.html        # 共通ヘッダー
│   │   ├── sidebar.html       # 共通サイドバー
│   │   └── footer.html        # 共通フッター
│   └── template.html          # 新規ページテンプレート
├── 01_member_management/      # 会員管理
├── 02_lesson_reservation/     # レッスン予約
├── 03_payment_processing/     # 支払い処理
├── 04_staff_management/       # スタッフ管理
└── 05_dashboard/             # ダッシュボード
```

## 🎨 デザインシステム

### フラットデザイン原則
- **グラデーション禁止**: 単色背景のみ使用
- **最小限のシャドウ**: 機能的な軽いシャドウのみ
- **80-15-5カラールール**: 
  - 80% ニュートラルカラー
  - 15% プライマリーカラー
  - 5% ファンクショナルカラー

### カラーパレット
```css
--primary-color: #2563eb;      /* メインアクション専用 */
--success-color: #059669;      /* 成功・完了 */
--warning-color: #d97706;      /* 注意・警告 */
--error-color: #dc2626;        /* エラー・危険 */
--info-color: #0284c7;         /* 情報・通知 */
```

## 🧩 共通コンポーネント

### 使用方法

#### 1. 新規ページ作成
```html
<!-- template.htmlをコピーして使用 -->
<body data-page="your-page-id">
  <div id="header-container"></div>
  <div class="main-content">
    <div id="sidebar-container"></div>
    <main class="content-area">
      <!-- ページ固有のコンテンツ -->
    </main>
  </div>
  <div id="footer-container"></div>
</body>
```

#### 2. JavaScript初期化
```javascript
// components.jsが自動的にコンポーネントを読み込みます
document.addEventListener('DOMContentLoaded', function() {
  // data-page属性でアクティブナビゲーションが自動設定されます
});
```

## 🔧 機能説明

### 実装済み画面

#### 1. ダッシュボード (`05_dashboard/`)
- **概要**: システム全体の状況を一覧表示
- **主要機能**:
  - 売上・会員数等の重要指標表示
  - 本日のレッスンスケジュール
  - 最近のアクティビティフィード
  - クイックアクションボタン

#### 2. 会員管理 (`01_member_management/`)
- **概要**: 会員情報の管理と新規登録
- **主要機能**:
  - 会員一覧表示・検索・フィルタリング
  - 新規会員登録モーダル
  - 会員ステータス管理
  - 一括操作機能

#### 3. レッスン予約 (`02_lesson_reservation/`)
- **概要**: レッスンスケジュールと予約管理
- **主要機能**:
  - 週間カレンダー表示
  - レッスン予約状況確認
  - 新規レッスン作成モーダル
  - キャンセル待ち管理

#### 4. 支払い処理 (`03_payment_processing/`)
- **概要**: 月謝・レッスン料金の管理
- **主要機能**:
  - 本日・今月の売上サマリー
  - 支払い状況一覧
  - 支払い処理モーダル（電卓機能付き）
  - 未納・延滞管理

#### 5. スタッフ管理 (`04_staff_management/`)
- **概要**: 講師・スタッフの管理とスケジュール
- **主要機能**:
  - スタッフカード表示
  - 週間スケジュールビュー
  - 新規スタッフ登録モーダル
  - スキル・専門分野管理

### モーダル機能
全画面で統一されたモーダルシステムを実装：
- **トリガー**: `data-modal-target="modalId"`
- **クローズ**: ESCキー、背景クリック、×ボタン
- **バリデーション**: 必須項目チェック
- **フィードバック**: 成功時のトースト通知

### レスポンシブデザイン
- **モバイルファースト**: 小画面から大画面へ対応
- **ブレークポイント**: 768px, 1024px
- **柔軟なグリッド**: CSS Gridで自動調整

## 🚀 開発ガイド

### 新規画面追加手順
1. `shared/template.html`をコピー
2. `{{PAGE_TITLE}}`等の変数を置換
3. `data-page`属性を設定
4. ページ固有のスタイル・JavaScript追加

### コンポーネント更新
- `shared/components/`内のファイルを編集
- 全画面に自動反映されます

### スタイル追加
- 共通: `shared/css/common.css`
- 個別: 各HTMLファイル内の`<style>`セクション

## 📱 ブラウザ対応

### 推奨ブラウザ
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### 機能要件
- ES6+ JavaScript
- CSS Grid & Flexbox
- Fetch API

## 🔍 テスト確認項目

### 基本機能
- [ ] 全画面のナビゲーションが正常動作
- [ ] モーダルの開閉とバリデーション
- [ ] レスポンシブレイアウトの確認
- [ ] トースト通知の表示

### アクセシビリティ
- [ ] キーボードナビゲーション
- [ ] スクリーンリーダー対応
- [ ] 適切なフォーカス管理
- [ ] 色のコントラスト比確認

## 📊 パフォーマンス

### ファイルサイズ
- CSS: 約20KB (共通スタイル)
- JavaScript: 約15KB (共通機能)
- 各画面: 20-30KB (HTML込み)

### 読み込み速度
- 初回ロード: <2秒
- ページ遷移: <500ms
- モーダル表示: <200ms

---

## 📞 サポート

技術的な質問や改善要望がありましたら、開発チームまでお問い合わせください。

**ConnectEn Development Team**  
Email: dev@connecten.jp  
Documentation: https://docs.connecten.jp