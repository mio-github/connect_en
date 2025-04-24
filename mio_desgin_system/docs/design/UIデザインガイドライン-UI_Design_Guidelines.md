# ConnectEn - UIデザインガイドライン
# ConnectEn - UI Design Guidelines

このドキュメントでは、ConnectEnアプリケーションの一貫したユーザーインターフェース設計のためのガイドラインを提供します。すべての新機能開発やUI改善は、これらのガイドラインに従って実装してください。

This document provides guidelines for consistent user interface design in the ConnectEn application. All new feature development and UI improvements should be implemented following these guidelines.

## 1. 基本レイアウト構造
## 1. Basic Layout Structure

### 1.1 グローバルレイアウト
### 1.1 Global Layout

ConnectEnは以下の一貫したレイアウト構造を採用しています：

ConnectEn adopts the following consistent layout structure:

- **固定サイドバー**: 画面左側に常に表示され、主要機能へのナビゲーションを提供
- **固定ヘッダー**: 画面上部に常に表示され、ユーザー情報と通知機能を提供
- **メインコンテンツエリア**: 可変領域で、現在選択されている機能の内容を表示

- **Fixed Sidebar**: Always displayed on the left side of the screen, providing navigation to main functions
- **Fixed Header**: Always displayed at the top of the screen, providing user information and notification functions
- **Main Content Area**: Variable area displaying the content of the currently selected function

```jsx
<div className="flex min-h-screen bg-gray-50">
  {/* 固定位置のサイドバー */}
  <div className="fixed left-0 top-0 h-full">
    <Sidebar />
  </div>
  
  {/* メインコンテンツエリア */}
  <div className="flex-1 ml-64">
    {/* 固定位置のヘッダー */}
    <div className="fixed top-0 right-0 left-64 z-10">
      <Header />
    </div>
    
    {/* メインコンテンツ */}
    <main className="pt-16 p-6">
      {/* ページコンテンツ */}
    </main>
  </div>
</div>
```

### 1.2 ページヘッダー
### 1.2 Page Header

各ページの内容の上部には、一貫したヘッダー部分を配置します：

At the top of each page content, place a consistent header section:

```jsx
<div className="mb-8">
  <h1 className="text-3xl font-bold">{ページタイトル}</h1>
  <p className="text-gray-600">{ページの簡単な説明}</p>
</div>
```

### 1.3 アクションボタン配置
### 1.3 Action Button Placement

- **プライマリアクション**: 画面右上または関連コンテンツの下部に配置
- **セカンダリアクション**: プライマリアクションの横か、若干目立たない位置に配置
- **キャンセル/戻る**: 通常左側に配置し、ユーザーの期待に沿う動作を提供

- **Primary Action**: Placed at the top right or bottom of related content
- **Secondary Action**: Placed next to the primary action or in a slightly less prominent position
- **Cancel/Back**: Usually placed on the left side, providing behavior in line with user expectations

## 2. コンポーネント使用ガイドライン
## 2. Component Usage Guidelines

### 2.1 カード (Card)
### 2.1 Card

情報のグループ化や視覚的階層を作るために、Cardコンポーネントを使用します。

Use the Card component to group information and create visual hierarchy.

```jsx
<Card>
  <div className="card-content">
    {/* カード内のコンテンツ */}
  </div>
</Card>
```

使用例：
- ダッシュボードの統計情報
- 一覧表示のコンテナ
- フォームセクション

Usage examples:
- Dashboard statistics
- List view containers
- Form sections

### 2.2 ボタン (Button)
### 2.2 Button

アクションを表すために一貫したボタンスタイルを使用します。

Use consistent button styles to represent actions.

- **プライマリボタン**: 主要なアクションに使用（青色）
- **セカンダリボタン**: 補助的なアクションに使用（グレー）
- **アウトラインボタン**: 低優先度のアクションに使用（枠線のみ）
- **テキストボタン**: 最も優先度の低いアクションに使用（テキストのみ）

- **Primary Button**: Used for main actions (blue)
- **Secondary Button**: Used for supplementary actions (gray)
- **Outline Button**: Used for lower priority actions (outline only)
- **Text Button**: Used for the lowest priority actions (text only)

サイズ：
- Small: 小さいスペースや表内のアクションに
- Medium: 標準的なボタンサイズ（デフォルト）
- Large: 重要なアクションや呼び出しに

Sizes:
- Small: For small spaces or actions within tables
- Medium: Standard button size (default)
- Large: For important actions or calls to action

### 2.3 入力フォーム (Input Forms)
### 2.3 Input Forms

すべての入力要素は以下のパターンに従います：

All input elements follow this pattern:

```jsx
<div className="space-y-4">
  <Input
    label="ラベル"
    name="fieldName"
    value={value}
    onChange={handleChange}
    required={true}
    error={errors.fieldName}
  />
</div>
```

- ラベルは必須
- エラーメッセージは入力フィールドの下に赤字で表示
- 必須フィールドは視覚的に識別可能に

- Labels are required
- Error messages displayed in red below the input field
- Required fields should be visually identifiable

### 2.4 テーブル (Tables)
### 2.4 Tables

データ一覧を表示する場合は一貫したテーブルデザインを使用します：

Use consistent table design when displaying data lists:

```jsx
<div className="overflow-x-auto">
  <table className="min-w-full">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">列ヘッダー1</th>
        {/* 他の列ヘッダー */}
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {items.map((item) => (
        <tr key={item.id} className="hover:bg-gray-50">
          <td className="px-4 py-3 text-sm">{item.property1}</td>
          {/* 他のセル */}
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

- ゼブラストライプやホバー効果で行の区別を明確に
- アクションは行の右端に配置
- ページネーションはテーブルの下部に配置

- Use zebra stripes or hover effects to clearly distinguish rows
- Place actions at the right end of rows
- Place pagination at the bottom of the table

## 3. 画面タイプ別デザインパターン
## 3. Design Patterns by Screen Type

### 3.1 ダッシュボード画面
### 3.1 Dashboard Screen

ダッシュボード画面は以下の構成に従います：

Dashboard screens follow this structure:

1. **概要指標カード**: 上部に横並びで重要な指標を表示
2. **メインセクション**: 中央部分にグラフや主要データを表示
3. **サブセクション**: 下部に補足情報やアクティビティログを表示

1. **Overview Metric Cards**: Display important metrics side by side at the top
2. **Main Section**: Display graphs and primary data in the central part
3. **Sub-Section**: Display supplementary information or activity logs at the bottom

### 3.2 一覧表示画面（会員管理など）
### 3.2 List View Screens (e.g., Member Management)

一覧表示画面は以下の構成に従います：

List view screens follow this structure:

1. **検索・フィルターセクション**: 上部に検索ボックスとフィルターを配置
2. **アクションボタン**: 必要に応じて「新規作成」などのボタンを配置
3. **データテーブル**: メインコンテンツとしてデータを表形式で表示
4. **ページネーション**: 下部にページ切り替えコントロールを配置

1. **Search/Filter Section**: Place search box and filters at the top
2. **Action Buttons**: Place buttons such as "Create New" as needed
3. **Data Table**: Display data in tabular format as main content
4. **Pagination**: Place page switching controls at the bottom

### 3.3 詳細表示画面
### 3.3 Detail View Screens

詳細表示画面は以下の構成に従います：

Detail view screens follow this structure:

1. **ヘッダー情報**: 上部に主要情報と操作ボタンを配置
2. **詳細情報**: カードを使用して論理的にグループ化された情報を表示
3. **タブ（オプション）**: 多量の情報がある場合はタブで整理
4. **関連情報**: 必要に応じて下部に関連するデータを表示

1. **Header Information**: Place main information and operation buttons at the top
2. **Detailed Information**: Display logically grouped information using cards
3. **Tabs (Optional)**: Organize with tabs if there is a large amount of information
4. **Related Information**: Display related data at the bottom as needed

### 3.4 フォーム画面
### 3.4 Form Screens

フォーム画面は以下の構成に従います：

Form screens follow this structure:

1. **フォームヘッダー**: 目的と簡単な説明
2. **入力セクション**: 論理的にグループ化された入力フィールド
3. **アクションボタン**: 下部に送信・キャンセルボタンを配置
4. **バリデーション**: インラインでのエラー表示と送信前の検証

1. **Form Header**: Purpose and brief explanation
2. **Input Sections**: Logically grouped input fields
3. **Action Buttons**: Place submit and cancel buttons at the bottom
4. **Validation**: Display errors inline and validate before submission

## 4. レスポンシブデザイン
## 4. Responsive Design

全画面は以下のブレイクポイントでレスポンシブに対応します：

All screens respond responsively at the following breakpoints:

- **モバイル**: 640px未満
- **タブレット**: 641px〜1024px
- **デスクトップ**: 1025px以上

- **Mobile**: Under 640px
- **Tablet**: 641px to 1024px
- **Desktop**: Above 1025px

### 4.1 モバイル対応ガイドライン
### 4.1 Mobile Adaptation Guidelines

- サイドバーは折りたたみ可能なドロワーメニューに
- テーブルはスクロール可能か、代替レイアウトを提供
- フォームは縦長の単一カラムで表示
- タッチ操作に適したサイズでインタラクティブ要素を設計

- Sidebar becomes a collapsible drawer menu
- Tables are scrollable or provide alternative layouts
- Forms are displayed in a single vertical column
- Design interactive elements at sizes suitable for touch operation

## 5. 色彩・タイポグラフィ
## 5. Colors and Typography

### 5.1 カラーパレット
### 5.1 Color Palette

- **プライマリカラー**: #3B82F6 (青)
- **セカンダリカラー**: #6B7280 (グレー)
- **アクセントカラー**: #8B5CF6 (紫)
- **成功**: #10B981 (緑)
- **警告**: #F59E0B (黄)
- **エラー**: #EF4444 (赤)
- **背景**: #F9FAFB (薄いグレー)

- **Primary Color**: #3B82F6 (blue)
- **Secondary Color**: #6B7280 (gray)
- **Accent Color**: #8B5CF6 (purple)
- **Success**: #10B981 (green)
- **Warning**: #F59E0B (yellow)
- **Error**: #EF4444 (red)
- **Background**: #F9FAFB (light gray)

### 5.2 タイポグラフィ
### 5.2 Typography

- **基本フォント**: Inter, sans-serif
- **見出し**: 太字、サイズは階層に応じて調整
- **本文**: 標準的な読みやすさを重視したウェイトとサイズ
- **ラベル・注釈**: やや小さめのサイズで視覚的階層を作成

- **Base Font**: Inter, sans-serif
- **Headings**: Bold, size adjusted according to hierarchy
- **Body Text**: Weight and size emphasizing standard readability
- **Labels/Annotations**: Create visual hierarchy with slightly smaller sizes

## 6. アイコンと視覚要素
## 6. Icons and Visual Elements

- **アイコン**: 一貫したアイコンセットを使用（Heroiconsを推奨）
- **イラスト**: アプリケーションのブランドに沿ったスタイルで
- **空の状態**: データがない場合は適切なビジュアルとメッセージを表示
- **ローディング状態**: 一貫したローディングインジケータを使用

- **Icons**: Use a consistent icon set (Heroicons recommended)
- **Illustrations**: In a style aligned with the application's brand
- **Empty States**: Display appropriate visuals and messages when no data is available
- **Loading States**: Use consistent loading indicators

## 7. アクセシビリティ
## 7. Accessibility

- **色のコントラスト**: WCAG AAレベル以上のコントラスト比を確保
- **キーボードナビゲーション**: すべての機能がキーボードでアクセス可能に
- **スクリーンリーダー対応**: 適切なaria属性とセマンティックHTML
- **フォーカス表示**: インタラクティブ要素の明確なフォーカス状態

- **Color Contrast**: Ensure contrast ratio at WCAG AA level or higher
- **Keyboard Navigation**: Make all functions accessible by keyboard
- **Screen Reader Support**: Appropriate aria attributes and semantic HTML
- **Focus Display**: Clear focus state for interactive elements

## 8. 新機能開発のチェックリスト
## 8. Checklist for New Feature Development

新しい画面や機能を開発する際は、以下の点を確認してください：

When developing new screens or features, please check the following points:

- [ ] 基本レイアウト構造に準拠しているか
- [ ] 適切なコンポーネントを選択しているか
- [ ] 画面タイプに応じたデザインパターンを適用しているか
- [ ] すべてのブレイクポイントでレスポンシブ対応しているか
- [ ] 色彩・タイポグラフィが一貫しているか
- [ ] アイコンと視覚要素が統一されているか
- [ ] アクセシビリティに配慮しているか

- [ ] Does it conform to the basic layout structure?
- [ ] Have appropriate components been selected?
- [ ] Has the design pattern appropriate for the screen type been applied?
- [ ] Is it responsive at all breakpoints?
- [ ] Are colors and typography consistent?
- [ ] Are icons and visual elements unified?
- [ ] Has accessibility been considered? 