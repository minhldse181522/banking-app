/*
  Warnings:

  - The values [SAVINGS,PAYMENT,LOAN] on the enum `AccountStatus` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[card_number]` on the table `bs_banking_account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `card_number` to the `bs_banking_account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AccountStatus_new" AS ENUM ('ACTIVE', 'FROZEN', 'CLOSED');
ALTER TABLE "bs_banking_account" ALTER COLUMN "account_status" TYPE "AccountStatus_new" USING ("account_status"::text::"AccountStatus_new");
ALTER TYPE "AccountStatus" RENAME TO "AccountStatus_old";
ALTER TYPE "AccountStatus_new" RENAME TO "AccountStatus";
DROP TYPE "AccountStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "bs_banking_account" ADD COLUMN     "card_number" VARCHAR(20) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "bs_banking_account_card_number_key" ON "bs_banking_account"("card_number");
