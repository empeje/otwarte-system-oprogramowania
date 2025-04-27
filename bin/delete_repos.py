#!/usr/bin/env python3
"""
GitHub Repository Deletion Script

This script helps you delete multiple GitHub repositories using the GitHub API.
It reads repository URLs from a repos.txt file and deletes them one by one.

Prerequisites:
1. Python 3.x
2. `requests` library (install with: pip install requests)
3. GitHub Personal Access Token with 'repo' scope

Setup:
1. Create a GitHub Personal Access Token:
   - Go to GitHub Settings → Developer Settings → Personal Access Tokens
   - Generate a new token with `repo` scope
   - Copy the token

2. Set the token as an environment variable:
   export GITHUB_TOKEN="your_token_here"

Usage:
1. Make sure your repos.txt file is in the same directory as the script
2. Run the script: python delete_repos.py

Safety Features:
- Validates repository URLs before attempting deletion
- Provides detailed error messages for failed deletions
- Shows a summary of successful and failed deletions
- Requires explicit authentication via environment variable
- Requires confirmation before deleting repositories

Notes:
- Repository deletion is permanent and cannot be undone
- Make sure you have the necessary permissions to delete the repositories
- The script will skip empty lines in the repos.txt file
- Invalid repository URLs will be reported but won't stop the script

Example Output:
The following repositories will be deleted:
- empeje/assignment-Calc-Max-Word-Freq
- empeje/assignment01-ActiveRecord-CRUD
- empeje/cats-who-code

Are you sure you want to delete these repositories? [y/N]: y

✅ Successfully deleted empeje/assignment-Calc-Max-Word-Freq
✅ Successfully deleted empeje/assignment01-ActiveRecord-CRUD
❌ Failed to delete empeje/cats-who-code: 404 - Not Found

Summary:
Total repositories processed: 3
Successfully deleted: 2
Failed to delete: 1
"""

import requests
import os
import sys
from pathlib import Path
import re

def parse_repo_url(url):
    """
    Extract owner and repo name from git URL.
    
    Args:
        url (str): Git repository URL in format git@github.com:owner/repo.git
        
    Returns:
        tuple: (owner, repo) or (None, None) if URL is invalid
    """
    match = re.match(r'git@github\.com:([^/]+)/([^/]+)\.git', url)
    if match:
        return match.group(1), match.group(2)
    return None, None

def delete_repository(owner, repo, token):
    """
    Delete a GitHub repository using the API.
    
    Args:
        owner (str): Repository owner username
        repo (str): Repository name
        token (str): GitHub personal access token
        
    Returns:
        bool: True if deletion was successful, False otherwise
    """
    url = f"https://api.github.com/repos/{owner}/{repo}"
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json"
    }
    
    response = requests.delete(url, headers=headers)
    
    if response.status_code == 204:
        print(f"✅ Successfully deleted {owner}/{repo}")
        return True
    else:
        print(f"❌ Failed to delete {owner}/{repo}: {response.status_code} - {response.text}")
        return False

def main():
    """
    Main function that orchestrates the repository deletion process.
    
    Steps:
    1. Checks for GitHub token
    2. Reads repository list from repos.txt
    3. Shows confirmation prompt with list of repos
    4. Processes each repository if confirmed
    5. Provides summary of operations
    """
    # Check if GitHub token is set
    token = os.getenv("GITHUB_TOKEN")
    if not token:
        print("❌ Error: GITHUB_TOKEN environment variable not set")
        print("Please set your GitHub personal access token as GITHUB_TOKEN environment variable")
        sys.exit(1)

    # Read repos.txt from script directory
    script_dir = Path(__file__).parent
    repos_file = script_dir / "repos.txt"
    
    try:
        with open(repos_file, "r") as f:
            repos = [line.strip() for line in f if line.strip()]
    except FileNotFoundError:
        print("❌ Error: repos.txt file not found")
        sys.exit(1)

    # Show confirmation prompt with list of repos
    print("\nThe following repositories will be deleted:")
    valid_repos = []
    for repo_line in repos:
        owner, repo = parse_repo_url(repo_line)
        if owner and repo:
            print(f"- {owner}/{repo}")
            valid_repos.append((owner, repo))
        else:
            print(f"❌ Invalid repository URL format: {repo_line}")

    if not valid_repos:
        print("\nNo valid repositories found to delete.")
        sys.exit(1)

    confirmation = input("\nAre you sure you want to delete these repositories? [y/N]: ")
    if confirmation.lower() != 'y':
        print("Operation cancelled.")
        sys.exit(0)

    print("\nProceeding with deletion...\n")

    # Process each repository
    deleted_count = 0
    failed_count = 0
    
    for owner, repo in valid_repos:
        if delete_repository(owner, repo, token):
            deleted_count += 1
        else:
            failed_count += 1

    print(f"\nSummary:")
    print(f"Total repositories processed: {len(valid_repos)}")
    print(f"Successfully deleted: {deleted_count}")
    print(f"Failed to delete: {failed_count}")

if __name__ == "__main__":
    main() 