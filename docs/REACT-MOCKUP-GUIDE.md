# 🚀 ConnectEn SaaS - React UIモックアップ 起動ガイド

## 📋 概要

ConnectEn SaaSのReact版UIモックアップシステムの起動・管理スクリプト集です。
ワンクリックで開発環境のセットアップから起動まで完了できます。

## 🎯 利用可能なスクリプト

### 🔥 クイックスタート（推奨）
```bash
./quick-start-react.sh
```
**初回利用時に最適** - セットアップから開発サーバー起動まで自動実行

---

### ⚙️ 個別スクリプト

#### 1. 初期セットアップ
```bash
./setup-react-mock.sh
```
- システム要件チェック
- 依存関係の自動インストール
- プロジェクトファイルの整合性確認

#### 2. 開発サーバー起動
```bash
./start-react-mock.sh
```
- React開発サーバーを起動
- ホットリロード有効
- URL: http://localhost:5173/

#### 3. 開発サーバー停止
```bash
./stop-react-mock.sh
```
- 実行中の開発サーバーを安全に停止
- プロセスとポートのクリーンアップ

#### 4. プロダクションビルド
```bash
./build-react-mock.sh
```
- 本番用に最適化されたビルドを生成
- アセットの圧縮・ミニファイ化
- 出力先: `dist/` ディレクトリ

#### 5. プロダクションプレビュー
```bash
./preview-react-mock.sh
```
- ビルド済みファイルのプレビュー
- 本番環境相当のパフォーマンス確認
- URL: http://localhost:4173/

---

## 🎨 利用可能な画面

### 👥 会員管理
- **機能**: メンバー情報の管理、検索、フィルタリング
- **特徴**: インタラクティブなテーブル表示、モーダル機能

### 🏢 スクール・施設管理
- **機能**: 複数拠点とスタジオの包括管理
- **特徴**: タブナビゲーション、リアルタイムステータス表示

### 📊 レポート・分析
- **機能**: ビジネスKPIの可視化、期間別分析
- **特徴**: インタラクティブチャート、ランキング表示

---

## 🔧 技術仕様

### フロントエンド
- **フレームワーク**: React 18 + TypeScript
- **ビルドツール**: Vite
- **スタイリング**: Tailwind CSS + Custom CSS
- **状態管理**: React Hooks

### デザインシステム
- **原則**: フラットデザイン（グラデーション・装飾シャドウ禁止）
- **配色**: 80-15-5ルール（ニュートラル80%・プライマリ15%・ファンクショナル5%）
- **特徴**: 白要素強調のクリーンデザイン

### レスポンシブ対応
- **ブレークポイント**: 768px（タブレット）、1024px（デスクトップ）
- **アプローチ**: モバイルファースト

---

## ⚡ クイックスタートガイド

### 初回利用時
```bash
# 1. リポジトリのクローン（必要に応じて）
# git clone [repository-url]

# 2. プロジェクトディレクトリに移動
cd /path/to/EnDanceStudio

# 3. ワンクリックスタート
./quick-start-react.sh
```

### 通常の開発時
```bash
# 開発サーバー起動
./start-react-mock.sh

# 作業完了後、停止
./stop-react-mock.sh
```

### 本番確認時
```bash
# ビルド実行
./build-react-mock.sh

# プレビュー確認
./preview-react-mock.sh
```

---

## 🔍 トラブルシューティング

### ポートが既に使用されている
```bash
# 現在のプロセスを停止
./stop-react-mock.sh

# または手動でポートを確認
lsof -ti:5173 | xargs kill -9
```

### 依存関係のエラー
```bash
# クリーンインストール
cd mio_desgin_system/ui_mockups_react/connecten-ui
rm -rf node_modules package-lock.json
npm install
```

### TypeScript エラー
```bash
# 型チェックのスキップ（一時的）
npx tsc --noEmit --skipLibCheck
```

---

## 📁 ディレクトリ構造

```
EnDanceStudio/
├── 🚀 起動スクリプト
│   ├── quick-start-react.sh      # クイックスタート
│   ├── setup-react-mock.sh       # セットアップ
│   ├── start-react-mock.sh       # 開発サーバー起動
│   ├── stop-react-mock.sh        # 開発サーバー停止
│   ├── build-react-mock.sh       # プロダクションビルド
│   └── preview-react-mock.sh     # プレビューサーバー
├── mio_desgin_system/
│   └── ui_mockups_react/
│       └── connecten-ui/          # React アプリケーション
│           ├── src/
│           │   ├── pages/         # ページコンポーネント
│           │   ├── components/    # 再利用可能コンポーネント
│           │   ├── styles/        # CSS ファイル
│           │   └── ...
│           ├── dist/              # ビルド出力（生成後）
│           └── package.json
└── ...
```

---

## 🎉 開発のヒント

### カスタマイズ
- **色設定**: `src/index.css` のCSS変数を変更
- **コンポーネント追加**: `src/components/` 配下に作成
- **新規ページ**: `src/pages/` 配下に作成し、`App.tsx` で登録

### パフォーマンス
- 開発中は `npm run dev` でホットリロード
- 本番確認は `npm run build` → `npm run preview`
- ビルドサイズは `build-react-mock.sh` で確認可能

### デバッグ
- ブラウザの開発者ツール活用
- React Developer Tools拡張機能推奨
- TypeScriptエラーはVSCodeなどのエディタで確認

---

## 📞 サポート

技術的な質問や問題が発生した場合：

1. **ログ確認**: スクリプト実行時の出力メッセージを確認
2. **システム要件**: Node.js v16以上、npm利用可能を確認
3. **ディレクトリ**: 正しいプロジェクトディレクトリで実行しているか確認

---

**🎨 Happy Coding with ConnectEn SaaS React UI! 🚀**