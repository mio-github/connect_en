# ConnectEn コーディング規約

## 命名規則
- **コンポーネント**: PascalCase (例: `MemberList`, `DashboardCard`)
- **関数**: camelCase (例: `getUserData`, `calculateTotal`)
- **変数**: camelCase
- **定数**: UPPER_SNAKE_CASE (例: `API_BASE_URL`)
- **ファイル名**: 
  - コンポーネント: PascalCase.tsx
  - その他: kebab-case.ts
- **バイリンガル対応**: 日本語-英語 (例: `会員管理-Member_Management`)

## TypeScript
- Strict mode有効
- 型定義は必須
- interfaceを優先（typeはunion型などで使用）
- anyの使用は原則禁止

## React/Next.js
- 関数コンポーネントを使用
- Server Componentsをデフォルトで使用
- Client Componentsは'use client'を明記
- App Routerのパターンに従う

## スタイリング
- Tailwind CSSを使用
- インラインスタイルは避ける
- レスポンシブデザインを考慮

## マルチテナント開発
- 全APIエンドポイントは`/api/v1/:tenantId/`パターン
- データベースクエリには必ずtenant_id条件を含む
- テナント間のデータ分離を徹底

## セキュリティ
- 秘密情報をコードに含めない
- 環境変数を適切に使用
- 入力値のバリデーションを実施