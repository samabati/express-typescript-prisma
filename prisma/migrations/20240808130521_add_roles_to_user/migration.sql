-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ROLE');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
