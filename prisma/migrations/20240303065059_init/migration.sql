/*
  Warnings:

  - You are about to drop the column `is_admin` on the `members` table. All the data in the column will be lost.
  - You are about to drop the `hearts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `members` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "hearts" DROP CONSTRAINT "hearts_memberId_fkey";

-- AlterTable
ALTER TABLE "members" DROP COLUMN "is_admin",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "hearts";
