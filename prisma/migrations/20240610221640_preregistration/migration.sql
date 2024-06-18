-- CreateTable
CREATE TABLE "Preregistration" (
    "email" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Preregistration_email_key" ON "Preregistration"("email");
