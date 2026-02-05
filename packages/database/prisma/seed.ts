import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { getDatabaseUrl } from "../src/env";
// Use better-auth's password hashing to ensure compatibility
import { hashPassword } from "better-auth/crypto";

const connectionString = getDatabaseUrl();

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting database seed...\n");

  // ============================================
  // Seed Users with Simple Roles
  // ============================================
  console.log("👤 Seeding users...");
  const superAdminPassword = await hashPassword("superadmin123!");
  const adminPassword = await hashPassword("admin123!");
  const userPassword = await hashPassword("user123!");

  const users = [
    {
      email: "superadmin@turbostack.pro",
      name: "Super Admin",
      role: "SUPER_ADMIN",
      password: superAdminPassword,
    },
    {
      email: "admin@turbostack.pro",
      name: "Admin User",
      role: "ADMIN",
      password: adminPassword,
    },
    {
      email: "user@turbostack.pro",
      name: "Regular User",
      role: "USER",
      password: userPassword,
    },
  ];

  for (const user of users) {
    // Upsert user
    const createdUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {
        role: user.role as any, // Cast to any to avoid TS error before generation
        emailVerified: true,
        emailVerifiedAt: new Date(),
      },
      create: {
        email: user.email,
        name: user.name,
        role: user.role as any,
        emailVerified: true,
        emailVerifiedAt: new Date(),
      },
    });

    // Upsert credential account (where better-auth stores passwords)
    await prisma.account.upsert({
      where: {
        providerId_accountId: {
          providerId: "credential",
          accountId: createdUser.id,
        },
      },
      update: {
        password: user.password,
      },
      create: {
        userId: createdUser.id,
        providerId: "credential",
        accountId: createdUser.id,
        password: user.password,
      },
    });

    console.log(`  ✓ ${user.email} (${user.role})`);
  }
  console.log(`✅ ${users.length} users seeded.\n`);

  // ============================================
  // Seed Global Settings
  // ============================================
  console.log("⚙️  Seeding global settings...");

  await prisma.mediaUploadSettings.upsert({
    where: { isGlobal: true } as any,
    update: {},
    create: {
      isGlobal: true,
      maxFileSize: 5,
      maxFileCount: 10,
      allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
    } as any,
  });
  console.log("✅ Global settings seeded.\n");

  // ============================================
  // Summary
  // ============================================
  console.log("📋 Login credentials:");
  console.log("  Super Admin: superadmin@turbostack.prp / superadmin123!");
  console.log("  Admin:       admin@turbostack.pro / admin123!");
  console.log("  User:        user@turbostack.pro / user123!");
  console.log("\n🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
