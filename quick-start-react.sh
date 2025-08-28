#!/bin/bash

# ============================================================================
# ConnectEn SaaS - React版UIモックアップ クイックスタートスクリプト
# ============================================================================

# 色付き出力用の関数
print_header() {
    echo ""
    echo "🚀 =============================================="
    echo "   ConnectEn SaaS - React UI Quick Start"
    echo "   =============================================="
    echo ""
}

print_info() {
    echo "ℹ️  $1"
}

print_success() {
    echo "✅ $1"
}

print_warning() {
    echo "⚠️  $1"
}

print_error() {
    echo "❌ $1"
}

# メイン処理開始
print_header

print_info "🔥 ConnectEn SaaS React UI モックアップをクイックスタートします"
print_info ""

# プロジェクトディレクトリの確認
PROJECT_ROOT="/Volumes/KIOXIA/Developments/withAI/Vercel/EnDanceStudio"
REACT_APP_DIR="$PROJECT_ROOT/mio_desgin_system/ui_mockups_react/connecten-ui"

if [ ! -d "$REACT_APP_DIR" ]; then
    print_error "React プロジェクトディレクトリが見つかりません"
    print_info "正しいディレクトリで実行しているか確認してください"
    exit 1
fi

# Step 1: セットアップの実行
print_info "Step 1: セットアップを実行しています..."
if ./setup-react-mock.sh; then
    print_success "セットアップ完了"
else
    print_error "セットアップに失敗しました"
    print_info "手動でセットアップを実行してください: ./setup-react-mock.sh"
    exit 1
fi

print_info ""
print_info "⏳ 3秒後に開発サーバーを起動します..."
sleep 3

# Step 2: 開発サーバーの起動
print_info "Step 2: 開発サーバーを起動しています..."
print_info ""
print_success "🌟 React UI モックアップが起動します！"
print_info ""
print_info "📱 利用可能な画面:"
print_info "   • 👥 会員管理 - インタラクティブなメンバー管理機能"
print_info "   • 🏢 スクール・施設管理 - 拠点とスタジオの包括管理"
print_info "   • 📊 レポート・分析 - リアルタイムKPIとビジネス分析"
print_info ""
print_info "🎨 デザイン特徴:"
print_info "   • 白要素強調のクリーンデザイン"
print_info "   • フラットデザイン原則準拠"
print_info "   • 完全レスポンシブ対応"
print_info "   • TypeScript + React 18"
print_info ""
print_warning "停止するには Ctrl+C を押すか、別ターミナルで ./stop-react-mock.sh を実行"
print_info ""

# 開発サーバーの起動（セットアップ済みなので直接起動）
exec ./start-react-mock.sh