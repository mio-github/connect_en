#!/bin/bash

# ============================================================================
# ConnectEn SaaS - React版UIモックアップ プレビュースクリプト
# ============================================================================

# 色付き出力用の関数
print_header() {
    echo ""
    echo "👁️  =============================================="
    echo "    ConnectEn SaaS - React UI Mock Preview"
    echo "    =============================================="
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

# プロジェクトディレクトリの設定
PROJECT_ROOT="/Volumes/KIOXIA/Developments/withAI/Vercel/EnDanceStudio"
REACT_APP_DIR="$PROJECT_ROOT/mio_desgin_system/ui_mockups_react/connecten-ui"
BUILD_DIR="$REACT_APP_DIR/dist"

print_info "ビルドされたReact UIモックアップのプレビューを起動します"
print_info "プロジェクトディレクトリ: $REACT_APP_DIR"

# ディレクトリの存在確認
if [ ! -d "$REACT_APP_DIR" ]; then
    print_error "React アプリケーションディレクトリが見つかりません: $REACT_APP_DIR"
    exit 1
fi

# React アプリケーションディレクトリに移動
cd "$REACT_APP_DIR" || {
    print_error "ディレクトリの移動に失敗しました: $REACT_APP_DIR"
    exit 1
}

# ビルドディレクトリの確認
if [ ! -d "$BUILD_DIR" ]; then
    print_warning "ビルドファイルが見つかりません。先にビルドを実行します..."
    print_info "実行中: npm run build"
    
    if npm run build; then
        print_success "ビルド完了"
    else
        print_error "ビルドに失敗しました"
        exit 1
    fi
fi

print_success "ビルドファイルを確認"

# Node.js とnpm の確認
if ! command -v npm >/dev/null 2>&1; then
    print_error "npm が見つかりません"
    exit 1
fi

# プレビューサーバーの起動
print_info ""
print_info "🌐 プロダクションビルドのプレビューサーバーを起動しています..."
print_info "   モード: Production Preview"
print_info "   ソース: $BUILD_DIR"
print_info "   URL: http://localhost:4173/ (通常)"
print_info "   停止: Ctrl+C"
print_info ""

# package.json にpreview スクリプトがあるか確認
if grep -q '"preview"' package.json 2>/dev/null; then
    print_success "preview スクリプトを実行します"
    
    # バックグラウンドで起動し、PIDを保存
    npm run preview &
    PREVIEW_SERVER_PID=$!
    
    echo $PREVIEW_SERVER_PID > .preview-server.pid
    
    print_success "プレビューサーバーを起動しました (PID: $PREVIEW_SERVER_PID)"
else
    # Vite のpreview を直接実行
    print_info "npx vite preview を実行します"
    
    npx vite preview &
    PREVIEW_SERVER_PID=$!
    
    echo $PREVIEW_SERVER_PID > .preview-server.pid
    
    print_success "プレビューサーバーを起動しました (PID: $PREVIEW_SERVER_PID)"
fi

print_info ""
print_info "📱 プレビュー内容:"
print_info "   • プロダクションビルドされた最適化版"
print_info "   • 圧縮・ミニファイされたアセット"
print_info "   • 本番環境と同等のパフォーマンス"
print_info ""
print_warning "プレビューサーバーを停止するには Ctrl+C を押してください"

# シグナルハンドリング（Ctrl+C 対応）
cleanup() {
    print_info ""
    print_info "🛑 プレビューサーバーを停止しています..."
    
    if [ -f .preview-server.pid ]; then
        if kill $PREVIEW_SERVER_PID 2>/dev/null; then
            print_success "プレビューサーバーを停止しました"
        fi
        rm -f .preview-server.pid
    fi
    
    print_info "👋 プレビュー終了！"
    exit 0
}

# SIGINT (Ctrl+C) と SIGTERM をトラップ
trap cleanup SIGINT SIGTERM

# サーバーの実行を待機
wait $PREVIEW_SERVER_PID