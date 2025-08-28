#!/bin/bash

# ============================================================================
# ConnectEn SaaS - React版UIモックアップ起動スクリプト
# ============================================================================

# 色付き出力用の関数
print_header() {
    echo ""
    echo "🚀 =============================================="
    echo "   ConnectEn SaaS - React UI Mock System"
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

# プロジェクトディレクトリの設定
PROJECT_ROOT="/Volumes/KIOXIA/Developments/withAI/Vercel/EnDanceStudio"
REACT_APP_DIR="$PROJECT_ROOT/mio_desgin_system/ui_mockups_react/connecten-ui"

print_info "プロジェクトディレクトリ: $PROJECT_ROOT"
print_info "React アプリケーション: $REACT_APP_DIR"

# ディレクトリの存在確認
if [ ! -d "$REACT_APP_DIR" ]; then
    print_error "React アプリケーションディレクトリが見つかりません: $REACT_APP_DIR"
    exit 1
fi

print_success "ディレクトリの確認完了"

# React アプリケーションディレクトリに移動
cd "$REACT_APP_DIR" || {
    print_error "ディレクトリの移動に失敗しました: $REACT_APP_DIR"
    exit 1
}

print_info "作業ディレクトリを変更: $(pwd)"

# package.json の存在確認
if [ ! -f "package.json" ]; then
    print_error "package.json が見つかりません"
    print_info "プロジェクトが正しく初期化されているか確認してください"
    exit 1
fi

print_success "package.json を確認"

# Node.js のバージョン確認
if command -v node >/dev/null 2>&1; then
    NODE_VERSION=$(node --version)
    print_info "Node.js バージョン: $NODE_VERSION"
else
    print_error "Node.js がインストールされていません"
    print_info "Node.js をインストールしてから再実行してください"
    exit 1
fi

# npm の確認
if command -v npm >/dev/null 2>&1; then
    NPM_VERSION=$(npm --version)
    print_info "npm バージョン: $NPM_VERSION"
else
    print_error "npm が利用できません"
    exit 1
fi

# 依存関係のインストール確認
if [ ! -d "node_modules" ]; then
    print_warning "node_modules が見つかりません。依存関係をインストールします..."
    print_info "実行中: npm install"
    
    if npm install; then
        print_success "依存関係のインストール完了"
    else
        print_error "依存関係のインストールに失敗しました"
        exit 1
    fi
else
    print_success "node_modules を確認済み"
fi

# 開発サーバーの起動
print_info ""
print_info "🌟 React 開発サーバーを起動しています..."
print_info "   URL: http://localhost:5173/"
print_info "   停止: Ctrl+C"
print_info ""

# バックグラウンドで起動し、PIDを保存
npm run dev &
DEV_SERVER_PID=$!

echo $DEV_SERVER_PID > .dev-server.pid

print_success "開発サーバーを起動しました (PID: $DEV_SERVER_PID)"
print_info ""
print_info "📱 利用可能な画面:"
print_info "   • 👥 会員管理"
print_info "   • 🏢 スクール・施設管理"
print_info "   • 📊 レポート・分析"
print_info ""
print_warning "サーバーを停止するには Ctrl+C を押すか、./stop-react-mock.sh を実行してください"

# シグナルハンドリング（Ctrl+C 対応）
cleanup() {
    print_info ""
    print_info "🛑 開発サーバーを停止しています..."
    
    if [ -f .dev-server.pid ]; then
        if kill $DEV_SERVER_PID 2>/dev/null; then
            print_success "開発サーバーを停止しました"
        fi
        rm -f .dev-server.pid
    fi
    
    print_info "👋 ご利用ありがとうございました！"
    exit 0
}

# SIGINT (Ctrl+C) と SIGTERM をトラップ
trap cleanup SIGINT SIGTERM

# サーバーの実行を待機
wait $DEV_SERVER_PID