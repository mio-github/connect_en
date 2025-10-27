# モックアップ完成タスク管理

## 概要
このディレクトリは、ConnectEnモックアップUI完成のためのタスク管理を行います。

## 作業体制
- **ClaudeMain**: オーケストレーション・タスク調整
- **ClaudeSub01**: 会員側画面担当
- **ClaudeSub02**: 管理画面（POS・コース・貸しスタジオ）担当
- **Codex01**: Insights・Marketing・その他機能担当

## ディレクトリ構成
```
mock_tasks/
├── README.md                    # このファイル
├── task_assignments.md          # 全体タスク割り当て
├── ClaudeSub01_instructions.md  # Sub01向け指示書
├── ClaudeSub02_instructions.md  # Sub02向け指示書
├── Codex01_instructions.md      # Codex01向け指示書
├── progress/                    # 進捗報告フォルダ
│   ├── ClaudeSub01_progress.md
│   ├── ClaudeSub02_progress.md
│   └── Codex01_progress.md
└── completed/                   # 完了報告フォルダ
```

## 進捗確認方法
各担当者は作業完了後、`progress/`フォルダ内の対応ファイルを更新してください。

## タスク完了基準
1. TypeScriptエラーなくビルド可能
2. 各画面が正しくルーティング可能
3. 基本的なUI要素が配置されている（機能実装は不要）
4. レスポンシブデザイン対応
5. 既存のデザインシステムに準拠

## 注意事項
- 機能実装は不要（モックアップのみ）
- 既存コンポーネントを最大限活用
- 競合を避けるため、担当領域外のファイルは編集しない
