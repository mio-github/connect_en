#!/bin/bash

# ============================================================================
# ConnectEn SaaS - React版UIモックアップ停止スクリプト
# ============================================================================

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

print_info "🛑 React 開発サーバーを停止しています..."

# プロジェクトディレクトリの設定
PROJECT_ROOT="/Volumes/KIOXIA/Developments/withAI/Vercel/EnDanceStudio"
REACT_APP_DIR="$PROJECT_ROOT/mio_desgin_system/ui_mockups_react/connecten-ui"

cd "$REACT_APP_DIR" 2>/dev/null || {
    print_warning "React アプリケーションディレクトリが見つかりません"
}

# PIDファイルから停止
if [ -f .dev-server.pid ]; then
    PID=$(cat .dev-server.pid)
    if kill "$PID" 2>/dev/null; then
        print_success "開発サーバーを停止しました (PID: $PID)"
    else
        print_warning "PID $PID のプロセスは既に停止しています"
    fi
    rm -f .dev-server.pid
fi

# Vite開発サーバープロセスを検索して停止
VITE_PIDS=$(pgrep -f "vite.*dev" 2>/dev/null)
if [ -n "$VITE_PIDS" ]; then
    print_info "Vite 開発サーバープロセスを検索中..."
    echo "$VITE_PIDS" | while read -r pid; do
        if kill "$pid" 2>/dev/null; then
            print_success "Vite プロセスを停止しました (PID: $pid)"
        fi
    done
fi

# Node.jsプロセスでポート5173を使用しているものを停止
NODE_PIDS=$(lsof -ti:5173 2>/dev/null)
if [ -n "$NODE_PIDS" ]; then
    print_info "ポート 5173 を使用しているプロセスを停止中..."
    echo "$NODE_PIDS" | while read -r pid; do
        if kill "$pid" 2>/dev/null; then
            print_success "プロセスを停止しました (PID: $pid)"
        fi
    done
fi

print_success "React 開発サーバーの停止処理完了"
print_info "👋 お疲れ様でした！"