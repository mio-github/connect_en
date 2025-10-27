# カラー使用例ガイド

**参照**: DESIGN_POLICY.md
**対象**: 全モックアップ開発者

---

## 🎨 実装パターン集

### 1. ボタン実装

#### Primary Button（主要アクション）
```tsx
// 保存、送信、確定、登録、予約
<button className="bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white font-medium px-4 py-2 rounded-lg transition-colors">
  保存する
</button>

// サイズバリエーション
<button className="bg-primary-500 hover:bg-primary-600 text-white px-3 py-1.5 text-sm rounded-md">
  小サイズ
</button>
<button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 text-lg rounded-lg">
  大サイズ
</button>
```

#### Secondary Button（補助アクション）
```tsx
// キャンセル、戻る、閉じる
<button className="bg-secondary-500 hover:bg-secondary-600 text-white font-medium px-4 py-2 rounded-lg transition-colors">
  キャンセル
</button>

// アウトラインバージョン
<button className="border-2 border-secondary-500 text-secondary-700 hover:bg-secondary-50 font-medium px-4 py-2 rounded-lg transition-colors">
  戻る
</button>
```

#### Success Button（承認アクション）
```tsx
// 承認、完了確認、公開
<button className="bg-success-500 hover:bg-success-600 text-white font-medium px-4 py-2 rounded-lg transition-colors">
  承認する
</button>
```

#### Warning Button（警告アクション）
```tsx
// 一時保存、保留
<button className="bg-warning-500 hover:bg-warning-600 text-white font-medium px-4 py-2 rounded-lg transition-colors">
  保留にする
</button>
```

#### Danger Button（危険なアクション）
```tsx
// 削除、キャンセル、拒否
<button className="bg-danger-500 hover:bg-danger-600 text-white font-medium px-4 py-2 rounded-lg transition-colors">
  削除する
</button>

// アウトラインバージョン（慎重な操作）
<button className="border-2 border-danger-500 text-danger-600 hover:bg-danger-50 font-medium px-4 py-2 rounded-lg transition-colors">
  削除
</button>
```

#### Ghost Button（サブアクション）
```tsx
// 詳細を見る、オプション
<button className="border border-neutral-300 text-neutral-700 hover:bg-neutral-50 font-medium px-4 py-2 rounded-lg transition-colors">
  詳細を見る
</button>
```

---

### 2. ステータスバッジ

#### 成功・完了ステータス
```tsx
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
  予約確定
</span>

<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
  ✓ 支払い完了
</span>
```

#### 保留・待機ステータス
```tsx
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-100 text-warning-800">
  予約待ち
</span>

<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-100 text-warning-800">
  ⚠ 審査中
</span>
```

#### キャンセル・エラーステータス
```tsx
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-danger-100 text-danger-800">
  予約キャンセル
</span>

<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-danger-100 text-danger-800">
  ✕ 支払い失敗
</span>
```

#### 情報・通知ステータス
```tsx
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-info-100 text-info-800">
  新着
</span>

<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-info-100 text-info-800">
  ⓘ お知らせ
</span>
```

#### 非アクティブステータス
```tsx
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-600">
  下書き
</span>

<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-600">
  無効
</span>
```

---

### 3. アラート・通知

#### Success Alert
```tsx
<div className="bg-success-50 border-l-4 border-success-500 p-4 rounded-r-lg">
  <div className="flex items-start">
    <div className="flex-shrink-0">
      <svg className="h-5 w-5 text-success-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
      </svg>
    </div>
    <div className="ml-3">
      <p className="text-sm font-medium text-success-800">
        保存に成功しました
      </p>
    </div>
  </div>
</div>
```

#### Info Alert
```tsx
<div className="bg-info-50 border-l-4 border-info-500 p-4 rounded-r-lg">
  <div className="flex items-start">
    <div className="flex-shrink-0">
      <svg className="h-5 w-5 text-info-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
      </svg>
    </div>
    <div className="ml-3">
      <p className="text-sm font-medium text-info-800">
        新しい機能が追加されました
      </p>
    </div>
  </div>
</div>
```

#### Warning Alert
```tsx
<div className="bg-warning-50 border-l-4 border-warning-500 p-4 rounded-r-lg">
  <div className="flex items-start">
    <div className="flex-shrink-0">
      <svg className="h-5 w-5 text-warning-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
      </svg>
    </div>
    <div className="ml-3">
      <p className="text-sm font-medium text-warning-800">
        期限が近づいています
      </p>
    </div>
  </div>
</div>
```

#### Error Alert
```tsx
<div className="bg-danger-50 border-l-4 border-danger-500 p-4 rounded-r-lg">
  <div className="flex items-start">
    <div className="flex-shrink-0">
      <svg className="h-5 w-5 text-danger-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
      </svg>
    </div>
    <div className="ml-3">
      <p className="text-sm font-medium text-danger-800">
        エラーが発生しました
      </p>
    </div>
  </div>
</div>
```

---

### 4. フォームバリデーション

#### 成功状態
```tsx
<div className="mb-4">
  <label className="block text-sm font-medium text-neutral-700 mb-2">
    メールアドレス
  </label>
  <input
    type="email"
    className="w-full px-3 py-2 border-2 border-success-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-success-500"
    placeholder="email@example.com"
  />
  <p className="mt-1 text-sm text-success-600">✓ 有効なメールアドレスです</p>
</div>
```

#### エラー状態
```tsx
<div className="mb-4">
  <label className="block text-sm font-medium text-neutral-700 mb-2">
    メールアドレス <span className="text-danger-500">*</span>
  </label>
  <input
    type="email"
    className="w-full px-3 py-2 border-2 border-danger-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-danger-500"
    placeholder="email@example.com"
  />
  <p className="mt-1 text-sm text-danger-600">✕ 有効なメールアドレスを入力してください</p>
</div>
```

#### 通常状態
```tsx
<div className="mb-4">
  <label className="block text-sm font-medium text-neutral-700 mb-2">
    メールアドレス
  </label>
  <input
    type="email"
    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
    placeholder="email@example.com"
  />
</div>
```

---

### 5. カード・パネル

#### 基本カード
```tsx
<div className="bg-white rounded-lg shadow-md p-6 border border-neutral-200">
  <h3 className="text-lg font-bold text-neutral-900 mb-2">カードタイトル</h3>
  <p className="text-neutral-700">カードコンテンツ</p>
</div>
```

#### ハイライトカード（Primary）
```tsx
<div className="bg-primary-50 rounded-lg shadow-md p-6 border-2 border-primary-500">
  <h3 className="text-lg font-bold text-primary-900 mb-2">おすすめプラン</h3>
  <p className="text-primary-700">特別価格で提供中</p>
</div>
```

#### 警告カード
```tsx
<div className="bg-warning-50 rounded-lg shadow-md p-6 border-l-4 border-warning-500">
  <h3 className="text-lg font-bold text-warning-900 mb-2">注意事項</h3>
  <p className="text-warning-700">期限が近づいています</p>
</div>
```

---

### 6. テーブル

#### ストライプテーブル
```tsx
<table className="min-w-full divide-y divide-neutral-200">
  <thead className="bg-neutral-50">
    <tr>
      <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
        名前
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
        ステータス
      </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-neutral-200">
    <tr className="hover:bg-neutral-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
        山田太郎
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 py-1 bg-success-100 text-success-800 rounded-full text-xs">
          確定
        </span>
      </td>
    </tr>
    <tr className="hover:bg-neutral-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
        佐藤花子
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 py-1 bg-warning-100 text-warning-800 rounded-full text-xs">
          保留
        </span>
      </td>
    </tr>
  </tbody>
</table>
```

---

### 7. 通知バッジ

```tsx
// 未読通知
<button className="relative">
  <span>通知</span>
  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-danger-500 text-white text-xs font-bold">
    3
  </span>
</button>

// 新着バッジ
<span className="ml-2 px-2 py-0.5 bg-info-500 text-white text-xs font-bold rounded">
  NEW
</span>
```

---

### 8. プログレスバー

#### 成功プログレス
```tsx
<div className="w-full bg-neutral-200 rounded-full h-2.5">
  <div className="bg-success-500 h-2.5 rounded-full" style={{width: '75%'}}></div>
</div>
<p className="text-sm text-neutral-600 mt-1">75% 完了</p>
```

#### 警告プログレス
```tsx
<div className="w-full bg-neutral-200 rounded-full h-2.5">
  <div className="bg-warning-500 h-2.5 rounded-full" style={{width: '45%'}}></div>
</div>
<p className="text-sm text-warning-700 mt-1">残り55%</p>
```

---

## 🎯 画面別推奨カラー

### 会員ログイン・登録
- **Primary**: ログインボタン、会員登録ボタン
- **Secondary**: キャンセル、戻る
- **Danger**: 必須項目マーク、エラーメッセージ

### ダッシュボード
- **Primary**: 主要KPI、重要アクション
- **Success**: 達成指標、成長率（正）
- **Warning**: 注意すべき指標
- **Danger**: 危険な指標、減少率

### 予約管理
- **Success**: 予約確定、空き席あり
- **Warning**: 残席わずか、予約待ち
- **Danger**: 満席、キャンセル済み
- **Info**: 新着予約

### 支払い管理
- **Success**: 支払い完了
- **Warning**: 支払い保留、期限間近
- **Danger**: 支払い失敗、未払い
- **Primary**: 決済ボタン

---

**このガイドを参照して、一貫性のあるカラー使用を心がけてください。**
