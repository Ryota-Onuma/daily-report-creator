---
description: 日報作成の完全自動化コマンド
argument-hint: "[date] - YYYY-MM-DD (default: today)"
allowed-tools: Bash(*), Read(*), LS(*), Write(*)
---

# Daily Report コマンド

日報作成に必要な全ての処理を自動実行します。

## 使用方法

### 基本構文

```
/daily-report [date]
```

### 引数の処理

- 引数なし: 今日の日付で実行
- 日付指定: YYYY-MM-DD 形式で特定日を処理
- 日付未指定の場合: `date +%Y-%m-%d` で今日の日付を取得

## 実行内容

### 完全自動ワークフロー

1. **日報テンプレート作成**: `go run main.go create`
   - 基本的な日報テンプレートを生成
2. **GitHub 作業収集・分析**: `/github-work collect`
   - GitHub からデータ収集
   - 全 PR 詳細分析
   - 統合分析と学習ポイント抽出
3. **個別 PR 詳細分析**: `/pr` (全 PR を対象)
   - 各 PR の包括的な技術・ビジネス分析
   - レビューコメントと議論の整理
   - 学習機会と改善点の特定
4. **日報統合生成**:
   - テンプレート + GitHub 作業分析 + PR 詳細分析を統合.
   - すでに手順 1 で作成している`reports/YYYY/YYYY-MM-DD/daily-report.md` を編集する形で包括的な日本語日報を保存する。

## 生成される日報構造

```markdown
# 日報 - YYYY-MM-DD

## 今日の主な成果

- GitHub 作業から自動抽出された成果
- PR 作成・更新の詳細

## 技術的な作業内容

- 実装した機能の詳細
- コード変更の技術的分析
- アーキテクチャ上の判断

## 学んだこと・気づき

- PR 分析から抽出された学習ポイント
- レビューフィードバックから得た知見
- 技術的な発見と改善点

## 直面した課題と解決策

- 開発中に遭遇した問題
- 採用した解決アプローチ
- 議論と意思決定プロセス

## 明日以降の予定

- 継続作業の識別
- フォローアップタスク
- 改善すべき領域
```

## 使用例

```bash
# 今日の日報を完全自動生成
/daily-report

# 特定日の日報を生成
/daily-report 2025-08-23

# 過去の日付で再生成
/daily-report 2025-08-20
```

## 処理時間

- 通常: 1-3 分程度
- PR 数や変更量により変動
- 進行状況は逐次表示

## エラー時の対応

1. GitHub CLI 未設定: `gh auth login` を実行
2. リポジトリ設定なし: `.github-repos.json` を確認
3. 権限エラー: リポジトリアクセス権限を確認

## 出力ファイル

- `reports/YYYY/YYYY-MM-DD/daily-report.md` - 最終日報
- `reports/YYYY/YYYY-MM-DD/github-work/` - GitHub 作業データ
- `reports/YYYY/YYYY-MM-DD/github-work/pr-*/` - 個別 PR 分析

実行日付: $ARGUMENTS
