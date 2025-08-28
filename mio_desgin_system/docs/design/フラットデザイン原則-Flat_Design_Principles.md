# フラットデザイン原則 / Flat Design Principles

## 🎨 ConnectEn SaaS フラットモダンデザイン仕様

### デザインコンセプト / Design Concept

**"Essential Simplicity"** - 必要不可欠な要素のみで構成し、ユーザーが迷わないクリーンで機能的なインターフェース

---

## 🚫 禁止事項 / Prohibited Elements

### 1. グラデーション全面禁止
```css
/* ❌ 使用禁止 */
background: linear-gradient(45deg, #2563eb, #1d4ed8);
background: radial-gradient(circle, #2563eb, #1d4ed8);
border-image: linear-gradient(45deg, red, blue) 1;

/* ✅ 代替手法 */
background: var(--primary-color);        /* フラットな単色 */
border: 2px solid var(--primary-color);  /* シンプルなボーダー */
```

### 2. 装飾的シャドウ・エフェクト禁止
```css
/* ❌ 使用禁止 */
box-shadow: 0 0 20px rgba(37, 99, 235, 0.5);           /* グロー効果 */
box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);        /* インセットシャドウ */
text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);           /* テキストシャドウ */
filter: drop-shadow(0 4px 8px rgba(37, 99, 235, 0.3));  /* ドロップシャドウ */

/* ✅ 許可されるシャドウ */
box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);             /* 機能的な軽い影のみ */
```

### 3. 過度なアニメーション・トランジション禁止
```css
/* ❌ 使用禁止 */
transform: scale(1.1) rotate(5deg);                     /* 複合変形 */
animation: bounce 2s infinite;                          /* 派手なアニメーション */
transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55); /* 複雑なイージング */

/* ✅ 許可される範囲 */
transition: background-color 0.2s ease;                 /* シンプルな色変化 */
transform: translateX(4px);                             /* 微細な移動のみ */
```

---

## ✅ 推奨手法 / Recommended Approaches

### 1. カラー戦略 - 80-15-5 ルール

#### 80%: ニュートラルカラー（基盤）- 白要素強調方針
```css
/* メインで使用するカラー（白要素を強調したクリーンな配色） */
--white: #ffffff;       /* 純粋な白 - 全体統一 */
--gray-50: #fafbfc;     /* より白に近い背景 */
--gray-100: #f5f7fa;    /* 薄いグレー - カード背景 */
--gray-200: #eef1f5;    /* 明るいボーダー色 */
--gray-700: #2d3748;    /* メインテキスト */
```

**白要素優位の配色戦略:**
- 全体のベース色を純粋な白 (`#ffffff`) に統一
- グレーの彩度を抑え、より白に寄せた色調を採用
- カード・フォーム・テーブルなど主要UI要素は完全な白背景
- コンテンツエリアのみ極薄グレー (`--gray-50`) で区別
- シャドウは最小限 (`rgba(0,0,0,0.06)`) でクリーンな印象を維持

#### 15%: プライマリーカラー（ブランド・重要要素）
```css
/* 重要な要素にのみ使用 */
.primary-button { background: var(--primary-color); }
.active-nav-item { color: var(--primary-color); }
.logo { color: var(--primary-color); }

/* ❌ 過度な使用例 */
.decorative-border { border: 2px solid var(--primary-color); }  /* 装飾目的は禁止 */
```

#### 5%: ファンクショナルカラー（状態表示）
```css
/* システムフィードバック専用 */
.success-message { color: var(--success-color); }
.error-alert { background: var(--error-color); }
.warning-badge { background: var(--warning-color); }
```

### 2. 立体感の表現 - ミニマルシャドウ

```css
/* レイヤー別シャドウ仕様 */
.card { 
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);    /* レベル1: カード */
}

.dropdown {
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 0.07);  /* レベル2: ドロップダウン */
}

.modal {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);   /* レベル3: モーダル */
}
```

### 3. ボタン階層システム

#### Primary Button（1画面1個まで）
```css
.btn-primary {
  background: var(--primary-color);
  color: white;
  border: none;
  /* 装飾なし、機能重視 */
}

.btn-primary:hover {
  background: var(--primary-hover);
  /* transform・シャドウ効果なし */
}
```

#### Secondary Button（控えめスタイル）
```css
.btn-secondary {
  background: white;
  color: var(--gray-700);
  border: 1px solid var(--gray-300);
}

.btn-secondary:hover {
  background: var(--gray-50);
  border-color: var(--gray-400);
}
```

#### Tertiary Button（最小限）
```css
.btn-tertiary {
  background: transparent;
  color: var(--gray-500);
  border: none;
}

.btn-tertiary:hover {
  background: var(--gray-100);
  color: var(--gray-700);
}
```

---

## 📐 レイアウト原則 / Layout Principles

### 1. ホワイトスペース活用
```css
/* 適切な余白の設定 */
.section { margin-bottom: 3rem; }        /* セクション間 */
.card-body { padding: 1.5rem; }         /* カード内部 */
.form-group { margin-bottom: 1rem; }    /* フォーム要素間 */
```

### 2. タイポグラフィ階層
```css
/* 明確な視覚階層 */
.page-title {
  font-size: 1.875rem;    /* 30px */
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.25rem;     /* 20px */
  font-weight: 600;
  color: var(--gray-800);
  margin-bottom: 1rem;
}

.body-text {
  font-size: 1rem;        /* 16px */
  font-weight: 400;
  color: var(--gray-700);
  line-height: 1.5;
}
```

### 3. アイコンスタイル
```css
/* アイコンの統一ルール */
.icon {
  font-size: 1.125rem;                    /* 18px統一 */
  color: var(--gray-500);                 /* 控えめな色 */
}

.icon-primary {
  color: var(--primary-color);            /* 重要な場合のみ */
}

.icon-button {
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  border-radius: 0.25rem;
}

.icon-button:hover {
  background: var(--gray-100);            /* シンプルなホバー */
}
```

---

## 🎯 ポイントカラー配置戦略 / Point Color Strategy

### 主要CTA（Call to Action）にのみ使用
```html
<!-- ✅ 適切な使用例 -->
<button class="btn btn-primary">会員登録</button>           <!-- メイン操作 -->
<button class="btn btn-primary">保存</button>               <!-- 重要な保存操作 -->
<a href="#" class="nav-link active">会員管理</a>            <!-- アクティブナビ -->

<!-- ❌ 避けるべき使用例 -->
<div class="decorative-line"></div>                         <!-- 装飾要素 -->
<button class="btn btn-primary">詳細</button>               <!-- 軽微な操作 -->
<button class="btn btn-primary">キャンセル</button>          <!-- 否定的な操作 -->
```

### 状態表示でのポイントカラー活用
```html
<!-- システムフィードバック -->
<span class="badge badge-success">アクティブ</span>          <!-- 成功状態 -->
<span class="badge badge-error">エラー</span>               <!-- エラー状態 -->
<div class="alert alert-warning">注意が必要です</div>        <!-- 警告 -->
```

---

## 🔍 品質チェックリスト / Quality Checklist

### デザイン確認項目
- [ ] グラデーション・装飾的シャドウが使用されていないか
- [ ] Primary colorが1画面に1個以下で使用されているか
- [ ] ニュートラルカラーが全体の80%を占めているか
- [ ] ボタン階層が明確に区別されているか
- [ ] 十分なホワイトスペースが確保されているか

### コード確認項目
- [ ] CSS変数を正しく使用しているか
- [ ] 禁止されたプロパティ（gradients等）を使用していないか
- [ ] シャドウがレベル1-3の範囲内に収まっているか
- [ ] アニメーションが控えめ（0.2s以下）か
- [ ] アクセシビリティに配慮されているか

---

## 📱 レスポンシブ対応 / Responsive Design

### モバイルファーストアプローチ
```css
/* Mobile (デフォルト) */
.component {
  padding: 1rem;
  font-size: 0.875rem;
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .component {
    padding: 1.5rem;
    font-size: 1rem;
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .component {
    padding: 2rem;
    font-size: 1rem;
  }
}
```

---

## 🎨 実装例 / Implementation Examples

### フラットデザインカード
```html
<div class="card-flat">
  <div class="card-header-flat">
    <h3 class="card-title">会員情報</h3>
  </div>
  <div class="card-body-flat">
    <p class="text-body">田中太郎（ID: M001234）</p>
    <div class="card-actions">
      <button class="btn btn-primary">編集</button>
      <button class="btn btn-secondary">履歴</button>
    </div>
  </div>
</div>
```

```css
.card-flat {
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);    /* 最小限のシャドウ */
}

.card-header-flat {
  padding: 1.5rem 1.5rem 0;
  border-bottom: none;                           /* 装飾的ボーダーなし */
}

.card-body-flat {
  padding: 1.5rem;
}
```

この設計原則により、**視覚的ノイズを最小限に抑え、ユーザーが本当に必要な情報と操作に集中できるインターフェース**を実現します。