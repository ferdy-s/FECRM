-- CreateTable
CREATE TABLE "negotiation_notes" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "negotiation_notes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "negotiation_notes_leadId_idx" ON "negotiation_notes"("leadId");

-- AddForeignKey
ALTER TABLE "negotiation_notes" ADD CONSTRAINT "negotiation_notes_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "leads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "negotiation_notes" ADD CONSTRAINT "negotiation_notes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
