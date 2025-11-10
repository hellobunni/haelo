#!/usr/bin/env tsx
/**
 * Script to import issues from linear-issues-import.md into Linear
 *
 * Usage:
 *   tsx scripts/import-linear-issues.ts [--api-key YOUR_KEY] [--team-id TEAM_ID] [--dry-run]
 *
 * Or set environment variables:
 *   LINEAR_API_KEY=your_key LINEAR_TEAM_ID=team_id tsx scripts/import-linear-issues.ts
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";

interface Issue {
  title: string;
  priority: "High" | "Medium" | "Low";
  type: string;
  description: string;
  filesToUpdate?: string[];
  acceptanceCriteria: string[];
  number: number;
}

interface LinearPriority {
  High: number;
  Medium: number;
  Low: number;
}

// Linear priority mapping (1 = Urgent, 2 = High, 3 = Medium, 4 = Low, 5 = None)
const LINEAR_PRIORITY: LinearPriority = {
  High: 2,
  Medium: 3,
  Low: 4,
};

const LINEAR_API_URL = "https://api.linear.app/graphql";

// GraphQL queries and mutations
const GET_TEAMS_QUERY = `
  query GetTeams {
    teams {
      nodes {
        id
        name
        key
      }
    }
  }
`;

const GET_LABELS_QUERY = `
  query GetLabels($teamId: String!) {
    team(id: $teamId) {
      labels {
        nodes {
          id
          name
        }
      }
    }
  }
`;

const GET_PROJECTS_QUERY = `
  query GetProjects {
    projects {
      nodes {
        id
        name
        teams {
          nodes {
            id
          }
        }
      }
    }
  }
`;

const CREATE_LABEL_MUTATION = `
  mutation CreateLabel($teamId: String!, $name: String!, $color: String!) {
    issueLabelCreate(
      input: {
        teamId: $teamId
        name: $name
        color: $color
      }
    ) {
      issueLabel {
        id
        name
      }
      success
    }
  }
`;

const CREATE_ISSUE_MUTATION = `
  mutation CreateIssue(
    $teamId: String!
    $title: String!
    $description: String!
    $priority: Int!
    $labelIds: [String!]
    $projectId: String
  ) {
    issueCreate(
      input: {
        teamId: $teamId
        title: $title
        description: $description
        priority: $priority
        labelIds: $labelIds
        projectId: $projectId
      }
    ) {
      issue {
        id
        identifier
        title
        url
      }
      success
    }
  }
`;

async function linearRequest(
  apiKey: string,
  query: string,
  variables?: Record<string, unknown>,
) {
  const response = await fetch(LINEAR_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: apiKey,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
  }

  return data.data;
}

function parseMarkdownFile(filePath: string): Issue[] {
  const content = readFileSync(filePath, "utf-8");
  const issues: Issue[] = [];

  // Split by issue sections (### number. title)
  const issueSections = content.split(/^### \d+\./m).slice(1);

  for (const section of issueSections) {
    const lines = section.trim().split("\n");

    // Extract title (first line)
    const title = lines[0].trim();

    // Extract priority
    const priorityMatch = section.match(
      /\*\*Priority:\*\*\s*(High|Medium|Low)/,
    );
    const priority =
      (priorityMatch?.[1] as "High" | "Medium" | "Low") || "Medium";

    // Extract type
    const typeMatch = section.match(/\*\*Type:\*\*\s*(.+)/);
    const type = typeMatch?.[1].trim() || "Enhancement";

    // Extract description (between **Description:** and **Files to update:** or **Acceptance Criteria:**)
    const descMatch = section.match(
      /\*\*Description:\*\*\s*\n([\s\S]*?)(?=\*\*Files to update:\*\*|\*\*Acceptance Criteria:\*\*)/,
    );
    const description = descMatch?.[1].trim() || "";

    // Extract files to update
    const filesMatch = section.match(
      /\*\*Files to update:\*\*([\s\S]*?)(?=\*\*Acceptance Criteria:\*\*)/,
    );
    const filesSection = filesMatch?.[1];
    const filesToUpdate = filesSection
      ? filesSection
          .split("\n")
          .filter((line) => line.trim().startsWith("-"))
          .map((line) => line.replace(/^-\s*`?([^`]+)`?.*/, "$1").trim())
          .filter((file) => file)
      : undefined;

    // Extract acceptance criteria
    const criteriaMatch = section.match(
      /\*\*Acceptance Criteria:\*\*([\s\S]*?)(?=---|$)/,
    );
    const criteriaSection = criteriaMatch?.[1];
    const acceptanceCriteria = criteriaSection
      ? criteriaSection
          .split("\n")
          .filter((line) => line.trim().startsWith("- [ ]"))
          .map((line) => line.replace(/^-\s*\[\s*\]\s*/, "").trim())
          .filter((criteria) => criteria)
      : [];

    // Extract issue number from title or section
    const numberMatch =
      section.match(/^### (\d+)\./m) || title.match(/^(\d+)\./);
    const number = numberMatch
      ? parseInt(numberMatch[1], 10)
      : issues.length + 1;

    issues.push({
      title,
      priority,
      type,
      description,
      filesToUpdate,
      acceptanceCriteria,
      number,
    });
  }

  return issues;
}

function formatIssueDescription(issue: Issue): string {
  let description = issue.description;

  if (issue.filesToUpdate && issue.filesToUpdate.length > 0) {
    description += "\n\n**Files to update:**\n";
    for (const file of issue.filesToUpdate) {
      description += `- \`${file}\`\n`;
    }
  }

  if (issue.acceptanceCriteria.length > 0) {
    description += "\n\n**Acceptance Criteria:**\n";
    for (const criteria of issue.acceptanceCriteria) {
      description += `- [ ] ${criteria}\n`;
    }
  }

  return description;
}

async function getOrCreateLabels(
  apiKey: string,
  teamId: string,
  labelNames: string[],
): Promise<string[]> {
  // Get existing labels
  const { team } = await linearRequest(apiKey, GET_LABELS_QUERY, { teamId });
  const existingLabels = team?.labels?.nodes || [];
  const labelMap = new Map<string, string>(
    existingLabels.map((label: { id: string; name: string }) => [
      label.name,
      label.id,
    ]),
  );

  const labelIds: string[] = [];

  // Create missing labels
  for (const labelName of labelNames) {
    const existingLabelId = labelMap.get(labelName);
    if (existingLabelId) {
      labelIds.push(existingLabelId);
    } else {
      console.log(`Creating label: ${labelName}...`);
      const colors = ["#0E7833", "#0E7833", "#0E7833"]; // Green for all labels
      const { issueLabelCreate } = await linearRequest(
        apiKey,
        CREATE_LABEL_MUTATION,
        {
          teamId,
          name: labelName,
          color: colors[labelIds.length % colors.length],
        },
      );

      if (issueLabelCreate?.success && issueLabelCreate?.issueLabel) {
        labelIds.push(issueLabelCreate.issueLabel.id);
        console.log(`✓ Created label: ${labelName}`);
      }
    }
  }

  return labelIds;
}

async function getTeamId(
  apiKey: string,
  teamKeyOrId?: string,
): Promise<string> {
  const { teams } = await linearRequest(apiKey, GET_TEAMS_QUERY);
  const teamNodes = teams?.nodes || [];

  if (teamNodes.length === 0) {
    throw new Error("No teams found in your Linear workspace");
  }

  if (teamKeyOrId) {
    const team = teamNodes.find(
      (t: { id: string; key: string }) =>
        t.id === teamKeyOrId || t.key === teamKeyOrId,
    );
    if (!team) {
      throw new Error(`Team "${teamKeyOrId}" not found`);
    }
    return team.id;
  }

  // If no team specified, use the first team
  if (teamNodes.length === 1) {
    return teamNodes[0].id;
  }

  // Multiple teams - show options
  console.log("\nAvailable teams:");
  teamNodes.forEach(
    (team: { id: string; name: string; key: string }, index: number) => {
      console.log(
        `  ${index + 1}. ${team.name} (${team.key}) - ID: ${team.id}`,
      );
    },
  );

  throw new Error(
    "Multiple teams found. Please specify a team using --team-id or LINEAR_TEAM_ID environment variable",
  );
}

async function getProjectId(
  apiKey: string,
  projectName: string,
  teamId: string,
): Promise<string | null> {
  const { projects } = await linearRequest(apiKey, GET_PROJECTS_QUERY);
  const projectNodes = projects?.nodes || [];

  // Find project by name that belongs to the team
  const project = projectNodes.find(
    (p: { name: string; teams: { nodes: Array<{ id: string }> } }) => {
      const nameMatch = p.name.toLowerCase() === projectName.toLowerCase();
      const teamMatch = p.teams?.nodes?.some(
        (t: { id: string }) => t.id === teamId,
      );
      return nameMatch && teamMatch;
    },
  );

  if (!project) {
    // List available projects for debugging
    console.log(`\nAvailable projects for team:`);
    projectNodes
      .filter((p: { teams: { nodes: Array<{ id: string }> } }) =>
        p.teams?.nodes?.some((t: { id: string }) => t.id === teamId),
      )
      .forEach((p: { name: string; id: string }) => {
        console.log(`  - ${p.name} (ID: ${p.id})`);
      });
    return null;
  }

  return project.id;
}

async function createIssue(
  apiKey: string,
  teamId: string,
  issue: Issue,
  labelIds: string[],
  projectId: string | null,
  dryRun: boolean,
): Promise<void> {
  const description = formatIssueDescription(issue);
  const priority = LINEAR_PRIORITY[issue.priority];

  if (dryRun) {
    console.log(`\n[DRY RUN] Would create issue:`);
    console.log(`  Title: ${issue.title}`);
    console.log(`  Priority: ${issue.priority} (${priority})`);
    console.log(`  Labels: ${labelIds.length} labels`);
    console.log(`  Project: ${projectId ? "Haelo Studios" : "None"}`);
    console.log(`  Description length: ${description.length} chars`);
    return;
  }

  try {
    const { issueCreate } = await linearRequest(apiKey, CREATE_ISSUE_MUTATION, {
      teamId,
      title: issue.title,
      description,
      priority,
      labelIds,
      projectId: projectId || undefined,
    });

    if (issueCreate?.success && issueCreate?.issue) {
      console.log(
        `✓ Created: ${issueCreate.issue.identifier} - ${issueCreate.issue.title}`,
      );
      console.log(`  URL: ${issueCreate.issue.url}`);
    } else {
      console.error(`✗ Failed to create: ${issue.title}`);
    }
  } catch (error) {
    console.error(`✗ Error creating issue "${issue.title}":`, error);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const apiKeyIndex = args.indexOf("--api-key");
  const teamIdIndex = args.indexOf("--team-id");

  // Get API key
  let apiKey =
    apiKeyIndex >= 0 && args[apiKeyIndex + 1]
      ? args[apiKeyIndex + 1]
      : process.env.LINEAR_API_KEY;

  // Try to get from mcp.json if not provided
  if (!apiKey) {
    try {
      const mcpConfig = JSON.parse(
        readFileSync(
          join(process.env.HOME || "~", ".cursor/mcp.json"),
          "utf-8",
        ),
      );
      apiKey = mcpConfig.mcpServers?.linear?.env?.LINEAR_API_KEY;
    } catch {
      // Ignore if mcp.json doesn't exist or doesn't have the key
    }
  }

  if (!apiKey) {
    console.error("Error: LINEAR_API_KEY not found.");
    console.error("Please provide it via:");
    console.error("  - --api-key argument");
    console.error("  - LINEAR_API_KEY environment variable");
    console.error("  - mcp.json file");
    process.exit(1);
  }

  // Get team ID
  const teamKeyOrId =
    teamIdIndex >= 0 && args[teamIdIndex + 1]
      ? args[teamIdIndex + 1]
      : process.env.LINEAR_TEAM_ID;

  if (dryRun) {
    console.log("🔍 DRY RUN MODE - No issues will be created\n");
  }

  // Parse issues from markdown
  const markdownPath = join(process.cwd(), "linear-issues-import.md");
  console.log(`Reading issues from: ${markdownPath}`);
  const issues = parseMarkdownFile(markdownPath);
  console.log(`Found ${issues.length} issues\n`);

  // Get team ID
  console.log("Fetching team information...");
  const teamId = await getTeamId(apiKey, teamKeyOrId);
  console.log(`✓ Using team ID: ${teamId}\n`);

  // Get project ID for "Haelo Studios"
  console.log("Fetching project information...");
  const projectId = await getProjectId(apiKey, "Haelo Studios", teamId);
  if (projectId) {
    console.log(`✓ Found project: Haelo Studios (ID: ${projectId})\n`);
  } else {
    console.log(
      `⚠ Warning: Project "Haelo Studios" not found. Issues will be created without a project.\n`,
    );
  }

  // Get or create labels
  const labelNames = ["shadcn", "ui-components", "refactoring"];
  console.log("Setting up labels...");
  const labelIds = await getOrCreateLabels(apiKey, teamId, labelNames);
  console.log(`✓ Labels ready: ${labelNames.join(", ")}\n`);

  // Create issues
  console.log(`Creating ${issues.length} issues...\n`);
  for (const issue of issues) {
    await createIssue(apiKey, teamId, issue, labelIds, projectId, dryRun);
    // Small delay to avoid rate limiting
    if (!dryRun) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  console.log(
    `\n✅ Done! ${dryRun ? "Would create" : "Created"} ${issues.length} issues.`,
  );
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
