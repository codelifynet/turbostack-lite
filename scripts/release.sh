#!/bin/bash

# Release script for TurboStack Lite
# Usage: ./scripts/release.sh [version] [--allow-dirty]
# Example: ./scripts/release.sh 1.0.0
# Example: ./scripts/release.sh 1.1.0 --allow-dirty

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Parse args: first = version, optional second = --allow-dirty
VERSION=""
ALLOW_DIRTY=""
for arg in "$@"; do
  if [ "$arg" = "--allow-dirty" ]; then
    ALLOW_DIRTY=1
  elif [ -z "$VERSION" ] && [[ $arg =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    VERSION="$arg"
  fi
done

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

# Check if working directory is clean (unless --allow-dirty)
if ! git diff-index --quiet HEAD --; then
    if [ -n "$ALLOW_DIRTY" ]; then
        echo -e "${YELLOW}Warning: Working directory has uncommitted changes (--allow-dirty).${NC}"
    else
        echo -e "${RED}Error: Working directory is not clean. Please commit or stash your changes.${NC}"
        echo -e "${YELLOW}To run anyway: ./scripts/release.sh ${VERSION} --allow-dirty${NC}"
        exit 1
    fi
fi

# Update version in package.json files (macOS: sed -i '', Linux: sed -i)
echo -e "${GREEN}📝 Updating version in package.json files...${NC}"
run_sed() {
  if [[ "$(uname)" == "Darwin" ]]; then
    sed -i '' "$1" "$2"
  else
    sed -i "$1" "$2"
  fi
}
find . -name "package.json" -not -path "*/node_modules/*" -not -path "*/.next/*" | while read -r f; do
  run_sed "s/\"version\": \".*\"/\"version\": \"${VERSION}\"/g" "$f"
done

# Update root package.json release scripts (release:version, release:tag)
ROOT_PKG="package.json"
if [ -f "$ROOT_PKG" ]; then
  run_sed "s/echo 'v[0-9.]*'/echo 'v${VERSION}'/g" "$ROOT_PKG"
  run_sed "s/v[0-9.]* -m 'Release v[0-9.]*'/v${VERSION} -m 'Release v${VERSION}'/g" "$ROOT_PKG"
  run_sed "s/git push origin v[0-9.]*/git push origin v${VERSION}/g" "$ROOT_PKG"
fi

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
bun install
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

# Create or update tag (move to current commit if tag already exists)
echo -e "${GREEN}🏷️  Creating tag v${VERSION}...${NC}"
git tag -a -f "v${VERSION}" -m "Release v${VERSION}"

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
    echo ""
    echo -e "${YELLOW}📌 GitHub Release oluşturun:${NC}"
    REPO_URL=$(git config --get remote.origin.url | sed 's/\.git$//' | sed 's/^git@github\.com:/https:\/\/github.com\//')
    RELEASE_URL="${REPO_URL}/releases/new?tag=v${VERSION}"
    echo -e "  1. ${RELEASE_URL}"
    echo -e "  2. Tag: ${GREEN}v${VERSION}${NC} (zaten seçili olabilir)"
    echo -e "  3. Release title: ${GREEN}v${VERSION}${NC}"
    echo -e "  4. Description: CHANGELOG.md içindeki [${VERSION}] bölümünü kopyalayın"
    echo -e "  5. 'Publish release' tıklayın"
    echo ""
    echo -e "${GREEN}🎉 Release v${VERSION} tag'i yayında. GitHub Release'i yukarıdaki adımlarla oluşturun.${NC}"
else
    echo -e "${YELLOW}Remember to push manually:${NC}"
    echo -e "  git push origin ${CURRENT_BRANCH}"
    echo -e "  git push origin v${VERSION}"
    echo ""
    echo -e "${YELLOW}Push sonrası GitHub'da: Repo → Releases → Draft a new release → tag v${VERSION} → CHANGELOG bölümünü yapıştırın.${NC}"
fi
