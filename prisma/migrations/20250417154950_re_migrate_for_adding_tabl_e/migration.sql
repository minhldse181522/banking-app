-- CreateTable
CREATE TABLE "bs_banking_account" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "account_type" "AccountType" NOT NULL,
    "account_status" "AccountStatus" NOT NULL,
    "card_type" "CardType" NOT NULL,
    "currency_id" BIGINT NOT NULL,
    "balance" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "freeze_reason" VARCHAR(100),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(36),
    "modified_at" TIMESTAMPTZ(3),
    "modified_by" VARCHAR(36),

    CONSTRAINT "bs_banking_account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bs_transaction" (
    "id" BIGSERIAL NOT NULL,
    "transaction_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "from_account_id" BIGINT NOT NULL,
    "to_account_id" BIGINT NOT NULL,
    "transaction_type" "TransactionType" NOT NULL,
    "transaction_status" "TransactionStatus" NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "fee" DECIMAL(65,30) NOT NULL,
    "description" VARCHAR(100),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(36),
    "modified_at" TIMESTAMPTZ(3),
    "modified_by" VARCHAR(36),

    CONSTRAINT "bs_transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bs_user" (
    "id" BIGSERIAL NOT NULL,
    "keycloakId" TEXT NOT NULL,
    "full_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "phone" VARCHAR(50) NOT NULL,
    "bod" TIMESTAMPTZ(3) NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(36),
    "modified_at" TIMESTAMPTZ(3),
    "modified_by" VARCHAR(36),

    CONSTRAINT "bs_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dt_audit_log" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "ip_address" VARCHAR(200) NOT NULL,
    "metadata" JSONB,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(36),
    "modified_at" TIMESTAMPTZ(3),
    "modified_by" VARCHAR(36),

    CONSTRAINT "dt_audit_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dt_beneficiary" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "banking_account_id" BIGINT NOT NULL,
    "external_account_number" VARCHAR(200),
    "external_account_name" VARCHAR(200),
    "nick_name" VARCHAR(100),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(36),
    "modified_at" TIMESTAMPTZ(3),
    "modified_by" VARCHAR(36),

    CONSTRAINT "dt_beneficiary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dt_currency" (
    "id" BIGSERIAL NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "rate_to_base" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(36),
    "modified_at" TIMESTAMPTZ(3),
    "modified_by" VARCHAR(36),

    CONSTRAINT "dt_currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dt_freeze_log" (
    "id" BIGSERIAL NOT NULL,
    "banking_account_id" BIGINT NOT NULL,
    "reason" VARCHAR(50) NOT NULL,
    "action_by" VARCHAR(20),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(36),
    "modified_at" TIMESTAMPTZ(3),
    "modified_by" VARCHAR(36),

    CONSTRAINT "dt_freeze_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dt_interest_history" (
    "id" BIGSERIAL NOT NULL,
    "banking_account_id" BIGINT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "interest_rate" DECIMAL(65,30) NOT NULL,
    "card_type" "CardType",
    "calculated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(36),
    "modified_at" TIMESTAMPTZ(3),
    "modified_by" VARCHAR(36),

    CONSTRAINT "dt_interest_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dt_login_attempt" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "ip_address" VARCHAR(200) NOT NULL,
    "device" VARCHAR(100) NOT NULL,
    "success" BOOLEAN NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(36),
    "modified_at" TIMESTAMPTZ(3),
    "modified_by" VARCHAR(36),

    CONSTRAINT "dt_login_attempt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bs_transaction_transaction_id_key" ON "bs_transaction"("transaction_id");

-- CreateIndex
CREATE UNIQUE INDEX "bs_user_keycloakId_key" ON "bs_user"("keycloakId");

-- AddForeignKey
ALTER TABLE "bs_banking_account" ADD CONSTRAINT "bs_banking_account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "bs_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bs_banking_account" ADD CONSTRAINT "bs_banking_account_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "dt_currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bs_transaction" ADD CONSTRAINT "bs_transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "bs_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bs_transaction" ADD CONSTRAINT "bs_transaction_from_account_id_fkey" FOREIGN KEY ("from_account_id") REFERENCES "bs_banking_account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bs_transaction" ADD CONSTRAINT "bs_transaction_to_account_id_fkey" FOREIGN KEY ("to_account_id") REFERENCES "bs_banking_account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dt_audit_log" ADD CONSTRAINT "dt_audit_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "bs_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dt_beneficiary" ADD CONSTRAINT "dt_beneficiary_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "bs_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dt_beneficiary" ADD CONSTRAINT "dt_beneficiary_banking_account_id_fkey" FOREIGN KEY ("banking_account_id") REFERENCES "bs_banking_account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dt_freeze_log" ADD CONSTRAINT "dt_freeze_log_banking_account_id_fkey" FOREIGN KEY ("banking_account_id") REFERENCES "bs_banking_account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dt_interest_history" ADD CONSTRAINT "dt_interest_history_banking_account_id_fkey" FOREIGN KEY ("banking_account_id") REFERENCES "bs_banking_account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dt_login_attempt" ADD CONSTRAINT "dt_login_attempt_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "bs_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
