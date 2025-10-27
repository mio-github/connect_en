# Phase Indicators & Content Cleanup Update

**Date**: 2025-10-27
**Status**: Completed ✅

## Summary

Updated the ConnectEn UI mockup to clearly indicate Phase 1 and Phase 2 features, and removed inappropriate SaaS marketing language from the internal business system.

## Changes Made

### 1. Added Phase Indicators to All Menu Items

Updated `src/components/Layout/Sidebar.tsx` to display Phase badges on all menu items:

#### Phase 1 Features (High Priority - Core Functions)
- ✅ Dashboard (ダッシュボード)
- ✅ Member Management (生徒管理)
- ✅ Attendance Management (出席管理)
- ✅ Lesson Management (レッスン管理)
- ✅ Payment Management (支払い管理)
- ✅ Instructor Management (講師管理)
- ✅ QR Reception (QR受付)
- ✅ Member Booking (会員予約)
- ✅ Member Login (会員ログイン)
- ✅ Reports (レポート)
- ✅ Insights/Analytics parent menu
  - ✅ Sales Summary (売上集計)
  - ✅ Studio Summary (スタジオ集計)
  - ✅ Studio Transition (スタジオ遷移)
  - ✅ Sales Forecast (売上予測)
- ✅ Settings (設定)

#### Phase 2 Features (Medium Priority)
- ✅ Staff Management (スタッフ管理)
- ✅ Marketplace parent menu and all subitems
  - Platform (プラットフォーム)
  - Studio Listing (スタジオ掲載)
  - Booking Management (予約管理)
  - Analytics (分析)
  - Promotion (プロモーション)
  - Review Management (レビュー管理)
- ✅ Insights/Analytics subitems
  - Analytics Overview (分析概要)
  - Sales Analytics (セールス分析)
  - Marketing Management (マーケティング管理)
  - Lead Management (リード管理)

### 2. Removed Inappropriate SaaS Marketing Language

**Before**:
```tsx
<h3>アップグレード</h3>
<p>プレミアム機能で業務効率を向上</p>
<button>詳細を見る</button>
```

**After**:
```tsx
<h3>システムサポート</h3>
<p>ヘルプとドキュメント</p>
<button>ヘルプを見る</button>
```

### 3. Fixed Routing Issues

✅ Already fixed in previous update:
- AttendanceManagement route added
- InstructorManagement route added
- Import/export mismatches resolved

### 4. Content Audit Results

Checked all uses of "プレミアム" and "アップグレード" in the codebase:

**Appropriate Uses** (No changes needed):
- `MemberManagement.tsx` - "プレミアム" = dance studio membership tier
- `MemberHeader.tsx` - "プレミアム会員" = premium member status
- `MemberMyPage.tsx` - "プレミアム会員" = membership type
- `MemberQR.tsx` - "プレミアム会員" = membership type
- `PaymentManagement.tsx` - "プレミアムコース" = premium course at studio
- `StudioTransition.tsx` - "プランアップグレード" = analytics tracking member tier upgrades
- `StudioListingManagement.tsx` - "プレミアム" = marketplace listing tier (external platform)

**Inappropriate Use** (Fixed):
- ✅ `Sidebar.tsx` - Removed "アップグレード" section promoting "premium features"

## Impact

### User Experience
- ✅ Clear visual distinction between Phase 1 and Phase 2 features
- ✅ More appropriate help section instead of upgrade promotion
- ✅ Reduced confusion about system tiers vs membership tiers

### Development
- ✅ Developers can easily identify which features to prioritize
- ✅ Consistent phase labeling across the entire UI
- ✅ Proper separation of internal system vs marketplace features

## Technical Details

- Phase badges are rendered using the existing `PhaseBadge` component
- Badges appear as compact chips next to menu item labels
- Phase information is now consistently applied to both parent items and subitems
- The visual design follows the existing teal color scheme

## Next Steps

1. Continue Phase 1 implementation (21 screens remaining)
2. Test all Phase 1 routes to ensure they're accessible
3. Verify Phase badges display correctly on all screen sizes
4. Update progress tracking in `mock_tasks/progress/`

## References

- Content Guidelines: `mock_tasks/CONTENT_GUIDELINES.md`
- Design Policy: `mock_tasks/DESIGN_POLICY.md`
- Task Assignments: `mock_tasks/task_assignments.md`
