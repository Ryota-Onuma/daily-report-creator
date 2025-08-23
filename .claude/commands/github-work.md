---
description: GitHub作業の収集・分析・日報生成
argument-hint: "[action] [date] - action: collect|analyze|report (default: collect), date: YYYY-MM-DD (default: today)"
allowed-tools: Bash(*), Read(*), LS(*), Write(*)
---

# GitHub Work コマンド

GitHub作業データの収集、分析、日報生成を行います。

## 使用方法

### 基本構文
```
/github-work [action] [date]
```

### アクション
- **collect** (デフォルト): データ収集 + 分析 + 日報生成の完全ワークフロー
- **analyze**: 既存データの分析のみ
- **report**: 既存データから日報生成のみ

### 引数の処理
1. **アクション決定**:
   - 第1引数が日付形式(YYYY-MM-DD)の場合: アクション=collect、日付=第1引数
   - 第1引数がアクション名の場合: 指定されたアクション、日付=第2引数または今日
   - 引数なし: アクション=collect、日付=今日

2. **日付決定**:
   - 日付未指定の場合: `date +%Y-%m-%d` で今日の日付を取得

## 実行内容

### Collect モード (完全ワークフロー)
1. **データ収集**: `go run main.go fetch-github-activity`
2. **データ検証**: 収集結果の確認
3. **基本PR分析**: 収集データの初期分析
4. **詳細PR分析**: `/pr` コマンドを自動実行
   - 全PRの包括的な技術・ビジネス分析
   - 基本情報、目的とスコープ分析
   - 技術的変更内容の詳細分析
   - レビューコメントと議論の整理
   - 品質保証とテスト状況の確認
   - 学習ポイントと改善点の抽出
5. **統合分析**: 全PRを通じた成果と学びの整理
6. **日報生成**: 日本語日報の作成
7. **結果保存**: `reports/YYYY/YYYY-MM-DD/` に保存

### Analyze モード (分析のみ)
1. **既存データ確認**: `reports/YYYY/YYYY-MM-DD/github-work/` の存在確認
2. **詳細PR分析**: `/pr` コマンドを自動実行
3. **学習ポイント抽出**: 技術的な学びと気づきの整理
4. **日報提案**: 日報用コンテンツの提案

### Report モード (日報生成のみ)
1. **データ読み込み**: 既存のPRデータを読み込み
2. **日報生成**: 以下の構造で日本語日報を作成
   - 🎯 今日の主な成果
   - 💻 技術的な作業内容  
   - 📚 学んだこと・気づき
   - 🔧 直面した課題と解決策
   - 📋 明日以降の予定
3. **ファイル保存**: `daily-report.md` として保存

## 使用例

```bash
# 完全ワークフロー（今日）
/github-work
/github-work collect

# 特定日の完全ワークフロー
/github-work 2025-08-23
/github-work collect 2025-08-23

# 既存データの分析のみ
/github-work analyze
/github-work analyze 2025-08-23

# 日報生成のみ
/github-work report
/github-work report 2025-08-23
```

## 出力

- **成功時**: 処理した内容と保存先の表示
- **エラー時**: 問題の特定と解決方法の提示
- **統計情報**: 処理したPR数、生成したファイル数

実行: アクション=$ARGUMENTS