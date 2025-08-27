# ConnectEn SaaS システム設計ガイドライン / System Design Guidelines

## 📋 目次 / Table of Contents

1. [システム目的・ビジョン](#システム目的ビジョン--system-purpose--vision)
2. [設計理念・原則](#設計理念原則--design-philosophy--principles)
3. [デザインポリシー](#デザインポリシー--design-policy)
4. [UI/UX ガイドライン](#uiux-ガイドライン--uiux-guidelines)
5. [コーディング規約](#コーディング規約--coding-standards)
6. [技術スタック・アーキテクチャ](#技術スタックアーキテクチャ--technical-stack--architecture)
7. [品質基準・パフォーマンス指標](#品質基準パフォーマンス指標--quality-standards--performance-metrics)

---

## 🎯 システム目的・ビジョン / System Purpose & Vision

### システム目的 / System Purpose

**ConnectEn SaaS** は、ダンススタジオ運営に特化したマルチテナント対応のクラウドERPプラットフォームです。従来の複雑で非効率な管理業務を、直感的で効率的なデジタル体験に変革することを目指しています。

ConnectEn SaaS is a multi-tenant cloud ERP platform specialized for dance studio operations. It aims to transform traditionally complex and inefficient management tasks into intuitive and efficient digital experiences.

### ビジョン / Vision

**「ダンススタジオ運営の全てを、シンプルで美しいインターフェースから」**

*"Everything for dance studio management, through simple and beautiful interfaces"*

### ターゲットユーザー / Target Users

1. **スタジオ管理者** - 経営判断と全体管理
2. **受付スタッフ** - 日常的な会員対応と予約管理
3. **インストラクター** - レッスン管理とスケジュール調整
4. **会員** - レッスン予約と自己管理

### 解決する課題 / Problems to Solve

- 複数システムの分散による非効率性
- 古いUIによる学習コストの高さ
- リアルタイム情報共有の不足
- モバイル対応の不備
- スタッフ間の情報格差

---

## 🎨 設計理念・原則 / Design Philosophy & Principles

### 1. **Simple First (シンプル・ファースト)**
- 複雑な機能も直感的に操作できる
- 必要な情報だけを適切なタイミングで提示
- 迷わないナビゲーション設計

### 2. **Progressive Disclosure (段階的情報開示)**
- 基本機能から高度な機能へのスムーズな移行
- 初心者でも使いやすく、熟練者には効率的

### 3. **Mobile-First Design (モバイル・ファースト)**
- スマートフォンでの利用を最優先に設計
- レスポンシブデザインによる全デバイス対応

### 4. **Data-Driven Experience (データドリブン体験)**
- 必要な情報を適切なタイミングで表示
- 予測機能による先回りサポート

### 5. **Accessibility & Inclusivity (アクセシビリティ・包括性)**
- 多様なユーザーが使いやすい設計
- 年齢や技術習熟度に関係なく利用可能

---

## 🎨 デザインポリシー / Design Policy

### カラーパレット / Color Palette

#### デザイン哲学 / Color Philosophy
**フラット・モダンデザイン** - グラデーションを排除し、純粋な単色で構成。色は控えめに使用し、重要な要素にのみポイントカラーを適用してユーザーの注意を適切に誘導する。

**Flat Modern Design** - Eliminating gradients and using pure solid colors. Colors are used sparingly, with point colors applied only to important elements to properly guide user attention.

#### プライマリーカラー / Primary Colors
```css
/* メインブランドカラー - 重要なCTAボタン・アクティブ状態のみに使用 */
--primary-color: #2563eb;      /* メインアクション（登録・保存・送信ボタン） */
--primary-hover: #1d4ed8;      /* ホバー状態（フラット、グラデーションなし） */
--primary-light: #eff6ff;      /* 選択状態の背景（極薄、控えめ） */
--primary-text: #1e40af;       /* リンクテキスト・ナビゲーション */
```

#### ファンクショナルカラー / Functional Colors
```css
/* 状態表示専用 - システムフィードバックにのみ使用 */
--success-color: #059669;      /* 成功・完了（緑系、落ち着いた色調） */
--warning-color: #d97706;      /* 注意・警告（オレンジ系、控えめ） */
--error-color: #dc2626;        /* エラー・危険（赤系、必要最小限） */
--info-color: #0284c7;         /* 情報・通知（青系、冷静な印象） */
```

#### ニュートラルカラー / Neutral Colors - メイン構成
```css
/* 90%の要素で使用するベースカラー群 */
--white: #ffffff;             /* 純白 - カード・モーダル背景 */
--gray-50: #f8fafc;          /* 最も明るい背景 - ページ全体背景 */
--gray-100: #f1f5f9;         /* カード背景 - 軽い区切り */
--gray-200: #e2e8f0;         /* ボーダー・区切り線 */
--gray-300: #cbd5e1;         /* 非アクティブ要素 */
--gray-400: #94a3b8;         /* プレースホルダー・アイコン */
--gray-500: #64748b;         /* セカンダリーテキスト */
--gray-600: #475569;         /* 通常テキスト */
--gray-700: #334155;         /* メインテキスト */
--gray-800: #1e293b;         /* 重要テキスト */
--gray-900: #0f172a;         /* 見出し・最重要テキスト */
```

#### カラー使用原則 / Color Usage Principles

1. **80-15-5 ルール**
   - 80%: ニュートラルカラー（グレー・白）
   - 15%: プライマリーカラー（ブランド色）
   - 5%: アクセントカラー（ファンクショナル色）

2. **ポイントカラー配置**
   ```css
   /* ✅ 適切な使用例 */
   .primary-button { background: var(--primary-color); }      /* メインCTA */
   .active-nav-item { color: var(--primary-color); }          /* アクティブ状態 */
   .error-message { color: var(--error-color); }              /* エラー表示 */
   
   /* ❌ 避けるべき使用 */
   .decorative-element { background: var(--primary-color); }  /* 装飾目的 */
   .all-buttons { background: var(--primary-color); }         /* 全ボタン */
   ```

3. **グラデーション禁止**
   ```css
   /* ❌ 使用禁止 */
   background: linear-gradient(45deg, #2563eb, #1d4ed8);
   box-shadow: 0 0 20px rgba(37, 99, 235, 0.5);
   
   /* ✅ 推奨スタイル */
   background: var(--primary-color);                          /* フラットな単色 */
   box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);              /* シンプルなシャドウ */
   ```

### タイポグラフィ / Typography

#### フォントファミリー / Font Family
```css
--font-family: 'Inter', 'Hiragino Kaku Gothic ProN', 'Helvetica Neue', Arial, sans-serif;
```

#### フォントサイズスケール / Font Size Scale
```css
--font-size-xs: 0.75rem;    /* 12px - 補助情報 */
--font-size-sm: 0.875rem;   /* 14px - キャプション */
--font-size-base: 1rem;     /* 16px - 本文 */
--font-size-lg: 1.125rem;   /* 18px - 強調テキスト */
--font-size-xl: 1.25rem;    /* 20px - 小見出し */
--font-size-2xl: 1.5rem;    /* 24px - 中見出し */
--font-size-3xl: 1.875rem;  /* 30px - 大見出し */
```

### スペーシングシステム / Spacing System
```css
--spacing-xs: 0.25rem;  /* 4px */
--spacing-sm: 0.5rem;   /* 8px */
--spacing-md: 1rem;     /* 16px */
--spacing-lg: 1.5rem;   /* 24px */
--spacing-xl: 2rem;     /* 32px */
--spacing-2xl: 3rem;    /* 48px */
```

### ボーダーレディウス / Border Radius
```css
--radius-sm: 0.25rem;   /* 4px - ボタン、入力欄 */
--radius-md: 0.5rem;    /* 8px - カード、パネル */
--radius-lg: 0.75rem;   /* 12px - モーダル、大きなカード */
--radius-xl: 1rem;      /* 16px - 特別な要素 */
```

### シャドウシステム / Shadow System - フラットデザイン原則
```css
/* フラットデザイン対応 - 最小限のシャドウで立体感を表現 */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);                     /* カード・ボタンの軽い浮き上がり */
--shadow-md: 0 2px 4px -1px rgb(0 0 0 / 0.07);                  /* モーダル・ドロップダウン */
--shadow-lg: 0 4px 6px -1px rgb(0 0 0 / 0.1);                   /* フローティング要素 */

/* ❌ 避けるべきシャドウ - グラデーション的効果 */
/* box-shadow: 0 0 20px rgba(37, 99, 235, 0.3); */
/* box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1); */

/* ✅ 推奨シャドウ - シンプルで機能的 */
.card { box-shadow: var(--shadow-sm); }
.modal { box-shadow: var(--shadow-lg); }
```

---

## 🖥️ UI/UX ガイドライン / UI/UX Guidelines

### レイアウト原則 / Layout Principles

#### 1. **グリッドシステム / Grid System**
- 12カラムレスポンシブグリッド
- 最大幅: 1440px (大画面)
- ブレークポイント: 480px, 768px, 1024px, 1440px

#### 2. **情報階層 / Information Hierarchy**
```
1. ページタイトル (H1)
├── 2. セクション見出し (H2)
│   ├── 3. サブセクション (H3)
│   └── 4. 詳細項目 (H4-H6)
└── アクションボタン
```

#### 3. **コンテナ構造 / Container Structure**
```
Header (固定ヘッダー)
├── Logo & Navigation
└── User Actions
Main Content
├── Sidebar (ナビゲーション)
└── Content Area
    ├── Page Header
    ├── Content Cards
    └── Action Areas
```

### コンポーネント設計原則 / Component Design Principles

#### 1. **ボタン階層 / Button Hierarchy - フラットデザイン**
- **Primary**: 最重要アクション（1画面1個まで）
  ```css
  background: var(--primary-color);  /* ポイントカラー */
  color: white;                      /* フラットな単色 */
  /* グラデーション・シャドウ効果は使用しない */
  ```
- **Secondary**: 補助アクション（控えめなスタイル）
  ```css
  background: white;                 /* 背景は白 */
  border: 1px solid var(--gray-300); /* 軽いボーダー */
  color: var(--gray-700);            /* ニュートラルテキスト */
  ```
- **Tertiary**: 軽微なアクション（最小限のスタイル）
  ```css
  background: transparent;           /* 透明背景 */
  color: var(--gray-500);            /* 控えめなテキスト */
  /* ホバー時のみ背景色を追加 */
  ```

#### 2. **フォーム設計 / Form Design**
- ラベルは入力欄の上に配置
- 必須項目には * マーク
- エラーメッセージは該当フィールドの直下
- プログレッシブバリデーション (リアルタイム検証)

#### 3. **テーブル設計 / Table Design**
- ヘッダーは固定
- ソート可能な列には視覚的インジケーター
- 行ホバー効果でユーザビリティ向上
- アクションボタンは右端に配置

#### 4. **モーダル設計 / Modal Design**
- 背景オーバーレイで集中効果
- ESCキーで閉じる機能
- フォーカストラッピング (アクセシビリティ)

### ステート管理 / State Management

#### 1. **ローディング状態 / Loading States**
- ボタン: スピナー表示 + 無効化
- テーブル: スケルトンローディング
- ページ全体: プログレスバー

#### 2. **エラー状態 / Error States**
- フィールドエラー: 赤枠 + エラーメッセージ
- 通知エラー: トースト通知
- ページエラー: エラーページ

#### 3. **空状態 / Empty States**
- 親しみやすいイラスト
- 明確な説明文
- 次のアクションへの導線

---

## 💻 コーディング規約 / Coding Standards

### HTML 規約 / HTML Standards

#### 1. **構造的マークアップ / Semantic Markup**
```html
<!-- ✅ Good -->
<article class="member-card">
  <header class="card-header">
    <h3 class="member-name">田中太郎</h3>
  </header>
  <section class="card-body">
    <p class="member-id">ID: M001234</p>
  </section>
</article>

<!-- ❌ Bad -->
<div class="member-card">
  <div class="card-header">
    <div class="member-name">田中太郎</div>
  </div>
</div>
```

#### 2. **アクセシビリティ / Accessibility**
```html
<!-- フォームラベル -->
<label for="email">メールアドレス</label>
<input type="email" id="email" required aria-describedby="email-error">
<div id="email-error" class="form-error" role="alert"></div>

<!-- ボタン -->
<button type="button" aria-label="会員を削除">
  <i class="fas fa-trash" aria-hidden="true"></i>
</button>
```

#### 3. **データ属性 / Data Attributes**
```html
<!-- 機能的なデータ属性 -->
<button data-modal-target="editMemberModal" data-member-id="M001234">編集</button>
<table data-sortable="true" data-filter="true">
<div data-tooltip="会員の詳細情報を表示します">
```

### CSS 規約 / CSS Standards

#### 1. **命名規則 / Naming Convention**
```css
/* BEM命名法を基本とし、機能的な命名を採用 */

/* Block */
.member-card { }

/* Element */
.member-card__header { }
.member-card__name { }
.member-card__actions { }

/* Modifier */
.member-card--highlighted { }
.member-card--disabled { }

/* Utility classes */
.text-center { }
.mb-4 { }
.btn-primary { }
```

#### 2. **プロパティ順序 / Property Order**
```css
.example {
  /* Positioning */
  position: relative;
  top: 0;
  left: 0;
  z-index: 1;
  
  /* Display & Box Model */
  display: flex;
  width: 100%;
  height: auto;
  padding: 1rem;
  margin: 0.5rem;
  
  /* Border & Background */
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background: white;
  
  /* Typography */
  font-family: var(--font-family);
  font-size: 1rem;
  color: var(--gray-900);
  
  /* Other */
  transition: all 0.2s;
}
```

#### 3. **レスポンシブ設計 / Responsive Design**
```css
/* Mobile First Approach */
.component {
  /* Mobile styles (default) */
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .component {
    padding: 1.5rem;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .component {
    padding: 2rem;
  }
}
```

### JavaScript 規約 / JavaScript Standards

#### 1. **命名規則 / Naming Convention**
```javascript
// Variables and functions: camelCase
const memberData = {};
function getMemberInfo() {}

// Constants: UPPER_CASE
const API_ENDPOINT = '/api/v1/members';
const MAX_RETRY_COUNT = 3;

// Classes: PascalCase
class MemberManager {}

// Private methods: _prefix
class MemberManager {
  _validateData() {}
  _formatResponse() {}
}
```

#### 2. **関数設計 / Function Design**
```javascript
// ✅ Good - 単一責任、純粋関数
function formatMemberName(firstName, lastName) {
  return `${lastName} ${firstName}`;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ❌ Bad - 複数の責任
function processUser(user) {
  // validation, formatting, API call all in one
}
```

#### 3. **エラーハンドリング / Error Handling**
```javascript
// APIコール例
async function fetchMemberData(memberId) {
  try {
    const response = await fetch(`/api/members/${memberId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch member data:', error);
    throw error; // 呼び出し元で適切に処理
  }
}

// 使用例
try {
  const member = await fetchMemberData('M001234');
  displayMember(member);
} catch (error) {
  showErrorToast('会員データの取得に失敗しました');
}
```

#### 4. **イベントハンドリング / Event Handling**
```javascript
// ✅ Good - イベント委任
document.addEventListener('click', function(event) {
  if (event.target.matches('[data-modal-target]')) {
    const modalId = event.target.dataset.modalTarget;
    openModal(modalId);
  }
});

// フォームバリデーション
function initializeFormValidation(form) {
  const inputs = form.querySelectorAll('input, select, textarea');
  
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', debounce(() => validateField(input), 300));
  });
}
```

---

## 🏗️ 技術スタック・アーキテクチャ / Technical Stack & Architecture

### フロントエンド技術 / Frontend Technologies
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS + CSS Custom Properties
- **State Management**: React Context + Zustand
- **Form Handling**: React Hook Form + Zod validation
- **HTTP Client**: Fetch API with wrapper utilities

### バックエンド技術 / Backend Technologies
- **Runtime**: Node.js
- **Framework**: Next.js API Routes / Fastify
- **Database**: PostgreSQL with Row Level Security
- **ORM**: Prisma
- **Authentication**: NextAuth.js / JWT
- **File Storage**: AWS S3 / Vercel Blob

### 開発・運用 / Development & Operations
- **Version Control**: Git with Conventional Commits
- **Package Manager**: npm
- **Code Quality**: ESLint + Prettier + Husky
- **Testing**: Jest + React Testing Library
- **Deployment**: Vercel (Frontend) + AWS (Backend)
- **Monitoring**: Vercel Analytics + Sentry

---

## 📊 品質基準・パフォーマンス指標 / Quality Standards & Performance Metrics

### パフォーマンス目標 / Performance Targets
- **初回ページ読み込み**: < 3秒
- **ページ遷移**: < 1秒
- **API レスポンス**: < 500ms
- **Lighthouse スコア**: 90+ (全項目)

### アクセシビリティ基準 / Accessibility Standards
- **WCAG 2.1 AA準拠**
- **キーボードナビゲーション対応**
- **スクリーンリーダー対応**
- **カラーコントラスト比**: 4.5:1以上

### セキュリティ基準 / Security Standards
- **HTTPS 必須**
- **XSS 対策**: CSP実装
- **CSRF 対策**: トークン検証
- **SQLインジェクション対策**: Prisma使用
- **データ暗号化**: 保存時・通信時

### ブラウザ対応 / Browser Support
- **Chrome**: 最新版 + 過去2バージョン
- **Firefox**: 最新版 + 過去2バージョン
- **Safari**: 最新版 + 過去2バージョン
- **Edge**: 最新版 + 過去2バージョン
- **Mobile**: iOS Safari, Chrome Mobile

### テスト基準 / Testing Standards
- **単体テスト**: 80%以上のカバレッジ
- **統合テスト**: 主要ユーザーフロー
- **E2Eテスト**: クリティカルパス
- **アクセシビリティテスト**: 自動 + 手動

---

## 🔄 更新・メンテナンス / Updates & Maintenance

### バージョン管理 / Version Management
- **セマンティックバージョニング**: MAJOR.MINOR.PATCH
- **リリースサイクル**: 2週間スプリント
- **ホットフィックス**: 必要に応じて即座対応

### ドキュメント管理 / Documentation Management
- **設計変更**: このドキュメントを随時更新
- **API仕様**: OpenAPI/Swagger
- **コンポーネント**: Storybook
- **更新履歴**: CHANGELOG.md

---

## 📝 更新履歴 / Update History

| 日付 | バージョン | 更新内容 | 更新者 |
|------|------------|----------|--------|
| 2024-11-27 | 1.0 | 初版作成 - 設計ガイドライン策定 | System |

---

## 📚 関連ドキュメント / Related Documents

- [中核画面開発優先順位](./中核画面開発優先順位-Core_Screen_Development_Priority.md)
- [システム概要設計書](./システム概要設計書-System_Design_Overview.md)
- [フェーズ1実装計画](./フェーズ1実装計画-Phase1_Implementation_Plan.md)
- [統合機能一覧](../feature_lists/ConnectEn_SaaS_統合機能一覧.csv)