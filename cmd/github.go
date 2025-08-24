package cmd

import (
	"daily-report-creator/internal/report"
)

var fetchGithubActivityCmd = &Command{
	Name:  "fetch-github-activity",
	Short: "Collect work from GitHub PRs for specified date",
	Long:  "Collect work summary from GitHub PRs (created, updated) and their diffs for the specified date (YYYY-MM-DD), then save to the report directory. Uses today's date if no date is provided.",
	Run: func(cmd *Command, args []string) error {
		collector := report.NewGitHubCollector(".")
		if len(args) > 0 {
			return collector.CollectWorkForDate(args[0])
		}
		return collector.CollectTodaysWork()
	},
}
