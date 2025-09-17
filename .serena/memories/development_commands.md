# ConnectEn 開発コマンド

## 基本コマンド
```bash
# プロジェクトディレクトリに移動
cd connect-en-app

# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバー起動
npm start

# リンティング
npm run lint
```

## Git操作
```bash
# ステータス確認
git status

# 変更の追加
git add .

# コミット
git commit -m "メッセージ"

# プッシュ
git push
```

## システムコマンド (Darwin/macOS)
- `ls`: ファイル一覧表示
- `cd`: ディレクトリ移動
- `find`: ファイル検索
- `open`: ファイルを開く（macOS固有）

## 注意事項
- テストフレームワークは未設定
- ESLintはNext.jsデフォルト設定のみ
- TypeScript strict mode有効
- マルチテナント開発時は必ずtenant contextを確認