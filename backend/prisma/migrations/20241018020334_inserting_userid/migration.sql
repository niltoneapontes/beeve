/*
  Warnings:

  - Added the required column `userId` to the `Beverage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Beverage` ADD COLUMN `userId` INTEGER NOT NULL;
