# フェーズ1実装計画 - マルチテナント基盤構築と既存システム移行
# Phase 1 Implementation Plan - Multi-tenant Foundation and Existing System Migration

## 1. 概要
## 1. Overview

このドキュメントは、ConnectEn SaaSプラットフォームのマルチテナント基盤を構築し、現在の日本側システム（now_JP_system）の全機能をEn Dance Studioのテナントとして移行するフェーズ1の詳細実装計画を定義します。

This document defines the detailed implementation plan for Phase 1, which involves building the multi-tenant foundation for the ConnectEn SaaS platform and migrating all functions from the current Japanese system (now_JP_system) as the En Dance Studio tenant.

## 2. マルチテナント基盤機能
## 2. Multi-tenant Foundation Functions

### 2.1 プラットフォームコア機能
### 2.1 Platform Core Functions

| 優先度 | 機能名 | 英語名 | 実装期間 |
|-------|--------|--------|----------|
| 最高 | テナント管理 | Tenant Management | 1ヶ月目 |
| 最高 | 認証・認可基盤 | Auth & Authorization | 1ヶ月目 |
| 最高 | データ分離アーキテクチャ | Data Isolation Architecture | 1ヶ月目 |
| 高 | テナントオンボーディング | Tenant Onboarding | 2ヶ月目 |
| 高 | 課金・請求管理 | Billing Management | 2ヶ月目 |

**機能詳細**:
- **テナント管理**: テナント登録、契約管理、利用プラン設定
- **認証・認可基盤**: テナント跨いだ認証、役割ベースアクセス制御
- **データ分離**: テナント別データベーススキーマ、APIレベルでのテナント分離
- **オンボーディング**: セルフサービス登録、初期設定ウィザード
- **課金管理**: 利用量追跡、請求書生成、支払い管理

## 3. 実装対象機能一覧（現行システムベース）
## 3. Implementation Target Functions (Based on Current System)

### 3.1 ダッシュボード・全般機能
### 3.1 Dashboard and General Functions

| 優先度 | 画面番号 | 機能名 | 英語名 | 実装期間 |
|-------|---------|--------|--------|---------|
| 最高 | 100 | ダッシュボード | Dashboard | 1ヶ月目 |

**機能詳細**:
- 業務概要表示
- 重要通知表示  
- クイックアクセスメニュー
- 本日の売上・来客数サマリー
- 未処理業務アラート

### 3.2 会員管理機能
### 3.2 Member Management Functions

| 優先度 | 画面番号 | 機能名 | 英語名 | 実装期間 |
|-------|---------|--------|--------|---------|
| 最高 | 200 | 入会管理 | Membership Management | 1-2ヶ月目 |
| 最高 | 201 | 会員管理 | Member Management | 1-2ヶ月目 |
| 最高 | 202 | 会員メイン | Member Main | 1-2ヶ月目 |
| 高 | 203 | 出席管理 | Attendance Management | 2ヶ月目 |

**機能詳細**:
- **入会管理**: 新規会員登録、会員プラン選択、初期設定と契約
- **会員管理**: 会員情報編集、会員ステータス管理、会員履歴表示
- **会員メイン**: 会員詳細画面、個人データ管理
- **出席管理**: 出席記録、出席履歴表示、統計レポート

### 3.3 カード・決済機能
### 3.3 Card and Payment Functions

| 優先度 | 画面番号 | 機能名 | 英語名 | 実装期間 |
|-------|---------|--------|--------|---------|
| 高 | 300 | カード登録 | Card Registration | 2ヶ月目 |
| 高 | 301 | カード書き込み | Card Writing | 2ヶ月目 |

**機能詳細**:
- **カード登録**: クレジットカード登録、会員カード発行、セキュリティ確認
- **カード書き込み**: ICカード情報書き込み、カード検証、エラー処理

### 3.4 スクール・施設管理機能
### 3.4 School and Facility Management Functions

| 優先度 | 画面番号 | 機能名 | 英語名 | 実装期間 |
|-------|---------|--------|--------|---------|
| 高 | 150 | スクール管理 | School Management | 1ヶ月目 |
| 高 | 151 | スタジオ管理 | Studio Management | 1-2ヶ月目 |

**機能詳細**:
- **スクール管理**: 拠点情報管理、基本設定、営業時間設定
- **スタジオ管理**: 部屋情報管理、設備管理、利用可能時間設定、料金設定

### 3.5 スタッフ・インストラクター管理機能
### 3.5 Staff and Instructor Management Functions

| 優先度 | 画面番号 | 機能名 | 英語名 | 実装期間 |
|-------|---------|--------|--------|---------|
| 最高 | 160 | 統合人材マスタ管理 | Integrated Personnel Master | 1ヶ月目 |
| 高 | 161 | スタッフ管理 | Staff Management | 2ヶ月目 |
| 高 | 162 | インストラクター管理 | Instructor Management | 2ヶ月目 |

**機能詳細**:
- **統合人材マスタ管理**: 
  - 人材基本情報管理（名前、連絡先、資格等）
  - 役割タグ管理（スタッフ/インストラクター/両方）
  - 権限設定（画面アクセス権限）
  - 雇用形態管理（正社員、アルバイト、業務委託等）

- **スタッフ管理画面**:
  - スタッフ一覧・検索・編集
  - シフト管理（勤務予定、実績）
  - 業務割当管理
  - 給与計算・支払い管理
  - パフォーマンス評価

- **インストラクター管理画面**:
  - インストラクター一覧・検索・編集
  - レッスン担当スケジュール
  - レッスン実績管理
  - 報酬計算・支払い管理
  - 生徒評価・フィードバック管理

### 3.6 予約管理機能
### 3.6 Reservation Management Functions

| 優先度 | 画面番号 | 機能名 | 英語名 | 実装期間 |
|-------|---------|--------|--------|---------|
| 最高 | 400 | 予約管理 | Reservation Management | 1-2ヶ月目 |

**機能詳細**:
- 予約作成と編集
- キャンセル管理
- 予約状況確認
- レッスンスケジュール管理
- スタジオ貸出管理

### 2.7 通知・コミュニケーション機能
### 2.7 Notification and Communication Functions

| 優先度 | 画面番号 | 機能名 | 英語名 | 実装期間 |
|-------|---------|--------|--------|---------|
| 中 | 500 | メール配信 | Email Distribution | 3ヶ月目 |
| 中 | 501 | お知らせ管理 | Notification Management | 3ヶ月目 |

**機能詳細**:
- **メール配信**: メールテンプレート、ターゲット選択、配信スケジュール設定
- **お知らせ管理**: お知らせ作成、公開設定、お知らせ履歴

### 2.8 コース・月謝管理機能
### 2.8 Course and Monthly Fee Management Functions

| 優先度 | 画面番号 | 機能名 | 英語名 | 実装期間 |
|-------|---------|--------|--------|---------|
| 高 | 600 | コース一覧 | Course List | 2ヶ月目 |
| 高 | 601 | 月謝検索 | Monthly Fee Search | 3ヶ月目 |

**機能詳細**:
- **コース一覧**: コース情報表示、コース検索とフィルタリング、コース管理機能
- **月謝検索**: 月謝情報検索、支払い状況確認、料金調整機能

### 2.9 POS・販売管理機能
### 2.9 POS and Sales Management Functions

| 優先度 | 画面番号 | 機能名 | 英語名 | 実装期間 |
|-------|---------|--------|--------|---------|
| 中 | 700 | POS検索 | POS Search | 3ヶ月目 |
| 中 | 701 | 金種表 | Cash Denomination | 3ヶ月目 |
| 中 | 702 | POS設定 | POS Settings | 3ヶ月目 |

**機能詳細**:
- **POS検索**: 販売履歴検索、レシート再発行、返品・交換処理
- **金種表**: 現金管理、釣銭計算、金種確認
- **POS設定**: POS端末設定、商品マスタ管理、割引設定

### 2.10 レポート・集計機能
### 2.10 Report and Analytics Functions

| 優先度 | 画面番号 | 機能名 | 英語名 | 実装期間 |
|-------|---------|--------|--------|---------|
| 高 | 800 | 売上集計 | Sales Summary | 4ヶ月目 |
| 高 | 801 | スタジオ集計 | Studio Summary | 4ヶ月目 |
| 中 | 802 | スタジオ遷移 | Studio Transition | 4ヶ月目 |
| 中 | 803 | 売上予測 | Sales Forecast | 4ヶ月目 |

**機能詳細**:
- **売上集計**: 売上データ集計、期間別分析、エクスポート機能
- **スタジオ集計**: スタジオ別パフォーマンス、稼働率分析、収益性評価
- **スタジオ遷移**: 利用傾向分析、会員移動パターン、時間帯別利用状況
- **売上予測**: 売上予測モデル、シナリオ分析、季節要因調整

### 2.11 システム・ユーティリティ機能
### 2.11 System and Utility Functions

| 優先度 | 画面番号 | 機能名 | 英語名 | 実装期間 |
|-------|---------|--------|--------|---------|
| 低 | 900 | 日付チェック | Date Check | 4ヶ月目 |

**機能詳細**:
- システム日付確認
- データ整合性チェック
- バックアップ・メンテナンス機能

## 3. 会員側機能（ユーザーポータル）
## 3. Member-Side Functions (User Portal)

### 3.1 未ログイン画面
### 3.1 Before Login Screens

| 優先度 | 画面番号 | 機能名 | 英語名 | 実装期間 |
|-------|---------|--------|--------|---------|
| 高 | 1000 | トップページ | Top Page | 2ヶ月目 |
| 最高 | 1001 | ログイン | Login | 1ヶ月目 |
| 高 | 1002 | マイページ登録 | MyPage Registration | 2ヶ月目 |

### 3.2 ログイン後画面
### 3.2 After Login Screens

| 優先度 | 画面番号 | 機能名 | 英語名 | 実装期間 |
|-------|---------|--------|--------|---------|
| 最高 | 1100 | 会員トップ | Member Top | 2ヶ月目 |
| 高 | 1101 | マイページ | My Page | 2ヶ月目 |
| 最高 | 1200-1203 | レッスン予約関連 | Lesson Reservation | 2ヶ月目 |
| 中 | 1400-1405 | 予約・履歴管理 | Reservation & History | 3ヶ月目 |
| 中 | 1500-1502 | お知らせ | Notifications | 3ヶ月目 |
| 低 | 1600-1604 | 友達紹介 | Friend Referral | 4ヶ月目 |
| 中 | 1700-1713 | ポイント・チケット管理 | Point & Ticket Management | 3ヶ月目 |
| 低 | 1800-1801 | ユーティリティ | Utilities | 4ヶ月目 |
| 中 | 1900-1910 | 設定 | Settings | 3ヶ月目 |

## 4. 技術実装要件
## 4. Technical Implementation Requirements

### 4.1 データベース設計
### 4.1 Database Design

#### 4.1.1 プラットフォーム共通テーブル
#### 4.1.1 Platform Common Tables

**テナント管理テーブル**:
```sql
tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL, -- テナントコード
  name VARCHAR(255) NOT NULL, -- 企業名
  subdomain VARCHAR(100) UNIQUE, -- サブドメイン
  plan_type ENUM('basic', 'standard', 'premium', 'enterprise') DEFAULT 'basic',
  status ENUM('active', 'suspended', 'cancelled') DEFAULT 'active',
  contract_start_date DATE,
  contract_end_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

platform_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  is_platform_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

tenant_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id),
  plan_id UUID REFERENCES subscription_plans(id),
  start_date DATE NOT NULL,
  end_date DATE,
  status ENUM('active', 'cancelled', 'expired') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

#### 4.1.2 テナント固有テーブル
#### 4.1.2 Tenant-Specific Tables

**必須テーブル**（全てtenant_idを含む）:
- users（会員ユーザー）
- schools（スクール・拠点）
- studios（スタジオ・部屋）
- personnel（統合人材マスタ）
- personnel_roles（人材役割・タグ管理）
- staff_assignments（スタッフ割当）
- instructor_assignments（インストラクター割当）
- courses（コース）
- lessons（レッスン）
- reservations（予約）
- payments（支払い）
- cards（カード情報）
- notifications（通知）
- pos_transactions（POS取引）
- reports（レポート）
- shifts（シフト・勤務予定）

#### 4.1.3 統合人材マスタ設計
#### 4.1.3 Integrated Personnel Master Design

**personnelテーブル**:
```sql
personnel (
  id BIGINT PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES tenants(id), -- テナントID
  employee_code VARCHAR(50), -- 従業員コード
  name VARCHAR(100) NOT NULL, -- 氏名
  name_kana VARCHAR(100), -- 氏名（カナ）
  email VARCHAR(255), -- メールアドレス
  phone VARCHAR(20), -- 電話番号
  hire_date DATE, -- 入社日
  employment_type ENUM('正社員', 'アルバイト', '業務委託', 'その他'), -- 雇用形態
  status ENUM('在籍', '休職', '退職') DEFAULT '在籍', -- 在籍状況
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  UNIQUE KEY unique_tenant_employee (tenant_id, employee_code),
  UNIQUE KEY unique_tenant_email (tenant_id, email)
)
```

**personnel_rolesテーブル** (役割・タグ管理):
```sql
personnel_roles (
  id BIGINT PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES tenants(id), -- テナントID
  personnel_id BIGINT REFERENCES personnel(id),
  role_type ENUM('スタッフ', 'インストラクター') NOT NULL,
  is_active BOOLEAN DEFAULT TRUE, -- 該当役割での活動状況
  started_at DATE, -- 役割開始日
  ended_at DATE, -- 役割終了日（NULLの場合は継続中）
  qualifications TEXT, -- 資格情報（インストラクターの場合）
  specialties TEXT, -- 専門分野（インストラクターの場合）
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

**権限管理**:
- 同一人物が複数の役割（スタッフ＋インストラクター）を持つことが可能
- 管理画面は役割別に分離（スタッフ管理画面、インストラクター管理画面）
- アクセス権限は役割に基づいて制御

### 4.2 API設計
### 4.2 API Design

#### 4.2.1 プラットフォームAPIエンドポイント
#### 4.2.1 Platform API Endpoints
- /api/platform/tenants/* （テナント管理）
- /api/platform/subscriptions/* （サブスクリプション管理）
- /api/platform/billing/* （課金管理）
- /api/platform/analytics/* （プラットフォーム分析）

#### 4.2.2 テナント固有APIエンドポイント
#### 4.2.2 Tenant-Specific API Endpoints
**全てのAPIは/api/v1/:tenantId/で始まる**:
- /api/v1/:tenantId/auth/* （認証関連）
- /api/v1/:tenantId/schools/* （スクール管理）
- /api/v1/:tenantId/studios/* （スタジオ管理）
- /api/v1/:tenantId/personnel/* （統合人材マスタ）
- /api/v1/:tenantId/staff/* （スタッフ管理）
- /api/v1/:tenantId/instructors/* （インストラクター管理）
- /api/v1/:tenantId/members/* （会員管理）
- /api/v1/:tenantId/reservations/* （予約管理）
- /api/v1/:tenantId/payments/* （決済関連）
- /api/v1/:tenantId/courses/* （コース管理）
- /api/v1/:tenantId/reports/* （レポート）
- /api/v1/:tenantId/notifications/* （通知）
- /api/v1/:tenantId/shifts/* （シフト・勤務管理）

### 4.3 セキュリティ要件
### 4.3 Security Requirements

#### 4.3.1 マルチテナントセキュリティ
#### 4.3.1 Multi-tenant Security
- JWT認証システム（テナントIDを含む）
- テナント間のデータアイソレーション
- Row Level Security (RLS) の実装
- APIレベルでのテナント検証

#### 4.3.2 一般セキュリティ
#### 4.3.2 General Security
- RBAC（Role-Based Access Control）
- 個人情報暗号化
- PCI DSS準拠（カード情報）
- HTTPS通信
- SQLインジェクション対策
- CSRF/XSS対策

## 5. データ移行計画
## 5. Data Migration Plan

### 5.1 移行対象データ
### 5.1 Migration Target Data

1. **会員データ**: 既存会員情報、会員履歴
2. **コースデータ**: コース情報、料金体系
3. **予約データ**: 過去の予約履歴、キャンセル履歴
4. **決済データ**: 支払い履歴、月謝履歴
5. **レポートデータ**: 過去の売上データ、集計データ

### 5.2 移行手順
### 5.2 Migration Procedure

1. **テナント作成**: En Dance Studio用のテナントを作成
2. **データ分析**: 既存システムのデータ構造分析
3. **変換ルール作成**: データ形式変換ルールの策定（テナントID追加含む）
4. **テスト移行**: 少量データでの移行テスト
5. **本移行**: 全データの移行実行
6. **検証**: データ整合性とテナント分離の確認

## 6. テスト計画
## 6. Testing Plan

### 6.1 テスト種類
### 6.1 Test Types

- **ユニットテスト**: 各機能の単体テスト
- **統合テスト**: API連携テスト
- **マルチテナントテスト**: テナント分離検証
- **E2Eテスト**: ユーザー操作フローテスト
- **パフォーマンステスト**: 負荷テスト（複数テナント同時利用）
- **セキュリティテスト**: 脆弱性テスト、テナント間アクセステスト

### 6.2 受け入れテスト
### 6.2 Acceptance Testing

- 現行システムとの機能比較テスト
- 業務フロー確認テスト
- ユーザビリティテスト
- 実業務での試行運用テスト

## 7. 成功基準・KPI
## 7. Success Criteria and KPIs

### 7.1 機能要件達成基準
### 7.1 Functional Requirements Achievement Criteria

- [ ] マルチテナント基盤の完全動作
- [ ] テナントオンボーディング機能の実装
- [ ] 現行システムの全機能（100%）が新システムで利用可能
- [ ] データ移行の完全性（99.9%以上）
- [ ] 業務フロー中断時間の最小化（24時間以内）

### 7.2 非機能要件達成基準
### 7.2 Non-functional Requirements Achievement Criteria

- [ ] レスポンス時間：2秒以内（95%のリクエスト）
- [ ] 可用性：99.9%以上
- [ ] セキュリティ基準：PCI DSS準拠
- [ ] ユーザビリティ：現行システム同等以上

### 7.3 ビジネス要件達成基準
### 7.3 Business Requirements Achievement Criteria

- [ ] 業務遂行に支障なし
- [ ] スタッフの追加トレーニング時間：最小限（8時間以内）
- [ ] 顧客サービス品質の維持・向上

## 8. リスク管理
## 8. Risk Management

### 8.1 技術リスク
### 8.1 Technical Risks

| リスク | 影響度 | 発生確率 | 対策 |
|--------|--------|---------|------|
| データ移行失敗 | 高 | 中 | 段階的移行、バックアップ体制強化 |
| パフォーマンス問題 | 中 | 中 | 負荷テスト強化、インフラ最適化 |
| セキュリティ脆弱性 | 高 | 低 | セキュリティ監査、ペネトレーションテスト |

### 8.2 ビジネスリスク
### 8.2 Business Risks

| リスク | 影響度 | 発生確率 | 対策 |
|--------|--------|---------|------|
| 業務中断 | 高 | 低 | 並行運用期間設定、即座復旧体制 |
| ユーザー受け入れ拒否 | 中 | 中 | 事前トレーニング、段階的移行 |
| 機能不足による業務影響 | 高 | 中 | 要件定義精度向上、ユーザー検証強化 |

## 9. 次フェーズへの移行条件
## 9. Transition Conditions to Next Phase

フェーズ2（MindBody機能統合）への移行は、以下の条件をすべて満たした時点で実行：

- [ ] 現行システム全機能の実装完了
- [ ] 全データの移行完了と検証完了
- [ ] 4週間以上の安定運用実績
- [ ] 業務チームからの稼働承認
- [ ] パフォーマンス・セキュリティ基準の達成
- [ ] 緊急時対応体制の確立

The transition to Phase 2 (MindBody feature integration) will be executed when all of the following conditions are met:

- [ ] Complete implementation of all current system functions
- [ ] Complete data migration and verification
- [ ] Stable operation track record of 4+ weeks
- [ ] Operational approval from business teams
- [ ] Achievement of performance and security standards
- [ ] Establishment of emergency response system 