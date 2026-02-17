# Release Checklist - v1.1.0

## ✅ Pre-Release Checklist

- [x] All package versions updated (1.1.0)
- [x] CHANGELOG.md updated
- [ ] Tests passed successfully
- [ ] Documentation is up to date
- [ ] Breaking changes documented

## 🚀 Release Steps

### 1. Final Checks

```bash
# Type check
bun run check-types

# Lint check
bun run lint

# Build check
bun run build

# Tests (if available)
bun run test
```

### 2. Git Commit and Tag

**Seçenek A – Tam sürüm (versiyon bump + build + tag + push):**
```bash
./scripts/release.sh 1.1.0
# veya: bun run release -- 1.1.0
```

**Seçenek B – Versiyon zaten commit edildiyse (sadece tag + push):**
```bash
./scripts/tag-and-push.sh 1.1.0
# veya: bun run release:tag-push -- 1.1.0
```

**Manuel:**
```bash
git add .
git commit -m "chore: prepare v1.1.0 release"
git tag -a v1.1.0 -m "Release v1.1.0"
git push origin main
git push origin v1.1.0
```

### 3. Create GitHub Release

1. Go to GitHub repository
2. Navigate to Releases page
3. Click "Draft a new release"
4. Select tag: `v1.1.0`
5. Release title: `v1.1.0`
6. Description: Copy content from CHANGELOG.md
7. Click "Publish release"

### 4. Post-Release

- [ ] Review release notes
- [ ] Update documentation (if needed)
- [ ] Check deployments
- [ ] Announce to users

## 📝 Release Notes Template

```markdown
# v1.1.0 Release

## 🎉 Minor Release

New features and improvements.

### ✨ Features

- Next.js 16 and React 19 support
- Fast backend API with Elysia.js
- Type-safe database with Prisma
- Modern authentication with Better Auth
- And much more...

### 📦 Installation

\`\`\`bash
git clone https://github.com/codelifynet/turbostack-lite.git
cd turbostack-lite
bun install
\`\`\`

### 📚 Documentation

For detailed documentation: https://turbostack-docs.vercel.app

### 🙏 Thanks

Thank you to everyone who contributed to this release!
```

## 🔄 Version Bumping

For future releases:

1. **Versiyon güncelle:** `./scripts/release.sh X.Y.Z` (tüm package.json + root release script'leri güncellenir)
2. **CHANGELOG.md** – Yeni sürüm için `## [X.Y.Z]` bölümü ekleyin
3. **Tag + push:** Script sırasında veya `./scripts/tag-and-push.sh X.Y.Z`
4. **GitHub Release:** Script’in yazdırdığı linkten "Draft new release" → tag seçin → CHANGELOG bölümünü yapıştırın → Publish
