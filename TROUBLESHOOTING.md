# Troubleshooting Guide

## GitHub Actions Permission Issues

### Error: "Write access to repository not granted" or "The requested URL returned error: 403"

This error occurs when GitHub Actions doesn't have the necessary permissions to push to your repository.

#### Solution 1: Check Repository Settings

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Click on **Actions** in the left sidebar
4. Under **General**, scroll down to **Workflow permissions**
5. Make sure **Read and write permissions** is selected
6. Check **Allow GitHub Actions to create and approve pull requests** if needed
7. Click **Save**

#### Solution 2: Check Organization Settings (if applicable)

If your repository is in an organization:

1. Go to your organization settings
2. Click on **Actions** in the left sidebar
3. Under **Workflow permissions**, ensure repositories have write access
4. Check if there are any organization-level restrictions

#### Solution 3: Use Personal Access Token

If the above solutions don't work, you can use a Personal Access Token:

1. Go to your GitHub profile settings
2. Click on **Developer settings** → **Personal access tokens** → **Tokens (classic)**
3. Generate a new token with `repo` scope
4. Add the token as a repository secret named `PAT_TOKEN`
5. Update the workflow to use the token:

```yaml
- name: Checkout code
  uses: actions/checkout@v4
  with:
    fetch-depth: 0
    token: ${{ secrets.PAT_TOKEN }}
```

#### Solution 4: Check Branch Protection Rules

If you have branch protection rules:

1. Go to repository **Settings** → **Branches**
2. Check if the main branch has protection rules
3. Ensure **Allow GitHub Actions to create and approve pull requests** is enabled
4. Make sure the workflow has permission to push to protected branches

#### Solution 5: Verify Workflow Permissions

Ensure your workflow has the correct permissions section:

```yaml
permissions:
  contents: write
  packages: write
  issues: write
  pull-requests: write
```

### Alternative Approach: Manual Release Process

If you continue to have issues with automated releases, you can use the manual release process:

1. **Bump version locally:**
   ```bash
   npm run version:auto
   ```

2. **Build and test:**
   ```bash
   npm run build && npm test
   ```

3. **Commit changes:**
   ```bash
   git add .
   git commit -m "chore: bump version to $(node -p \"require('./package.json').version\")"
   ```

4. **Create and push tag:**
   ```bash
   git tag "v$(node -p \"require('./package.json').version\")"
   git push && git push --tags
   ```

5. **Publish to npm:**
   ```bash
   npm publish
   ```

6. **Create GitHub release manually** from the pushed tag

### Testing Permissions

Use the `test-permissions.yml` workflow to test if your GitHub Actions have the necessary permissions:

1. Go to **Actions** tab in your repository
2. Select **Test Permissions** workflow
3. Click **Run workflow**
4. Check the logs for any permission errors

### Common Issues and Solutions

| Issue | Solution |
|-------|----------|
| 403 Forbidden | Check repository workflow permissions |
| Authentication failed | Verify GITHUB_TOKEN or use PAT_TOKEN |
| Branch protection | Enable GitHub Actions in branch rules |
| Organization restrictions | Check organization-level settings |

### Getting Help

If you continue to experience issues:

1. Check the [GitHub Actions documentation](https://docs.github.com/en/actions)
2. Review [GitHub Actions troubleshooting guide](https://docs.github.com/en/actions/troubleshooting)
3. Check [GitHub Community discussions](https://github.com/orgs/community/discussions)
4. Open an issue in this repository with detailed error logs
