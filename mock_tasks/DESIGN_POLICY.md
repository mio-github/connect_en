# ConnectEn デザインポリシー

**バージョン**: 1.0
**最終更新**: 2025-10-27

---

## 🎨 カラーシステム

### 基本原則
ConnectEnのカラーシステムは、**直感的で一貫性のあるユーザー体験**を提供するために設計されています。各色には明確な役割があり、全ての画面で統一されています。

---

## 📊 カラーパレット定義

### 1. プライマリーカラー（Primary）
**役割**: ブランドアイデンティティ、主要アクション

```css
Primary Blue
- Default: #3B82F6 (blue-500)
- Hover: #2563EB (blue-600)
- Active: #1D4ED8 (blue-700)
- Light: #DBEAFE (blue-50)
- Text: #1E40AF (blue-800)
```

**使用例**:
- メインの実行ボタン（保存、送信、確定）
- 選択中のタブ・ナビゲーション
- アクティブなリンク
- 重要な情報の強調

**適用画面**:
- 全画面共通

---

### 2. セカンダリーカラー（Secondary）
**役割**: 補助的なアクション、情報表示

```css
Slate Gray
- Default: #64748B (slate-500)
- Hover: #475569 (slate-600)
- Light: #F1F5F9 (slate-100)
- Text: #334155 (slate-700)
```

**使用例**:
- サブボタン（キャンセル、戻る）
- 非アクティブな要素
- 背景色
- セクション区切り

**適用画面**:
- 全画面共通

---

### 3. サクセスカラー（Success）
**役割**: 成功、完了、承認

```css
Success Green
- Default: #10B981 (green-500)
- Hover: #059669 (green-600)
- Light: #D1FAE5 (green-100)
- Background: #ECFDF5 (green-50)
```

**使用例**:
- 成功メッセージ
- 完了ステータス
- 支払い済み表示
- 在庫あり表示
- チェックマーク

**適用画面**:
- 決済完了画面
- ステータス表示（予約確定、支払い済み）
- フォーム送信成功

---

### 4. ワーニングカラー（Warning）
**役割**: 注意喚起、保留中

```css
Warning Orange
- Default: #F59E0B (amber-500)
- Hover: #D97706 (amber-600)
- Light: #FEF3C7 (amber-100)
- Background: #FFFBEB (amber-50)
```

**使用例**:
- 警告メッセージ
- 保留中ステータス
- 在庫少表示
- 期限が近い通知

**適用画面**:
- 支払い保留
- 予約待ち状態
- 期限アラート

---

### 5. デンジャーカラー（Danger）
**役割**: エラー、削除、キャンセル

```css
Danger Red
- Default: #EF4444 (red-500)
- Hover: #DC2626 (red-600)
- Light: #FEE2E2 (red-100)
- Background: #FEF2F2 (red-50)
```

**使用例**:
- エラーメッセージ
- 削除ボタン
- キャンセル済みステータス
- バリデーションエラー
- 必須項目マーク

**適用画面**:
- フォームバリデーション
- エラーページ
- 削除確認ダイアログ
- キャンセル処理

---

### 6. インフォカラー（Info）
**役割**: 情報、ヒント、ガイダンス

```css
Info Cyan
- Default: #06B6D4 (cyan-500)
- Hover: #0891B2 (cyan-600)
- Light: #CFFAFE (cyan-100)
- Background: #ECFEFF (cyan-50)
```

**使用例**:
- 情報メッセージ
- ツールチップ
- ヘルプテキスト
- 新機能バッジ

**適用画面**:
- ヘルプセクション
- ガイダンス表示
- お知らせ

---

### 7. ニュートラルカラー（Neutral）
**役割**: テキスト、背景、境界線

```css
Gray Scale
- Text Dark: #111827 (gray-900)
- Text Default: #374151 (gray-700)
- Text Light: #6B7280 (gray-500)
- Border: #D1D5DB (gray-300)
- Background: #F9FAFB (gray-50)
- White: #FFFFFF
```

**使用例**:
- 本文テキスト
- 見出し
- カード背景
- ページ背景
- 境界線

**適用画面**:
- 全画面共通

---

## 🎯 使用ガイドライン

### ボタンのカラー使用

| ボタンタイプ | カラー | 使用場面 |
|-------------|--------|----------|
| **Primary** | Blue | 保存、送信、確定、登録、予約 |
| **Secondary** | Gray | キャンセル、戻る、閉じる |
| **Success** | Green | 承認、完了確認、公開 |
| **Warning** | Orange | 一時保存、保留、警告実行 |
| **Danger** | Red | 削除、キャンセル、拒否 |
| **Ghost** | Transparent + Border | サブアクション、オプション |

### ステータスバッジのカラー

| ステータス | カラー | 表示例 |
|-----------|--------|--------|
| **確定・完了** | Green | 予約確定、支払い完了、レッスン終了 |
| **保留・待機** | Orange | 予約待ち、支払い保留、審査中 |
| **キャンセル・エラー** | Red | 予約キャンセル、支払い失敗、欠席 |
| **情報・通知** | Cyan | 新着、お知らせ、ヒント |
| **非アクティブ** | Gray | 過去、無効、下書き |

### 通知・アラートのカラー

| 通知タイプ | カラー | アイコン | 使用場面 |
|-----------|--------|---------|----------|
| **Success** | Green | ✓ | 処理成功、保存完了 |
| **Info** | Cyan | ⓘ | 情報提供、ガイダンス |
| **Warning** | Orange | ⚠ | 注意事項、確認依頼 |
| **Error** | Red | ✕ | エラー、失敗 |

---

## 🖌️ 実装例

### ボタンコンポーネント

```typescript
// Primary Button
<Button variant="primary">保存する</Button>
// bg-blue-500 hover:bg-blue-600 text-white

// Secondary Button
<Button variant="secondary">キャンセル</Button>
// bg-gray-500 hover:bg-gray-600 text-white

// Success Button
<Button variant="success">承認する</Button>
// bg-green-500 hover:bg-green-600 text-white

// Warning Button
<Button variant="warning">保留にする</Button>
// bg-amber-500 hover:bg-amber-600 text-white

// Danger Button
<Button variant="danger">削除する</Button>
// bg-red-500 hover:bg-red-600 text-white

// Ghost Button
<Button variant="ghost">詳細を見る</Button>
// border border-gray-300 hover:bg-gray-50
```

### ステータスバッジ

```typescript
// Success Status
<span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
  確定
</span>

// Warning Status
<span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
  保留
</span>

// Danger Status
<span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm">
  キャンセル
</span>

// Info Status
<span className="px-2 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm">
  新着
</span>
```

### アラート・通知

```typescript
// Success Alert
<div className="bg-green-50 border-l-4 border-green-500 p-4">
  <p className="text-green-800">保存に成功しました</p>
</div>

// Info Alert
<div className="bg-cyan-50 border-l-4 border-cyan-500 p-4">
  <p className="text-cyan-800">新しい機能が追加されました</p>
</div>

// Warning Alert
<div className="bg-amber-50 border-l-4 border-amber-500 p-4">
  <p className="text-amber-800">期限が近づいています</p>
</div>

// Error Alert
<div className="bg-red-50 border-l-4 border-red-500 p-4">
  <p className="text-red-800">エラーが発生しました</p>
</div>
```

---

## 🚫 禁止事項

### やってはいけないこと

1. **複数の意味で同じ色を使用しない**
   - ❌ 削除ボタンに緑色（成功色）を使用
   - ❌ 保存ボタンに赤色（危険色）を使用

2. **カスタムカラーの追加禁止**
   - ❌ 独自の紫色、ピンク色などを定義
   - ✅ 定義済みのカラーパレットのみ使用

3. **コントラスト不足**
   - ❌ 薄い灰色の背景に薄い青色のテキスト
   - ✅ WCAG AAレベル以上のコントラスト比を維持

4. **過度な色の使用**
   - ❌ 1つの画面に5色以上のアクセントカラー
   - ✅ Primary + 1〜2のアクセントカラーに抑える

---

## 📱 画面別カラー使用例

### 会員側画面
- **Primary**: 予約ボタン、ポイント購入
- **Success**: 予約完了、ポイント付与
- **Warning**: 残席わずか、ポイント期限
- **Danger**: キャンセル、エラー

### 管理画面
- **Primary**: 保存、登録、承認
- **Secondary**: キャンセル、戻る
- **Success**: 公開、承認済み
- **Warning**: 下書き、保留中
- **Danger**: 削除、拒否

### マーケットプレイス
- **Primary**: スタジオ詳細、体験予約
- **Success**: 高評価、人気スタジオ
- **Warning**: 残席わずか
- **Info**: 新着スタジオ

---

## 🎨 アクセシビリティ

### コントラスト比基準

| 要素 | WCAG基準 | 実装例 |
|------|---------|--------|
| **本文テキスト** | 4.5:1以上 | gray-900 on white |
| **大見出し** | 3:1以上 | gray-800 on white |
| **ボタンテキスト** | 4.5:1以上 | white on blue-500 |
| **リンクテキスト** | 3:1以上 | blue-600 on white |

### カラーブラインド対応

- **色だけに依存しない**: アイコン、ラベル、パターンを併用
- **テキストラベル必須**: ステータスバッジに必ずテキスト表示
- **明度差を確保**: 色覚異常でも区別できる明度差

---

## 🔄 更新履歴

| バージョン | 日付 | 変更内容 |
|-----------|------|----------|
| 1.0 | 2025-10-27 | 初版作成 - 基本カラーシステム定義 |

---

## 📚 関連ドキュメント

- `tailwind.config.js` - Tailwind設定ファイル
- `src/components/UI/Button.tsx` - ボタンコンポーネント実装
- `TYPOGRAPHY_POLICY.md` - タイポグラフィガイドライン（今後作成予定）

---

**このデザインポリシーは全てのモックアップ開発者が遵守してください。**
**不明点があればClaudeMainに質問してください。**
