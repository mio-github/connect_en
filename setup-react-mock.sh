#!/bin/bash

# ============================================================================
# ConnectEn SaaS - React版UIモックアップ セットアップスクリプト
# ============================================================================

# 色付き出力用の関数
print_header() {
    echo ""
    echo "⚙️  =============================================="
    echo "    ConnectEn SaaS - React UI Mock Setup"
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

# 必要なコマンドの確認関数
check_command() {
    if command -v "$1" >/dev/null 2>&1; then
        VERSION=$($1 --version 2>/dev/null | head -n1)
        print_success "$1 は利用可能です ($VERSION)"
        return 0
    else
        print_error "$1 が見つかりません"
        return 1
    fi
}

# Node.js のバージョン確認
check_node_version() {
    if command -v node >/dev/null 2>&1; then
        NODE_VERSION=$(node --version | sed 's/v//')
        MAJOR_VERSION=$(echo "$NODE_VERSION" | cut -d. -f1)
        
        if [ "$MAJOR_VERSION" -ge 16 ]; then
            print_success "Node.js バージョン $NODE_VERSION (要件: v16以上)"
            return 0
        else
            print_warning "Node.js バージョン $NODE_VERSION (推奨: v16以上)"
            return 1
        fi
    else
        return 1
    fi
}

# メイン処理開始
print_header

print_info "システム要件をチェックしています..."

# 基本的なコマンドの存在確認
MISSING_COMMANDS=0

if ! check_node_version; then
    print_error "Node.js v16 以上が必要です"
    print_info "インストール方法: https://nodejs.org/"
    ((MISSING_COMMANDS++))
fi

if ! check_command npm; then
    print_error "npm が必要です（通常 Node.js と一緒にインストールされます）"
    ((MISSING_COMMANDS++))
fi

if ! check_command git; then
    print_warning "git が見つかりません（必須ではありませんが推奨）"
fi

# 必須コマンドが不足している場合は終了
if [ $MISSING_COMMANDS -gt 0 ]; then
    print_error "必須コマンドが不足しています。インストール後に再実行してください。"
    exit 1
fi

print_success "システム要件チェック完了"

# プロジェクトディレクトリの設定
PROJECT_ROOT="/Volumes/KIOXIA/Developments/withAI/Vercel/EnDanceStudio"
REACT_APP_DIR="$PROJECT_ROOT/mio_desgin_system/ui_mockups_react/connecten-ui"

print_info ""
print_info "📁 プロジェクト構造:"
print_info "   ルート: $PROJECT_ROOT"
print_info "   React App: $REACT_APP_DIR"

# ディレクトリの存在確認
if [ ! -d "$REACT_APP_DIR" ]; then
    print_error "React アプリケーションディレクトリが見つかりません: $REACT_APP_DIR"
    print_info "プロジェクトが正しく配置されているか確認してください"
    exit 1
fi

# React アプリケーションディレクトリに移動
cd "$REACT_APP_DIR" || {
    print_error "ディレクトリの移動に失敗しました: $REACT_APP_DIR"
    exit 1
}

print_success "プロジェクトディレクトリを確認"

# package.json の存在確認
if [ ! -f "package.json" ]; then
    print_error "package.json が見つかりません"
    print_info "React プロジェクトが正しく初期化されているか確認してください"
    exit 1
fi

print_success "package.json を確認"

# 既存の node_modules をクリーンアップ（オプション）
if [ -d "node_modules" ]; then
    print_info "既存の node_modules を発見しました"
    read -p "🤔 既存の依存関係を再インストールしますか？ [y/N]: " -r
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_info "node_modules を削除中..."
        rm -rf node_modules package-lock.json
        print_success "クリーンアップ完了"
    fi
fi

# 依存関係のインストール
print_info ""
print_info "📦 依存関係をインストールしています..."
print_info "   これには数分かかる場合があります"

if npm install; then
    print_success "依存関係のインストール完了"
else
    print_error "依存関係のインストールに失敗しました"
    print_info "ネットワーク接続とnpm レジストリの状態を確認してください"
    exit 1
fi

# インストールされたパッケージの確認
print_info ""
print_info "📋 インストール済みパッケージ情報:"

if [ -f "package.json" ]; then
    # 主要な依存関係を表示
    if command -v jq >/dev/null 2>&1; then
        print_info "   React: $(jq -r '.dependencies.react // "not found"' package.json)"
        print_info "   TypeScript: $(jq -r '.devDependencies.typescript // .dependencies.typescript // "not found"' package.json)"
        print_info "   Vite: $(jq -r '.devDependencies.vite // "not found"' package.json)"
        print_info "   Tailwind CSS: $(jq -r '.devDependencies.tailwindcss // "not found"' package.json)"
    else
        print_info "   依存関係の詳細は package.json を確認してください"
    fi
fi

# プロジェクト固有のファイル確認
print_info ""
print_info "🔍 プロジェクトファイルの確認:"

REQUIRED_FILES=(
    "src/App.tsx"
    "src/index.css"
    "src/pages/MemberManagement.tsx"
    "src/pages/SchoolManagement.tsx"
    "src/pages/ReportsAnalytics.tsx"
    "src/components/Layout/Layout.tsx"
    "src/components/UI/Button.tsx"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        print_success "   $file ✓"
    else
        print_warning "   $file ⚠️  (見つかりません)"
    fi
done

# 設定ファイルの確認
CONFIG_FILES=(
    "tailwind.config.js"
    "tsconfig.json"
    "vite.config.ts"
    "postcss.config.js"
)

print_info ""
print_info "⚙️  設定ファイルの確認:"

for config in "${CONFIG_FILES[@]}"; do
    if [ -f "$config" ]; then
        print_success "   $config ✓"
    else
        print_warning "   $config ⚠️  (見つかりません)"
    fi
done

# 実行可能性テスト
print_info ""
print_info "🧪 実行可能性テスト:"

# TypeScript のコンパイルチェック（可能な場合）
if command -v npx >/dev/null 2>&1 && [ -f "tsconfig.json" ]; then
    print_info "   TypeScript 構文チェック実行中..."
    if npx tsc --noEmit --skipLibCheck 2>/dev/null; then
        print_success "   TypeScript チェック ✓"
    else
        print_warning "   TypeScript に警告があります"
    fi
fi

# セットアップ完了
print_success ""
print_success "🎉 React UI モックアップのセットアップが完了しました！"
print_info ""
print_info "📚 利用可能なコマンド:"
print_info "   開発サーバー起動: ./start-react-mock.sh"
print_info "   開発サーバー停止: ./stop-react-mock.sh"
print_info "   プロダクションビルド: ./build-react-mock.sh"
print_info ""
print_info "🚀 開発を開始するには:"
print_info "   ./start-react-mock.sh"
print_info ""
print_success "セットアップ完了！開発をお楽しみください 🎨"