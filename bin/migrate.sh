#!/bin/bash

# Check if git-filter-repo is installed
if ! command -v git-filter-repo &> /dev/null; then
    echo "Error: git-filter-repo is not installed. Please install it first:"
    echo "pip3 install git-filter-repo"
    exit 1
fi

# Create packages directory if it doesn't exist
mkdir -p packages

echo "Starting migration process..."
echo "Reading repos.txt..."

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Read each line from repos.txt in the script directory
while IFS= read -r line || [ -n "$line" ]; do
    # Skip empty lines
    if [ -z "$line" ]; then
        continue
    fi
    
    # Split the line into repo_url and branch
    repo_url=$(echo "$line" | awk '{print $1}')
    branch=$(echo "$line" | awk '{print $2}')
    
    # Extract repository name from URL
    repo_name=$(basename "$repo_url" .git)
    
    # Check if repo directory already exists in packages
    if [ -d "packages/$repo_name" ]; then
        echo "Repository $repo_name already exists in packages directory. Skipping..."
        continue
    fi
    
    echo "Processing repository: $repo_name"
    
    # Create a temporary directory for the repository
    temp_dir="temp_$repo_name"
    echo "Cloning repository to temporary directory..."
    git clone "$repo_url" "$temp_dir"
    
    # Move into the temporary directory
    cd "$temp_dir"
    
    # Use git-filter-repo to prepare the repository
    echo "Preparing repository with git-filter-repo..."
    git filter-repo --path-rename '':'packages/'$repo_name'/' --tag-rename '':$repo_name'-'
    
    # Move back to the main directory
    cd ..
    
    # Add the filtered repository as a remote
    echo "Adding filtered repository as remote..."
    git remote add "$repo_name" "$temp_dir"
    
    # Fetch the repository
    echo "Fetching repository..."
    git fetch "$repo_name"
    
    # Merge with allow-unrelated-histories
    echo "Merging $repo_name..."
    git merge --allow-unrelated-histories "$repo_name/$branch" -m "Merge $repo_name into monorepo"
    
    # Clean up
    echo "Cleaning up..."
    git remote remove "$repo_name"
    rm -rf "$temp_dir"
    
    echo "Successfully merged $repo_name"
    echo -e "\n---\n"
done < "$SCRIPT_DIR/repos.txt"

echo "Migration completed!"