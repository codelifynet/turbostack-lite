#!/bin/bash

# Release script for TurboStack Lite
# Usage: ./scripts/release.sh [version]
# Example: ./scripts/release.sh 1.0.0

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get version from argument or prompt
VERSION=${1:-""}

if [ -z "$VERSION" ]; then
    echo -e "${YELLOW}Enter version number (e.g., 1.0.0):${NC}"
    read VERSION
fi

# Validate version format (semantic versioning)
if ! [[ $VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo -e "${RED}Error: Invalid version format. Please use semantic versioning (e.g., 1.0.0)${NC}"
    exit 1
fi

echo -e "${GREEN}🚀 Preparing release v${VERSION}...${NC}"

# Check if we're on the correct branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ] && [ "$CURRENT_BRANCH" != "development" ]; then
    echo -e "${YELLOW}Warning: You're not on main or development branch. Current branch: ${CURRENT_BRANCH}${NC}"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check if working directory is clean
if ! git diff-index --quiet HEAD --; then
    echo -e "${RED}Error: Working directory is not clean. Please commit or stash your changes.${NC}"
    exit 1
fi

# Update version in package.json files
echo -e "${GREEN}📝 Updating version in package.json files...${NC}"
find . -name "package.json" -not -path "*/node_modules/*" -not -path "*/.next/*" -exec sed -i '' "s/\"version\": \".*\"/\"version\": \"${VERSION}\"/g" {} \;

# Check if CHANGELOG.md exists and has entry for this version
if [ -f "CHANGELOG.md" ]; then
    if ! grep -q "## \[${VERSION}\]" CHANGELOG.md; then
        echo -e "${YELLOW}Warning: CHANGELOG.md doesn't have an entry for version ${VERSION}${NC}"
        read -p "Continue anyway? (y/n) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
else
    echo -e "${YELLOW}Warning: CHANGELOG.md not found${NC}"
fi

# Build the project
echo -e "${GREEN}🔨 Building project...${NC}"
bun install --frozen-lockfile
bun run build

# Run tests if available
if bun run test 2>/dev/null; then
    echo -e "${GREEN}✅ Tests passed${NC}"
else
    echo -e "${YELLOW}⚠️  No tests found or tests failed (continuing anyway)${NC}"
fi

# Commit changes
echo -e "${GREEN}📦 Committing version changes...${NC}"
git add -A
git commit -m "chore: bump version to ${VERSION}" || echo "No changes to commit"

# Create tag
echo -e "${GREEN}🏷️  Creating tag v${VERSION}...${NC}"
git tag -a "v${VERSION}" -m "Release v${VERSION}"

# Ask if user wants to push
echo -e "${GREEN}✅ Release v${VERSION} prepared successfully!${NC}"
echo -e "${YELLOW}To publish the release, run:${NC}"
echo -e "  git push origin ${CURRENT_BRANCH}"
echo -e "  git push origin v${VERSION}"
echo ""
read -p "Push to remote now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    git push origin "${CURRENT_BRANCH}"
    git push origin "v${VERSION}"
    echo -e "${GREEN}✅ Pushed to remote!${NC}"
    echo -e "${GREEN}🎉 Release v${VERSION} is now live!${NC}"
else
    echo -e "${YELLOW}Remember to push manually:${NC}"
    echo -e "  git push origin ${CURRENT_BRANCH}"
    echo -e "  git push origin v${VERSION}"
fi
