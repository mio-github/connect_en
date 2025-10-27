# フェーズ2 中優先度タスク

**期限**: Week 2
**目標**: 残りの主要機能モックアップを完成させる

---

## 📋 ClaudeSub01 - Phase 2タスク

### 履歴・通知管理
- [ ] MemberReservationHistory.tsx - 予約・キャンセル履歴
- [ ] MemberLessonHistory.tsx - レッスン履歴
- [ ] MemberRentalStudioHistory.tsx - 貸しスタジオ履歴
- [ ] MemberNotifications.tsx - 通知一覧
- [ ] MemberMessages.tsx - メッセージ

### 決済・ポイント関連
- [ ] MemberPointPurchase.tsx - Enポイント購入
- [ ] MemberTicketPurchase.tsx - チケット購入
- [ ] MemberMonthlyTuition.tsx - 月謝支払い
- [ ] MemberPurchaseHistory.tsx - 購入履歴

**Phase 2 タスク数**: 9画面

---

## 📋 ClaudeSub02 - Phase 2タスク

### 会員管理追加機能
- [ ] MemberEnrollment.tsx - 入会管理
- [ ] MemberSearch.tsx - 会員検索

### レッスン管理追加
- [ ] OnlineLessonManagement.tsx - オンラインレッスン管理

### 貸しスタジオ管理
- [ ] RentalStudioList.tsx - 貸しスタジオ一覧
- [ ] RentalStudioDetail.tsx - 貸しスタジオ詳細
- [ ] RentalStudioReservation.tsx - 貸しスタジオ予約
- [ ] RentalStudioPayment.tsx - 貸しスタジオ決済

### 通知管理
- [ ] EmailDistribution.tsx - メール配信
- [ ] NotificationManagement.tsx - お知らせ管理

**Phase 2 タスク数**: 9画面

---

## 📋 Codex01 - Phase 2タスク

### マーケットプレイス追加機能
- [ ] MarketplaceSearchResults.tsx - 検索結果
- [ ] MarketplaceCustomerMyPage.tsx - 顧客マイページ（マーケットプレイス版）
- [ ] MarketplaceBookingPayment.tsx - 予約・決済ページ
- [ ] AffiliateManagement.tsx - アフィリエイト管理

### ダッシュボード追加
- [ ] BusinessDashboard.tsx - ビジネスダッシュボード
- [ ] NetworkDashboard.tsx - ネットワークダッシュボード

### その他機能
- [ ] DateCheck.tsx - 日付チェック
- [ ] MemberExternalIntegration.tsx - 外部サイト連携

### 会員側その他
- [ ] MemberTop.tsx - 会員トップ
- [ ] MemberLogout.tsx - ログアウト確認

**Phase 2 タスク数**: 10画面

---

## 🎯 Phase 2 完了後の状況

| 担当者 | Phase 2タスク | 累計完成画面数 | 全体進捗 |
|--------|---------------|----------------|----------|
| ClaudeSub01 | 9画面 | 15/20 | 75% |
| ClaudeSub02 | 9画面 | 16/18 | 89% |
| Codex01 | 10画面 | 18/24 | 75% |
| **合計** | **28画面** | **78/88** | **89%** |

---

## 📝 実装ガイドライン

### ClaudeSub01 - 履歴・通知画面の特徴

**履歴画面のパターン**:
```typescript
// テーブル形式の履歴表示
<div className="bg-white rounded-lg shadow">
  <table className="min-w-full">
    <thead>
      <tr>
        <th>日付</th>
        <th>レッスン名</th>
        <th>ステータス</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      {history.map(item => (
        <tr key={item.id}>
          <td>{item.date}</td>
          <td>{item.name}</td>
          <td><StatusBadge status={item.status} /></td>
          <td><Button>詳細</Button></td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

**通知一覧のパターン**:
```typescript
// 未読/既読の区別
<div className={`p-4 ${notification.isRead ? 'bg-white' : 'bg-blue-50'}`}>
  <div className="flex justify-between">
    <h3 className="font-bold">{notification.title}</h3>
    <span className="text-sm text-gray-500">{notification.date}</span>
  </div>
  <p className="text-gray-700">{notification.message}</p>
</div>
```

---

### ClaudeSub02 - 貸しスタジオ管理の特徴

**カレンダー統合**:
```typescript
// 簡易カレンダー表示（モックアップ）
<div className="grid grid-cols-7 gap-2">
  {days.map(day => (
    <div
      key={day.date}
      className={`p-4 border rounded ${
        day.available ? 'bg-green-50 cursor-pointer hover:bg-green-100'
        : 'bg-gray-100'
      }`}
    >
      <div className="text-sm font-bold">{day.date}</div>
      <div className="text-xs">{day.slots}枠空き</div>
    </div>
  ))}
</div>
```

**料金計算表示**:
```typescript
// 料金内訳
<div className="bg-gray-50 p-4 rounded-lg">
  <div className="flex justify-between mb-2">
    <span>基本料金</span>
    <span>¥5,000</span>
  </div>
  <div className="flex justify-between mb-2">
    <span>オプション</span>
    <span>¥1,000</span>
  </div>
  <div className="flex justify-between font-bold text-lg border-t pt-2">
    <span>合計</span>
    <span>¥6,000</span>
  </div>
</div>
```

---

### Codex01 - マーケットプレイス・ダッシュボードの特徴

**検索結果の地図表示（ダミー）**:
```typescript
// 地図プレースホルダー
<div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
  <div className="text-center text-gray-500">
    <MapPin size={48} className="mx-auto mb-2" />
    <p>地図表示エリア</p>
    <p className="text-sm">(Google Maps API統合予定)</p>
  </div>
</div>
```

**ビジネスダッシュボードのKPIカード**:
```typescript
// KPIカードグリッド
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {kpis.map(kpi => (
    <div key={kpi.id} className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-600">{kpi.label}</span>
        <kpi.Icon className="text-blue-600" size={24} />
      </div>
      <div className="text-3xl font-bold text-gray-900">{kpi.value}</div>
      <div className={`text-sm mt-2 ${kpi.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
        {kpi.trend > 0 ? '↑' : '↓'} {Math.abs(kpi.trend)}% vs 先月
      </div>
    </div>
  ))}
</div>
```

---

## ⚠️ Phase 2 の注意事項

1. **Phase 1の成果物を参考に**
   - 既に完成したページのコーディングスタイルを踏襲
   - 共通パターンを再利用

2. **データ構造の一貫性**
   - ダミーデータの形式を統一
   - APIレスポンス形式を想定した構造

3. **UX/UIの一貫性**
   - ボタン配置、カラースキーム、スペーシングを統一
   - エラーハンドリング、ローディング状態の表示方法を統一

4. **レスポンシブ対応**
   - モバイル、タブレット、デスクトップ全てで確認
   - グリッドレイアウトは`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`パターンを基本とする

---

## 📊 進捗報告

各画面完了時に`mock_tasks/progress/[担当者名]_progress.md`を更新:

```markdown
## 作業日: 2025-10-27

### 完了したタスク (Phase 2)
- [x] MemberReservationHistory.tsx
- [x] MemberLessonHistory.tsx

### 作業中のタスク (Phase 2)
- [ ] MemberNotifications.tsx - 70%完了

### 次のタスク (Phase 2)
- [ ] MemberMessages.tsx
```

---

## 🎯 Phase 2 完了基準

各画面について:
- [ ] TypeScriptコンパイルエラーなし
- [ ] 画面が正しく表示される
- [ ] テーブル・フォーム・カードレイアウトが適切
- [ ] レスポンシブデザイン対応
- [ ] ダミーデータで動作確認済み
- [ ] Phase 1の画面と一貫性がある

全体:
- [ ] `npm run build`が成功する
- [ ] 全画面でコンソールエラーなし
- [ ] ナビゲーション動作確認

---

**Phase 2 完了後は必ず作業を停止してClaudeMainの指示を待ってください!**
