# ConnectEn - ダンススタジオ向けSaaS ERPプラットフォーム 概要設計書
# ConnectEn - SaaS ERP Platform for Dance Studios System Design Overview

## 1. システム概要
## 1. System Overview

### 1.1 目的
### 1.1 Purpose
ConnectEnは、ダンススタジオ業界に特化したマルチテナント型SaaS ERPプラットフォームです。エン株式会社のEn Dance Studioをはじめ、複数のダンススタジオが同一のプラットフォーム上で独立した環境を利用できる包括的なソリューションを提供します。各スタジオの運営に必要な全ての機能を統合し、効率的な業務管理とデータドリブンな経営を実現します。

ConnectEn is a multi-tenant SaaS ERP platform specialized for the dance studio industry. It provides a comprehensive solution where multiple dance studios, including En Dance Studio operated by En Corporation, can use independent environments on the same platform. It integrates all functions necessary for each studio's operations, achieving efficient business management and data-driven management.

### 1.2 背景
### 1.2 Background
- 既存の日本のシステムを刷新し、業界全体で利用可能なSaaSプラットフォームとして再構築
- アメリカのMindBodyシステムの優れた機能を取り入れ、グローバル展開にも対応
- Mio Systemの最新AI技術を活用し、各スタジオの運営効率化と顧客体験の向上を図る
- 補助金申請の承認を受け、単一企業向けからマルチテナント型SaaSへと設計を拡張

- Redesigning the existing Japanese system as a SaaS platform available for the entire industry
- Incorporating excellent features from America's MindBody system to support global expansion
- Utilizing the latest AI technology from Mio System to improve each studio's operation efficiency and enhance customer experience
- Expanding the design from single-company to multi-tenant SaaS following subsidy application approval

### 1.3 ステークホルダー
### 1.3 Stakeholders
- プラットフォーム運営者（Mio System）
- 各テナント企業のオーナー・経営者
- 各スタジオの運営管理者
- インストラクター・講師
- スタジオスタッフ
- 生徒・顧客
- システム管理者（プラットフォーム管理者・テナント管理者）

- Platform Operator (Mio System)
- Tenant Company Owners/Executives
- Studio Operations Managers at each location
- Instructors/Teachers
- Studio Staff
- Students/Customers
- System Administrators (Platform Admins & Tenant Admins)

## 2. 機能要件
## 2. Functional Requirements

### 2.1 会員管理機能
### 2.1 Membership Management
- 会員登録・編集・検索
- 会員カード発行・管理
- 会員の出席履歴管理
- 会費管理と支払い状況追跡

- Member registration, editing, and search
- Membership card issuance and management
- Member attendance history management
- Membership fee management and payment tracking

### 2.2 スケジュール管理
### 2.2 Schedule Management
- レッスンスケジュール作成・管理
- スタジオ予約システム
- インストラクターのスケジュール管理
- スケジュール変更通知

- Lesson schedule creation and management
- Studio reservation system
- Instructor schedule management
- Schedule change notifications

### 2.3 決済・会計管理
### 2.3 Payment and Accounting Management
- 月謝・レッスン料の請求・管理
- POSシステム連携
- 売上集計・分析
- 収支予測

- Monthly fee and lesson fee billing and management
- POS system integration
- Sales aggregation and analysis
- Revenue forecasting

### 2.4 マーケティング・コミュニケーション
### 2.4 Marketing and Communication
- メール配信機能
- お知らせ・通知管理
- キャンペーン管理

- Email distribution function
- Announcement and notification management
- Campaign management

### 2.5 レポート・分析
### 2.5 Reporting and Analysis
- スタジオ別売上分析
- 会員動向分析
- レッスン人気度分析
- 経営状況可視化ダッシュボード

- Sales analysis by studio
- Member trend analysis
- Lesson popularity analysis
- Management status visualization dashboard

### 2.6 スクール・施設管理
### 2.6 School and Facility Management
- スクール情報管理（拠点、基本情報）
- スタジオ（部屋）管理（設備、利用可能時間、料金設定）
- 施設予約状況管理
- 設備・備品管理

- School information management (locations, basic information)
- Studio (room) management (equipment, available hours, pricing)
- Facility reservation status management
- Equipment and supplies management

### 2.7 スタッフ・インストラクター管理
### 2.7 Staff and Instructor Management
- 統合人材マスタ管理（スタッフ・インストラクター共通）
- スタッフ管理（シフト、業務割当、給与計算）
- インストラクター管理（レッスン担当、実績管理、報酬計算）
- 役割・権限管理（スタッフ/インストラクターのタグ管理）
- スケジュール管理（勤務予定、レッスン予定）

- Integrated personnel master management (common for staff and instructors)
- Staff management (shifts, task assignment, payroll calculation)
- Instructor management (lesson assignment, performance management, compensation calculation)
- Role and permission management (staff/instructor tag management)
- Schedule management (work schedule, lesson schedule)

### 2.8 在庫・物品管理
### 2.8 Inventory and Supply Management
- スタジオ備品管理
- 物品発注・管理

- Studio equipment management
- Supply ordering and management

### 2.9 モバイル対応
### 2.9 Mobile Support
- モバイルアプリ連携
- 予約・キャンセル機能
- 会員向けポータル

- Mobile app integration
- Reservation and cancellation functions
- Member portal

## 3. 非機能要件
## 3. Non-functional Requirements

### 3.1 ユーザビリティ
### 3.1 Usability
- 直感的で使いやすいUI/UX
- レスポンシブデザイン対応
- 多言語対応（日本語・英語）

- Intuitive and user-friendly UI/UX
- Responsive design support
- Multi-language support (Japanese, English)

### 3.2 性能・拡張性
### 3.2 Performance and Scalability
- 高速なレスポンス時間
- マルチテナント対応による無制限のスケーラビリティ
- テナント毎の独立したデータベース環境
- 水平スケーリングによる負荷分散
- 将来の機能拡張に対応

- Fast response time
- Unlimited scalability with multi-tenant support
- Independent database environment for each tenant
- Load balancing through horizontal scaling
- Support for future functional expansion

### 3.3 セキュリティ
### 3.3 Security
- 個人情報の厳格な管理
- アクセス権限の詳細設定
- セキュアな決済処理
- データバックアップ

- Strict management of personal information
- Detailed access permission settings
- Secure payment processing
- Data backup

### 3.4 可用性
### 3.4 Availability
- 24時間365日のシステム稼働
- 障害発生時の素早い復旧
- ダウンタイムの最小化

- 24/7 system operation
- Quick recovery in case of failure
- Minimization of downtime

### 3.5 インテグレーション
### 3.5 Integration
- 外部会計システムとの連携
- 決済サービスとの統合
- SNS連携

- Integration with external accounting systems
- Integration with payment services
- Social media integration

## 4. システムアーキテクチャ
## 4. System Architecture

### 4.1 技術スタック
### 4.1 Technology Stack
- フロントエンド: Next.js, React, TypeScript
- バックエンド: Node.js, Express
- データベース: PostgreSQL
- 認証: OAuth 2.0, JWT
- デプロイ: Vercel, AWS

- Frontend: Next.js, React, TypeScript
- Backend: Node.js, Express
- Database: PostgreSQL
- Authentication: OAuth 2.0, JWT
- Deployment: Vercel, AWS

### 4.2 システム構成
### 4.2 System Configuration
- マルチテナント対応マイクロサービスアーキテクチャ
- RESTful API設計（テナント分離対応）
- リアルタイム通知機能（WebSocket）
- クラウドベースのインフラストラクチャ
- テナント毎の独立したデータストレージ
- 共通プラットフォームサービスの提供

- Multi-tenant microservices architecture
- RESTful API design (with tenant isolation)
- Real-time notification feature (WebSocket)
- Cloud-based infrastructure
- Independent data storage for each tenant
- Common platform services provision

### 4.3 データモデル
### 4.3 Data Model

#### 4.3.1 プラットフォーム共通データ
#### 4.3.1 Platform Common Data
- テナント管理（企業情報、契約情報、利用プラン）
- プラットフォームユーザー管理
- 課金・請求管理
- システム設定・マスタデータ

- Tenant Management (Company info, contracts, usage plans)
- Platform User Management
- Billing and Invoice Management
- System Settings and Master Data

#### 4.3.2 テナント固有データ
#### 4.3.2 Tenant-Specific Data
- ユーザー（会員、統合人材マスタ）
- スクール・拠点情報
- スタジオ・施設・部屋
- レッスン・クラス
- 予約
- 支払い・取引
- イベント・キャンペーン
- 通知・メッセージ
- 人材役割管理（スタッフ/インストラクタータグ）

- Users (Members, Integrated Personnel Master)
- School and Location Information
- Studios/Facilities/Rooms
- Lessons/Classes
- Reservations
- Payments/Transactions
- Events/Campaigns
- Notifications/Messages
- Personnel Role Management (Staff/Instructor Tags)

## 5. 開発・運用計画
## 5. Development and Operation Plan

### 5.1 開発フェーズ
### 5.1 Development Phases

#### フェーズ1: マルチテナント基盤構築と既存システム移行 (4-5ヶ月)
#### Phase 1: Multi-tenant Foundation and Existing System Migration (4-5 months)
**目的**: マルチテナント対応の基盤を構築し、現在の日本側システム（now_JP_system）の機能とデータをEn Dance Studioのテナントとして移行

**主要機能**:
- マルチテナント基盤（テナント管理、認証・認可、データ分離）
- プラットフォーム管理機能（テナント登録、利用プラン管理、請求管理）
- 会員管理（入会管理、会員情報管理、会員検索、出席管理）
- カード管理（カード登録、カード書き込み）
- 予約管理（レッスン予約、スタジオ貸出）
- 決済・会計（POS検索、金種表、POS設定、会費管理）
- 通知（メール配信、お知らせ管理）
- コース管理（コース一覧、月謝検索）
- 基本レポート（売上集計、スタジオ集計）
- システム設定・日付チェック等のユーティリティ

**目標**: マルチテナント対応で現行システムと同等の業務遂行能力を確保

#### フェーズ2: MindBody機能統合 (2-3ヶ月)
#### Phase 2: MindBody Feature Integration (2-3 months)
**目的**: MindBodyシステムの優れたマーケティング支援機能とサマリ画面の実装

**主要機能**:
- 高度なダッシュボード（ビジネスダッシュボード、ネットワークダッシュボード）
- マーケティング管理（キャンペーン作成、効果測定、ターゲティング）
- 分析機能（Analytics Overview、Sales Analytics）
- リード管理（見込み客追跡、コンバージョン分析）
- スタッフ管理強化（パフォーマンス分析、スケジュール最適化）
- 高度なレポート機能（売上予測、スタジオ遷移分析）

**目標**: マーケティング効率とビジネスインサイトの大幅向上

#### フェーズ3: AI機能実装とSaaS展開 (3-4ヶ月)
#### Phase 3: AI Feature Implementation and SaaS Deployment (3-4 months)
**目的**: AI技術を活用した業務効率化と顧客体験向上、および他スタジオへのSaaS展開準備

**主要機能**:
- 予測分析（会員退会予測、人気レッスン予測、売上予測）
- パーソナライゼーション（レッスンレコメンデーション、カスタマイズ通知）
- 業務最適化（スケジュール最適化、インストラクター配置最適化）
- 自動化支援（チャットボット、音声認識、OCR）
- コンテンツ生成（イベント告知、メール文面生成）
- インサイト提供（日報分析、改善提案、離脱リスクアラート）

**主要機能（追加）**:
- テナントオンボーディング機能
- セルフサービスポータル
- プラットフォーム共通のAI学習基盤
- 業界ベンチマーク・分析機能

**目標**: AI技術による競争優位性の確立とプラットフォームとしての市場展開準備完了

- Phase 1: Complete migration of current Japanese system (now_JP_system) functions and data to ensure no disruption to business operations
- Phase 2: Implementation of MindBody's marketing support and summary screen features  
- Phase 3: Addition of AI functionality for operational efficiency and competitive advantage

### 5.2 テスト戦略
### 5.2 Testing Strategy
- ユニットテスト
- 統合テスト
- ユーザー受け入れテスト
- パフォーマンステスト

- Unit testing
- Integration testing
- User acceptance testing
- Performance testing

### 5.3 展開・移行計画
### 5.3 Deployment and Migration Plan
- 段階的な機能リリース
- データ移行手順
- 並行運用期間の設定
- ユーザートレーニング計画

- Gradual feature release
- Data migration procedures
- Parallel operation period setting
- User training plan

## 6. AI機能活用計画
## 6. AI Feature Utilization Plan

### 6.1 予測分析
### 6.1 Predictive Analysis
- 会員退会予測 🤖
- 人気レッスン予測 🤖
- 売上予測 🤖

- Member churn prediction 🤖
- Popular lesson prediction 🤖
- Sales forecasting 🤖

### 6.2 パーソナライゼーション
### 6.2 Personalization
- 会員向けレッスンレコメンデーション 🤖
- カスタマイズされた通知・マーケティング 🤖

- Lesson recommendations for members 🤖
- Customized notifications and marketing 🤖

### 6.3 業務最適化
### 6.3 Operational Optimization
- スケジュール最適化 🤖
- インストラクター配置最適化 🤖
- 在庫管理最適化 🤖

- Schedule optimization 🤖
- Instructor allocation optimization 🤖
- Inventory management optimization 🤖

### 6.4 自然言語処理
### 6.4 Natural Language Processing
- チャットボットによるカスタマーサポート 🤖
- 音声認識によるシステム操作 🤖

- Chatbot customer support 🤖
- Voice recognition system operation 🤖

### 6.5 業務効率化支援
### 6.5 Operational Efficiency Support
- スマート入力補完・フォーム自動入力 🤖
- 音声入力による情報登録 🤖
- OCRによる紙書類のデジタル化 🤖
- 入力ミス検出・修正提案 🤖

- Smart input completion and form auto-filling 🤖
- Information registration via voice input 🤖
- Digitization of paper documents using OCR 🤖
- Input error detection and correction suggestions 🤖

### 6.6 自動ドキュメント・コンテンツ生成
### 6.6 Automatic Document and Content Generation
- イベントLP・告知文生成 🤖
- ワークショップ資料自動生成 🤖
- メール文面・お知らせ文章の提案 🤖
- SEO最適化されたウェブコンテンツ提案 🤖

- Event landing page and announcement generation 🤖
- Automatic workshop material generation 🤖
- Email and announcement text suggestions 🤖
- SEO-optimized web content suggestions 🤖

### 6.7 インサイトと意思決定支援
### 6.7 Insights and Decision Support
- 日報・週報の自動分析とアドバイス提供 🤖
- 店舗パフォーマンス改善提案 🤖
- 顧客離脱リスクアラート・対策提案 🤖
- クロスセル・アップセル機会の提案 🤖

- Automatic analysis of daily/weekly reports and advice provision 🤖
- Store performance improvement suggestions 🤖
- Customer churn risk alerts and countermeasure suggestions 🤖
- Cross-sell and up-sell opportunity suggestions 🤖

### 6.8 コミュニケーション支援
### 6.8 Communication Support
- 顧客対応のための会話サポート 🤖
- 顧客質問への対応案提示 🤖
- 多言語対応・翻訳支援 🤖
- 講師・会員間のコミュニケーション促進 🤖

- Conversation support for customer interactions 🤖
- Response suggestions for customer inquiries 🤖
- Multilingual support and translation assistance 🤖
- Facilitating communication between instructors and members 🤖

## 7. UI/UXおよびメニュー構成
## 7. UI/UX and Menu Structure

### 7.1 管理者向けダッシュボード
### 7.1 Administrator Dashboard
- **ホームダッシュボード** - 重要情報のサマリー表示 🌐
- **通知センター** - アラートと重要情報
- **クイックアクセスメニュー** - よく使う機能へのショートカット 🌐

- **Home Dashboard** - Summary display of important information 🌐
- **Notification Center** - Alerts and important information
- **Quick Access Menu** - Shortcuts to frequently used functions 🌐

### 7.2 メインメニュー構成
### 7.2 Main Menu Structure
1. **会員管理**
   - 会員情報検索/登録
   - 会員カード発行
   - 出席履歴管理
   - 支払い状況確認

1. **Member Management**
   - Member information search/registration
   - Membership card issuance
   - Attendance history management
   - Payment status confirmation

2. **予約・スケジュール管理**
   - レッスンスケジュール
   - スタジオ予約管理
   - 代行情報管理
   - インストラクタースケジュール

2. **Reservation and Schedule Management**
   - Lesson schedule
   - Studio reservation management
   - Substitute information management
   - Instructor schedule

3. **レッスン管理**
   - レッスン登録/編集
   - コース管理
   - ワークショップ管理
   - 特別イベント管理 🌐

3. **Lesson Management**
   - Lesson registration/editing
   - Course management
   - Workshop management
   - Special event management 🌐

4. **決済・会計**
   - 会費請求・管理
   - POS操作
   - 金種表管理
   - 売上集計

4. **Payment and Accounting**
   - Membership fee billing and management
   - POS operation
   - Denomination management
   - Sales aggregation

5. **マーケティング**
   - メール配信
   - お知らせ管理
   - キャンペーン管理 🌐
   - SNS連携 🌐

5. **Marketing**
   - Email distribution
   - Announcement management
   - Campaign management 🌐
   - Social media integration 🌐

6. **レポート・分析**
   - 売上集計・分析
   - スタジオ稼働分析
   - 会員動向分析
   - 売上予測 🌐

6. **Reports and Analysis**
   - Sales aggregation and analysis
   - Studio operation analysis
   - Member trend analysis
   - Sales forecasting 🌐

7. **システム設定**
   - ユーザー権限管理
   - マスタ設定
   - 連携サービス設定 🌐

7. **System Settings**
   - User permission management
   - Master settings
   - Integration service settings 🌐

8. **物品・在庫管理**
   - 物品管理
   - 発注管理
   - 在庫確認

8. **Supplies and Inventory Management**
   - Supply management
   - Order management
   - Inventory checking

### 7.3 会員向けポータル/アプリ 🌐
### 7.3 Member Portal/App 🌐
- レッスン予約
- 決済・支払い
- 出席履歴確認
- お知らせ確認
- コミュニティ機能 🌐
- パーソナルレコメンデーション 🌐

- Lesson reservation
- Payment and billing
- Attendance history confirmation
- Announcement check
- Community features 🌐
- Personal recommendations 🌐

### 7.4 デザイン要素
### 7.4 Design Elements
- モダンで直感的なUI
- En Dance Studioのブランドカラーとアイデンティティの反映
- レスポンシブデザイン（PC、タブレット、スマートフォン対応）
- アクセシビリティ対応 🌐
- データ可視化のためのグラフィカル要素 🌐

- Modern and intuitive UI
- Reflection of En Dance Studio's brand colors and identity
- Responsive design (compatible with PC, tablet, smartphone)
- Accessibility support 🌐
- Graphical elements for data visualization 🌐

### 7.5 ナビゲーション構造
### 7.5 Navigation Structure
- トップナビゲーションバー（グローバルナビゲーション）
- サイドナビゲーションメニュー（セクション別機能アクセス）
- パンくずリスト（現在位置の明示）
- ショートカットメニュー（頻繁に使用する機能へのクイックアクセス） 🌐
- 検索機能（グローバル検索） 🌐

- Top navigation bar (global navigation)
- Side navigation menu (section-specific function access)
- Breadcrumb list (current position indication)
- Shortcut menu (quick access to frequently used functions) 🌐
- Search function (global search) 🌐

## 8. プラットフォーム名
## 8. Platform Name

**ConnectEn** - Dance Studio Management SaaS Platform

ダンススタジオ業界を「つなぐ（Connect）」、エン株式会社から始まる「円（En）」の輪を業界全体に広げる意味を込めて。

Connecting the dance studio industry, expanding the circle (En) that starts from En Corporation to the entire industry.

## 9. ゲーミフィケーション要素
## 9. Gamification Elements

### 9.1 スタッフ向けゲーミフィケーション
### 9.1 Staff-oriented Gamification
- 業務達成度に応じたポイント獲得システム
- 段階的なレベルアップ・ランク制度
- 特定業務の達成によるバッジ・アチーブメント
- 月間/四半期ごとのランキング表示
- 獲得ポイントによる特典・報酬

- Point acquisition system based on task completion
- Progressive level-up and ranking system
- Badges and achievements for completing specific tasks
- Monthly/quarterly ranking display
- Benefits and rewards based on acquired points

### 9.2 ゲーミフィケーション対象業務
### 9.2 Gamification Target Operations
- 顧客対応数/満足度スコア
- 新規会員獲得・継続率
- トラブル解決件数
- イベント参加者数
- システム活用度
- 業務改善提案

- Number of customer interactions/satisfaction scores
- New member acquisition and retention rates
- Number of resolved issues
- Event participant numbers
- System utilization level
- Process improvement proposals

### 9.3 可視化と動機づけ
### 9.3 Visualization and Motivation
- リアルタイムフィードバック
- 進捗状況グラフィカル表示 🤖
- チーム目標と個人目標の連動
- AI分析による業務改善提案 🤖
- 達成感を高める演出効果

- Real-time feedback
- Graphical display of progress 🤖
- Linkage between team goals and individual goals
- AI-based operational improvement suggestions 🤖
- Effects to enhance sense of achievement

### 9.4 店舗間競争・協力要素
### 9.4 Inter-store Competition and Cooperation Elements
- 店舗間チャレンジ
- 共通目標達成による全体報酬
- ベストプラクティス共有インセンティブ
- 相互サポートによるボーナスポイント

- Inter-store challenges
- Overall rewards for achieving common goals
- Incentives for sharing best practices
- Bonus points for mutual support

### 9.5 会員向けロイヤリティプログラム連携
### 9.5 Member Loyalty Program Integration
- 継続参加によるステータスアップ
- 特別イベント招待
- 会員紹介プログラム
- スタッフと会員の相互評価システム

- Status upgrades for continued participation
- Special event invitations
- Member referral program
- Mutual evaluation system between staff and members

## 10. 今後の検討事項
## 10. Future Considerations

### 10.1 プラットフォーム拡張
### 10.1 Platform Expansion
- グローバル展開に向けた多言語・多通貨対応
- APIマーケットプレイスの開設
- サードパーティアプリケーション連携
- ホワイトラベルソリューションの提供

### 10.2 機能拡充
### 10.2 Feature Enhancement
- 会員向けソーシャル機能の検討
- オンラインレッスン統合の可能性
- AIを活用した動画分析機能の追加検討 🤖
- VR/AR技術を活用した新しいダンス体験の提供 🤖
- 業界共通データ分析・ベンチマークサービス

- Multi-currency support for international expansion
- Consideration of social features for members
- Potential integration of online lessons
- Consideration of adding AI-powered video analysis functions 🤖
- Providing new dance experiences using VR/AR technology 🤖 