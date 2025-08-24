# Summarize Manual Draft

Summarize the content of `manual-draft.md` using LLM and integrate it naturally into the daily report.

## Usage

```
/summarize-manual [date]
```

## Arguments

- `date` (optional): Date in YYYY-MM-DD format. If not specified, uses today's date.

## Description

This command:

1. Reads the content from `manual-draft.md` for `date`. Find it.
2. Uses LLM to summarize the content appropriately for integration
3. Integrates the summarized content into the daily report's "その他の作業" section. Also, update "今日の主な成果" section, "学んだこと・気づき" section and "直面した課題と解決策" section **if necessary (depends on the content)**.
4. Maintains the natural flow and style of the daily report

## Examples

```
/summarize-manual
/summarize-manual 2025-08-23
```
