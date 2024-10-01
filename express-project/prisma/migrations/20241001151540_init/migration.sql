-- CreateTable
CREATE TABLE "customer" (
    "customer_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(15),
    "address" VARCHAR(255),

    CONSTRAINT "customer_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "foods" (
    "food_id" SERIAL NOT NULL,
    "food_name" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "foods_pkey" PRIMARY KEY ("food_id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "transaction_id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "food_id" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "total_price" INTEGER,
    "transaction_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("transaction_id")
);

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "foods"("food_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
