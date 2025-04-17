-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('SAVINGS', 'PAYMENT', 'LOAN');

-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('SAVINGS', 'PAYMENT', 'LOAN');

-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('ATM', 'VISA', 'MASTER');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('TRANSFER', 'DEPOSIT', 'WITHDRAW');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');
