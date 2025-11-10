# Linear Issues Import Script

This script automatically imports issues from `linear-issues-import.md` into your Linear workspace.

## Prerequisites

1. **Linear API Key**: Get your API key from [Linear Settings → API → Personal API keys](https://linear.app/settings/api)
2. **Team ID** (optional): Your Linear team ID or team key

## Installation

Install the required dependency:

```bash
pnpm install
```

## Usage

### Option 1: Using npm script (recommended)

```bash
# Dry run (see what would be created without actually creating)
pnpm import-linear --dry-run

# Actually create the issues
pnpm import-linear

# Specify team ID
pnpm import-linear --team-id YOUR_TEAM_ID

# Specify API key
pnpm import-linear --api-key YOUR_API_KEY
```

### Option 2: Using tsx directly

```bash
# Dry run
tsx scripts/import-linear-issues.ts --dry-run

# Create issues
tsx scripts/import-linear-issues.ts

# With options
tsx scripts/import-linear-issues.ts --api-key YOUR_API_KEY --team-id YOUR_TEAM_ID
```

### Option 3: Using environment variables

```bash
LINEAR_API_KEY=your_key LINEAR_TEAM_ID=team_id pnpm import-linear
```

## How it works

1. **Reads** the `linear-issues-import.md` file
2. **Parses** each issue section to extract:
   - Title
   - Priority (High/Medium/Low)
   - Description
   - Files to update
   - Acceptance criteria
3. **Fetches** your Linear teams (if team ID not provided)
4. **Creates** labels if they don't exist (`shadcn`, `ui-components`, `refactoring`)
5. **Creates** each issue in Linear with:
   - Proper priority mapping
   - Formatted description with acceptance criteria
   - Labels attached

## Priority Mapping

- **High** → Priority 2 (High)
- **Medium** → Priority 3 (Medium)
- **Low** → Priority 4 (Low)

## Labels

The script automatically creates these labels if they don't exist:
- `shadcn`
- `ui-components`
- `refactoring`

## Troubleshooting

### "No teams found"
- Make sure your API key has access to your Linear workspace
- Check that the API key is valid

### "Team not found"
- Provide the correct team ID or team key using `--team-id`
- List available teams by running without `--team-id` (script will show options)

### "LINEAR_API_KEY not found"
- Provide the API key via:
  - `--api-key` argument
  - `LINEAR_API_KEY` environment variable
  - Or it will try to read from `~/.cursor/mcp.json`

## Example Output

```
Reading issues from: /path/to/linear-issues-import.md
Found 17 issues

Fetching team information...
✓ Using team ID: abc123

Setting up labels...
✓ Created label: shadcn
✓ Labels ready: shadcn, ui-components, refactoring

Creating 17 issues...

✓ Created: MAT-1 - Replace alert() calls with shadcn Toast component
  URL: https://linear.app/your-team/issue/MAT-1
✓ Created: MAT-2 - Replace custom error messages with shadcn Alert component
  URL: https://linear.app/your-team/issue/MAT-2
...

✅ Done! Created 17 issues.
```

## Notes

- The script includes a 500ms delay between issue creations to avoid rate limiting
- Use `--dry-run` first to preview what will be created
- Issues are created in the order they appear in the markdown file
- All acceptance criteria are included as checklists in the issue description

