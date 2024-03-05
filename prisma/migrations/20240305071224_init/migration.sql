/*
  Warnings:

  - You are about to drop the column `createdAt` on the `cash_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `cash_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `cash_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `members` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `members` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `members` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user_question_participations` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `user_question_participations` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user_question_participations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cash_transactions" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "members" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "questions" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "user_question_participations" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
