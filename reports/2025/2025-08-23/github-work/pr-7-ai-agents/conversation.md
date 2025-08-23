# Conversation History - PR #7

## General Comments

No general comments found.

## Review Comments (Code-specific)

### Review Comment by @Ryota-Onuma
**File**: scripts/gh-my-prs/main_test.go (Line 23)
**Posted**: 2025-08-23T08:14:20Z
**Updated**: 2025-08-23T08:49:00Z
**URL**: https://github.com/Ryota-Onuma/ai-agents/pull/7#discussion_r2295466397

**Code Context**:
```diff
@@ -0,0 +1,46 @@
+package main
+
+import (
+	"context"
+	"fmt"
+	"os"
+	"path/filepath"
+	"testing"
+)
+
+func writeFakeGh(t *testing.T, content string, exitCode int) string {
+	t.Helper()
+	dir := t.TempDir()
+	path := filepath.Join(dir, "gh")
+	script := "#!/bin/sh\n" + content + "\nexit " + fmt.Sprintf("%d", exitCode) + "\n"
+	if err := os.WriteFile(path, []byte(script), 0o755); err != nil {
+		t.Fatalf("failed to write fake gh: %v", err)
+	}
+	return path
+}
+
+func TestGetAssignedPRLinks(t *testing.T) {
+	fake := writeFakeGh(t, "echo https://example.com/pr1\necho\necho https://example.com/pr2", 0)
```

**Comment**:
テスト なんでexample.comを使うんですか？

---

