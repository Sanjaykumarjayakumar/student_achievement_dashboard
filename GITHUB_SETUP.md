# GitHub Setup Instructions

## Prerequisites
- Git installed on your computer
- GitHub account created
- GitHub repository created (if not, create one first)

## Step 1: Initialize Git in Your Project

Open terminal/command prompt in the project folder and run:

```bash
git init
```

## Step 2: Add All Files to Git

```bash
git add .
```

## Step 3: Create Your First Commit

```bash
git commit -m "Initial commit: Student Achievement Dashboard"
```

## Step 4: Connect to Your GitHub Repository

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

For example:
```bash
git remote add origin https://github.com/johndoe/student-achievement-dashboard.git
```

## Step 5: Push Code to GitHub

```bash
git branch -M main
git push -u origin main
```

If prompted, enter your GitHub credentials.

## Alternative: Using GitHub Desktop

1. Download and install GitHub Desktop
2. Open GitHub Desktop
3. Click "Add" → "Add Existing Repository"
4. Select your project folder
5. Click "Publish repository"
6. Choose repository name and description
7. Click "Publish Repository"

## Subsequent Updates

After making changes to your code:

```bash
git add .
git commit -m "Description of changes"
git push
```

## Common Git Commands

```bash
# Check status of files
git status

# See commit history
git log

# Create a new branch
git checkout -b feature-name

# Switch branches
git checkout branch-name

# Pull latest changes
git pull
```

## Troubleshooting

### If you get "Permission denied" error:
1. Set up SSH keys or use HTTPS
2. For HTTPS, use: `https://github.com/USERNAME/REPO.git`

### If you get "remote already exists":
```bash
git remote remove origin
git remote add origin YOUR_REPO_URL
```

### If push is rejected:
```bash
git pull origin main --rebase
git push origin main
```

## Important Notes

1. Never commit sensitive information (API keys, passwords)
2. Always use `.gitignore` to exclude `node_modules/` and `.env` files
3. Write meaningful commit messages
4. Pull before pushing when working with others

## Quick Reference

```bash
# Full workflow
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/REPO.git
git branch -M main
git push -u origin main
```
