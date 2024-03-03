/*
  Warnings:

  - You are about to drop the column `is_admin` on the `members` table. All the data in the column will be lost.
  - You are about to drop the `hearts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "hearts" DROP CONSTRAINT "hearts_memberId_fkey";

-- AlterTable
ALTER TABLE "members" DROP COLUMN "is_admin";

-- DropTable
DROP TABLE "hearts";
