package cmd

import (
	"daily-report-creator/internal/report"
)

var createCmd = &Command{
	Name:  "create",
	Short: "Create a new daily report for specified date",
	Long:  "Create a new daily report markdown file in the reports directory organized by year and date. Accepts date in YYYY-MM-DD format, uses today's date if not provided.",
	Run: func(cmd *Command, args []string) error {
		generator := report.NewGenerator(".")
		if len(args) > 0 {
			return generator.CreateDailyReportForDate(args[0])
		}
		return generator.CreateDailyReport()
	},
}
