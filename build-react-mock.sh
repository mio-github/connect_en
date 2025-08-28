#!/bin/bash

# ============================================================================
# ConnectEn SaaS - React版UIモックアップ ビルドスクリプト
# ============================================================================

# 色付き出力用の関数
print_header() {
    echo ""
    echo "🏗️  =============================================="
    echo "    ConnectEn SaaS - React UI Mock Build"
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
BUILD_OUTPUT_DIR="$REACT_APP_DIR/dist"

print_info "プロジェクトディレクトリ: $PROJECT_ROOT"
print_info "React アプリケーション: $REACT_APP_DIR"
print_info "ビルド出力先: $BUILD_OUTPUT_DIR"

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

print_success "作業ディレクトリ: $(pwd)"

# package.json の存在確認
if [ ! -f "package.json" ]; then
    print_error "package.json が見つかりません"
    exit 1
fi

# 依存関係の確認
if [ ! -d "node_modules" ]; then
    print_warning "node_modules が見つかりません。依存関係をインストールします..."
    if npm install; then
        print_success "依存関係のインストール完了"
    else
        print_error "依存関係のインストールに失敗しました"
        exit 1
    fi
fi

# 既存のビルドディレクトリをクリーンアップ
if [ -d "$BUILD_OUTPUT_DIR" ]; then
    print_info "既存のビルドファイルを削除中..."
    rm -rf "$BUILD_OUTPUT_DIR"
    print_success "クリーンアップ完了"
fi

# プロダクションビルドの実行
print_info ""
print_info "🔨 プロダクションビルドを開始しています..."
print_info "   モード: Production"
print_info "   最適化: 有効"
print_info "   ミニフィケーション: 有効"
print_info ""

if npm run build; then
    print_success "ビルドが正常に完了しました！"
else
    print_error "ビルドに失敗しました"
    exit 1
fi

# ビルド結果の確認
if [ -d "$BUILD_OUTPUT_DIR" ]; then
    print_info ""
    print_info "📁 ビルド出力の詳細:"
    
    # ファイルサイズの表示
    if command -v du >/dev/null 2>&1; then
        BUILD_SIZE=$(du -sh "$BUILD_OUTPUT_DIR" | cut -f1)
        print_info "   総サイズ: $BUILD_SIZE"
    fi
    
    # 主要ファイルの一覧表示
    if [ -d "$BUILD_OUTPUT_DIR/assets" ]; then
        print_info "   アセットファイル:"
        ls -la "$BUILD_OUTPUT_DIR/assets" | while IFS= read -r line; do
            if [[ $line == *".js"* ]] || [[ $line == *".css"* ]]; then
                filename=$(echo "$line" | awk '{print $9}')
                filesize=$(echo "$line" | awk '{print $5}')
                print_info "     - $filename ($filesize bytes)"
            fi
        done
    fi
    
    if [ -f "$BUILD_OUTPUT_DIR/index.html" ]; then
        print_info "   エントリーポイント: index.html ✅"
    fi
    
    print_success "ビルドファイルの確認完了"
else
    print_error "ビルド出力ディレクトリが見つかりません"
    exit 1
fi

# プレビューサーバーの起動オプション
print_info ""
print_info "🌐 ビルド結果のプレビュー:"
print_info "   プレビュー起動: npm run preview"
print_info "   または: ./preview-react-mock.sh"
print_info ""
print_info "📦 デプロイ準備:"
print_info "   ビルドファイル: $BUILD_OUTPUT_DIR"
print_info "   このディレクトリを Web サーバーにアップロードしてください"
print_info ""

print_success "🎉 React UI モックアップのビルドが完了しました！"