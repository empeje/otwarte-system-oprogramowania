#!/usr/bin/env python3
"""
Repository Migration Check Script

This script checks if repositories listed in repos.txt have been migrated to the packages/ folder.
It compares the repository names from the git URLs with the contents of the packages directory.

Usage:
    python check_migration.py

Output:
    Shows which repositories have been migrated and which are still pending.
"""

import os
import re
from pathlib import Path
from typing import List, Tuple, Set

def parse_repo_url(url: str) -> Tuple[str, str]:
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

def get_migrated_repos() -> Set[str]:
    """
    Get list of repositories that have been migrated to packages/ folder.
    
    Returns:
        set: Set of repository names that exist in packages/ folder
    """
    packages_dir = Path("packages")
    if not packages_dir.exists():
        print("❌ Error: packages/ directory not found")
        return set()
    
    return {d.name for d in packages_dir.iterdir() if d.is_dir()}

def get_repos_from_file() -> List[str]:
    """
    Read repository URLs from repos.txt file.
    
    Returns:
        list: List of repository names from the file
    """
    script_dir = Path(__file__).parent
    repos_file = script_dir / "repos.txt"
    
    try:
        with open(repos_file, "r") as f:
            return [line.strip() for line in f if line.strip()]
    except FileNotFoundError:
        print("❌ Error: repos.txt file not found")
        return []

def main():
    """Main function to check repository migration status."""
    # Get list of migrated repositories
    migrated_repos = get_migrated_repos()
    if not migrated_repos:
        return

    # Get list of repositories from file
    repo_urls = get_repos_from_file()
    if not repo_urls:
        return

    # Track migration status
    migrated_count = 0
    pending_count = 0
    invalid_count = 0

    print("\nMigration Status Check:")
    print("=" * 50)

    for url in repo_urls:
        owner, repo = parse_repo_url(url)
        if not owner or not repo:
            print(f"❌ Invalid URL format: {url}")
            invalid_count += 1
            continue

        if repo in migrated_repos:
            print(f"✅ Migrated: {repo}")
            migrated_count += 1
        else:
            print(f"❌ Pending: {repo}")
            pending_count += 1

    print("\nSummary:")
    print("=" * 50)
    print(f"Total repositories in repos.txt: {len(repo_urls)}")
    print(f"Successfully migrated: {migrated_count}")
    print(f"Pending migration: {pending_count}")
    print(f"Invalid URLs: {invalid_count}")

    if pending_count > 0:
        print("\n⚠️  Warning: Some repositories still need to be migrated!")
    else:
        print("\n✨ All repositories have been successfully migrated!")

if __name__ == "__main__":
    main() 