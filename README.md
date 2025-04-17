# ConnectEn - エンダンススタジオERPシステム

ConnectEnは、ダンススタジオの管理を効率化するためのERPシステムです。会員管理、スケジュール管理、決済・会計、マーケティング、レポート・分析などの機能を提供します。

## 機能

- 会員管理
- スケジュール管理
- 決済・会計
- マーケティング
- レポート・分析
- 物品・在庫管理
- システム設定

## 開発環境のセットアップ

```bash
# リポジトリをクローン
git clone [リポジトリURL]

# ディレクトリに移動
cd connect-en-app

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

開発サーバーは http://localhost:3000 で実行されます。

## ビルドとデプロイ

```bash
# プロダクションビルドの作成
npm run build

# ビルドの開始
npm start
```

## Vercelへのデプロイ

このプロジェクトはVercelへのデプロイに対応しています。GitHubリポジトリをVercelと連携するか、Vercel CLIを使用してデプロイできます。

```bash
# Vercel CLIのインストール
npm install -g vercel

# デプロイ
vercel
```

## 技術スタック

- Next.js
- React
- TypeScript
- Tailwind CSS

## ライセンス

© 2025 エン株式会社. All Rights Reserved.
