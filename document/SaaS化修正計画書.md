# ConnectEn SaaS化修正計画書

## 概要
補助金申請の承認に伴い、ConnectEnシステムは単一企業（En Dance Studio）向けから、複数のダンススタジオが利用可能なマルチテナントSaaSプラットフォームへと大幅な方向転換を行います。本文書では、この転換に必要な修正内容と実装計画を詳細に記載します。

---

## 1. SaaS化の背景と目的

### 1.1 補助金要件
- **事業要件**: 「スタジオ運営者向けサービス」として、業界全体のDXを推進
- **技術要件**: AI機能の実装による付加価値の創出
- **社会的意義**: ダンススタジオ業界全体の効率化と成長支援

### 1.2 期待される効果
- **スケールメリット**: 複数スタジオでのシステム開発・運用コストの分散
- **業界標準化**: ベストプラクティスの共有と標準化
- **データ活用**: 匿名化された業界データによるベンチマーク提供
- **継続的な収益**: サブスクリプションモデルによる安定収益

---

## 2. アーキテクチャの根本的な変更

### 2.1 現在のアーキテクチャ（Single-Tenant）
```
[En Dance Studio専用システム]
├── フロントエンド（Next.js）
├── バックエンド（Node.js）
├── データベース（PostgreSQL - 単一スキーマ）
└── 認証（シンプルなJWT）
```

### 2.2 新アーキテクチャ（Multi-Tenant SaaS）
```
[ConnectEn Platform]
├── プラットフォーム層
│   ├── スーパー管理画面
│   ├── テナント管理API
│   ├── 課金・請求システム
│   └── プラットフォーム分析
├── テナント層
│   ├── テナントA（En Dance Studio）
│   ├── テナントB（他のダンススタジオ）
│   └── テナントN...
├── 共通サービス層
│   ├── 認証・認可（OAuth2.0 + テナントコンテキスト）
│   ├── API Gateway
│   ├── 通知サービス
│   └── AIサービス
└── インフラ層
    ├── マルチテナントDB（PostgreSQL + Row Level Security）
    ├── ファイルストレージ（S3 - テナント別バケット）
    └── キャッシュ（Redis - テナント別名前空間）
```

---

## 3. 必要な修正内容

### 3.1 データベース設計の変更

#### 現在の問題点
- すべてのテーブルがグローバルスコープ
- テナント分離の仕組みが存在しない
- データアクセス時のセキュリティ懸念

#### 修正内容
1. **全テーブルへのtenant_id追加**
   ```sql
   -- 例: membersテーブル
   ALTER TABLE members ADD COLUMN tenant_id UUID NOT NULL;
   ALTER TABLE members ADD CONSTRAINT fk_tenant 
     FOREIGN KEY (tenant_id) REFERENCES tenants(id);
   CREATE INDEX idx_members_tenant ON members(tenant_id);
   ```

2. **Row Level Security (RLS)の実装**
   ```sql
   -- RLSポリシーの例
   ALTER TABLE members ENABLE ROW LEVEL SECURITY;
   CREATE POLICY tenant_isolation ON members
     FOR ALL USING (tenant_id = current_setting('app.current_tenant')::uuid);
   ```

3. **テナントマスターテーブルの新規作成**
   ```sql
   CREATE TABLE tenants (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     code VARCHAR(50) UNIQUE NOT NULL,
     name VARCHAR(200) NOT NULL,
     plan VARCHAR(50) NOT NULL,
     status VARCHAR(50) NOT NULL,
     settings JSONB,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

### 3.2 認証・認可システムの拡張

#### 現在の問題点
- 単一組織を前提とした認証
- テナントコンテキストの概念なし
- 権限管理が不十分

#### 修正内容
1. **JWTトークンへのテナント情報追加**
   ```typescript
   interface JWTPayload {
     userId: string;
     tenantId: string;  // 新規追加
     tenantCode: string; // 新規追加
     roles: string[];
     permissions: string[];
   }
   ```

2. **テナント切り替え機能**
   - ユーザーが複数テナントに所属する場合の切り替えUI
   - テナント選択後のコンテキスト保持

3. **階層的な権限管理**
   - Platform Admin（プラットフォーム管理者）
   - Tenant Admin（テナント管理者）
   - Staff（スタッフ）
   - Instructor（講師）
   - Member（会員）

### 3.3 APIエンドポイントの再設計

#### 現在の問題点
- テナントを識別する仕組みがない
- グローバルなエンドポイント設計

#### 修正内容
1. **URL構造の変更**
   ```
   # 現在
   GET /api/members
   
   # 修正後
   GET /api/v1/{tenantCode}/members
   ```

2. **ミドルウェアでのテナント検証**
   ```typescript
   // middleware/tenant.ts
   export async function validateTenant(req, res, next) {
     const { tenantCode } = req.params;
     const tenant = await getTenantByCode(tenantCode);
     if (!tenant) {
       return res.status(404).json({ error: 'Tenant not found' });
     }
     req.tenant = tenant;
     next();
   }
   ```

### 3.4 フロントエンドの修正

#### 現在の問題点
- ハードコードされたEn Dance Studio専用UI
- テナント別のカスタマイズ不可

#### 修正内容
1. **動的なテーマ・ブランディング**
   ```typescript
   // テナント設定に基づくテーマ適用
   const TenantThemeProvider = ({ children }) => {
     const tenant = useTenant();
     const theme = createTheme({
       primary: tenant.settings.primaryColor,
       logo: tenant.settings.logoUrl,
       // ...
     });
     return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
   };
   ```

2. **テナント別の機能フラグ**
   ```typescript
   // 機能の有効/無効を制御
   if (tenant.features.onlineLessons) {
     // オンラインレッスン機能を表示
   }
   ```

### 3.5 新規プラットフォーム管理機能の開発

#### 必要な新規画面・機能
1. **スーパー管理画面**
   - テナント一覧・検索
   - テナント登録・編集
   - 契約プラン管理
   - 請求書発行
   - プラットフォーム全体の統計

2. **テナントオンボーディング**
   - セルフサービス登録
   - 初期設定ウィザード
   - データインポート

3. **課金システム**
   - 使用量の追跡
   - 請求額の自動計算
   - 支払い処理との連携

---

## 4. 実装スケジュール

### Phase 1: 基盤構築（2025年8月〜10月）
- [ ] データベーススキーマの修正
- [ ] 認証システムの拡張
- [ ] APIのマルチテナント対応
- [ ] 基本的なテナント管理機能

### Phase 2: 機能移行（2025年11月〜2026年1月）
- [ ] 既存機能のテナント対応
- [ ] UI/UXのテナント別カスタマイズ
- [ ] データ移行ツールの開発

### Phase 3: プラットフォーム機能（2026年2月〜4月）
- [ ] スーパー管理機能の完成
- [ ] 課金システムの実装
- [ ] 分析・レポート機能

### Phase 4: AI機能実装（2026年5月〜7月）
- [ ] 需要予測
- [ ] レコメンデーション
- [ ] 自動最適化

---

## 5. リスクと対策

### 5.1 技術的リスク
- **データ分離の不備**: 徹底的なテスト、セキュリティ監査
- **パフォーマンス劣化**: インデックス最適化、キャッシュ戦略
- **複雑性の増大**: 段階的な実装、十分なドキュメント

### 5.2 ビジネスリスク
- **既存顧客への影響**: 並行稼働期間、丁寧な移行サポート
- **新規顧客の獲得**: 競争力のある価格設定、差別化機能
- **運用負荷の増大**: 自動化の推進、サポート体制の構築

---

## 6. 成功指標

### 技術指標
- テナント間のデータ分離: 100%
- API応答時間: < 200ms（95パーセンタイル）
- システム稼働率: 99.9%

### ビジネス指標
- 6ヶ月以内に5テナント獲得
- 1年以内に20テナント獲得
- 月次経常収益（MRR）: 1年後に500万円

---

## 7. 次のステップ

1. **本計画書の承認**（2025年8月中旬まで）
2. **詳細設計書の作成**（2025年8月下旬）
3. **開発環境の構築**（2025年9月上旬）
4. **Phase 1の開発開始**（2025年9月中旬）

本計画に基づき、ConnectEnを業界をリードするSaaSプラットフォームへと進化させていきます。