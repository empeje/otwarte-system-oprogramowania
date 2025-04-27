#!/usr/bin/env python3

import requests
import os
from datetime import datetime
from pathlib import Path

# GitHub username constant
GITHUB_USERNAME = 'empeje'

def get_public_repos(token):
    headers = {
        'Authorization': f'token {token}',
        'Accept': 'application/vnd.github.v3+json'
    }
    
    repos = []
    page = 1
    
    while True:
        url = f'https://api.github.com/user/repos?type=public&page={page}&per_page=100'
        response = requests.get(url, headers=headers)
        
        if response.status_code != 200:
            print(f"Error: {response.status_code}")
            print(response.json())
            break
            
        page_repos = response.json()
        if not page_repos:
            break
            
        for repo in page_repos:
            # Include both original and forked repos owned by GITHUB_USERNAME
            if repo['owner']['login'] == GITHUB_USERNAME:
                default_branch = repo['default_branch']
                repos.append({
                    'name': repo['full_name'],
                    'branch': default_branch
                })
            
        page += 1
        
    return repos

def write_to_file(repos):
    script_dir = Path(__file__).parent
    output_file = script_dir / 'repos.txt'
    with open(output_file, 'w') as f:
        for repo in repos:
            f.write(f"git@github.com:{repo['name']}.git {repo['branch']}\n")

def main():
    # Get GitHub token from environment variable
    token = os.getenv('GITHUB_TOKEN')
    if not token:
        print("Error: GITHUB_TOKEN environment variable not set")
        print("Please set your GitHub personal access token as GITHUB_TOKEN")
        return
        
    print("Fetching public repositories (including forks)...")
    repos = get_public_repos(token)
    
    print(f"Found {len(repos)} public repositories")
    write_to_file(repos)
    print("Repositories written to repos.txt")

if __name__ == "__main__":
    main()