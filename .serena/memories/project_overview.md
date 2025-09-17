# ConnectEn プロジェクト概要

## プロジェクト説明
ConnectEnは、ダンススタジオ業界に特化したマルチテナント型SaaS ERPプラットフォームです。補助金承認を受け、単一企業向けシステムから複数のダンススタジオが利用できる包括的なプラットフォームへと進化しました。

## 技術スタック
- **フロントエンド**: Next.js 14, React, TypeScript, Tailwind CSS
- **バックエンド**: Node.js, Express, GraphQL
- **データベース**: PostgreSQL (マルチテナント対応), Redis
- **ORM**: Prisma
- **認証**: JWT with tenant context, OAuth 2.0
- **デプロイ**: Vercel (frontend), AWS (backend)
- **AI/ML**: OpenAI API, AWS Comprehend

## ディレクトリ構造
- `connect-en-app/`: メインNext.jsアプリケーション
  - `src/app/`: App Router pages
  - `src/components/`: Reusable components
  - TypeScript strict mode enabled
  - Path alias: `@/*` → `./src/*`
- `mio_desgin_system/`: 設計ドキュメント
- `now_JP_system/`: 現行日本システムのスクリーンショット
- `now_USA_mind_body/`: MindBodyシステム参考資料

## 主要機能
### プラットフォーム機能
- マルチテナント管理
- 共通課金・請求管理
- プラットフォーム分析

### マーケットプレイス機能（新規）
- スタジオ検索・予約システム
- 口コミ・レビュー
- プロモーション管理
- アフィリエイトネットワーク

### スタジオ向け機能
- 会員管理
- スケジュール管理
- 決済・会計管理
- マーケティング
- レポート・分析
- 在庫管理