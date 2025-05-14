-- CreateEnum
CREATE TYPE "Providers" AS ENUM ('OAUTH', 'CREDENTIALS');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "provider" "Providers" DEFAULT 'OAUTH';
