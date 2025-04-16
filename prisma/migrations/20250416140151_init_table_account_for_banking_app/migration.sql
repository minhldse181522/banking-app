-- CreateTable
CREATE TABLE "bs_account" (
    "id" BIGSERIAL NOT NULL,
    "owner_id" VARCHAR(60) NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(36),
    "modified_at" TIMESTAMPTZ(3),
    "modified_by" VARCHAR(36),

    CONSTRAINT "bs_account_pkey" PRIMARY KEY ("id")
);
