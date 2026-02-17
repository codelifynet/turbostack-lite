#!/bin/bash
# Mevcut versiyon için tag'i oluşturur (yoksa), push eder ve GitHub Release linkini gösterir.
# Kullanım: ./scripts/tag-and-push.sh [version]
# Örnek:   ./scripts/tag-and-push.sh 1.1.0
# Versiyon verilmezse root package.json'dan okunur.

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

VERSION="${1:-}"
if [ -z "$VERSION" ]; then
  if [ -f "package.json" ]; then
    VERSION=$(node -p "require('./package.json').version" 2>/dev/null || true)
  fi
  if [ -z "$VERSION" ]; then
    echo -e "${RED}Versiyon gerekli. Kullanım: $0 1.1.0${NC}"
    exit 1
  fi
fi

if ! [[ $VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo -e "${RED}Geçersiz versiyon formatı (örn: 1.1.0)${NC}"
  exit 1
fi

TAG="v${VERSION}"
BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo -e "${GREEN}🏷️  Tag: ${TAG} | Branch: ${BRANCH}${NC}"

if git rev-parse "$TAG" >/dev/null 2>&1; then
  echo -e "${YELLOW}Tag ${TAG} zaten mevcut.${NC}"
else
  git tag -a "$TAG" -m "Release ${TAG}"
  echo -e "${GREEN}Tag ${TAG} oluşturuldu.${NC}"
fi

echo -e "${YELLOW}Push: main + ${TAG}${NC}"
read -p "Şimdi push edilsin mi? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  git push origin "${BRANCH}"
  git push origin "${TAG}"
  echo -e "${GREEN}✅ Push tamamlandı.${NC}"
fi

REPO_URL=$(git config --get remote.origin.url 2>/dev/null | sed 's/\.git$//' | sed 's/^git@github\.com:/https:\/\/github.com\//')
RELEASE_URL="${REPO_URL}/releases/new?tag=${TAG}"
echo ""
echo -e "${YELLOW}📌 GitHub Release oluşturun:${NC}"
echo -e "   ${RELEASE_URL}"
echo -e "   • Tag: ${GREEN}${TAG}${NC}"
echo -e "   • Title: ${GREEN}${TAG}${NC}"
echo -e "   • Description: CHANGELOG.md → [${VERSION}] bölümünü yapıştırın → Publish release"
