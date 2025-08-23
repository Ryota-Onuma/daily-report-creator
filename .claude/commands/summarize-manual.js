#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
const providedDate = args[0];

// Get target date (today if not provided)
const targetDate = providedDate || new Date().toISOString().split('T')[0];

// Validate date format
if (!/^\d{4}-\d{2}-\d{2}$/.test(targetDate)) {
    console.error('Invalid date format. Please use YYYY-MM-DD format.');
    process.exit(1);
}

// Check if manual-draft.md exists
const manualDraftPath = path.join(process.cwd(), 'manual-draft.md');
if (!fs.existsSync(manualDraftPath)) {
    console.error('manual-draft.md not found in current directory.');
    process.exit(1);
}

// Read manual draft content
const manualContent = fs.readFileSync(manualDraftPath, 'utf8');

// Check if content exists (excluding template lines)
const meaningfulContent = manualContent
    .split('\n')
    .filter(line => {
        const trimmed = line.trim();
        return trimmed && 
               !trimmed.includes('手動作業ドラフト') &&
               !trimmed.includes('このファイルに今日の作業内容') &&
               !trimmed.includes('後で日報に統合する際の') &&
               !trimmed.includes('下書きとして使用できます');
    })
    .join('\n');

if (!meaningfulContent.trim()) {
    console.error('manual-draft.md contains no meaningful content to summarize.');
    process.exit(1);
}

// Get daily report path
const year = targetDate.substring(0, 4);
const reportDir = path.join(process.cwd(), 'reports', year, targetDate);
const reportPath = path.join(reportDir, 'daily-report.md');

if (!fs.existsSync(reportPath)) {
    console.error(`Daily report not found: ${reportPath}`);
    process.exit(1);
}

// Create prompt for Claude Code
const prompt = `manual-draft.mdの内容を日報に適した形で要約してください。

manual-draft.mdの内容：
\`\`\`
${manualContent}
\`\`\`

以下の要件に従って要約してください：
1. テンプレート文言（「手動作業ドラフト」「このファイルに今日の作業内容を」等）は無視
2. 実際の作業内容のみを抽出
3. 日報の「その他の作業」セクションに統合するのに適した箇条書き形式
4. 簡潔で分かりやすい表現
5. 重複や不要な情報は除去

対象日付: ${targetDate}
統合先: ${reportPath}

要約が完了したら、日報ファイルの「## その他の作業」セクションに「### 手動作業からの統合内容」という見出しで追加してください。`;

console.log(prompt);