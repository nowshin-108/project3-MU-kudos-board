/*
  Warnings:

  - You are about to drop the column `gif` on the `card` table. All the data in the column will be lost.
  - Added the required column `imgURL` to the `card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "card" DROP COLUMN "gif",
ADD COLUMN     "imgURL" TEXT NOT NULL;
