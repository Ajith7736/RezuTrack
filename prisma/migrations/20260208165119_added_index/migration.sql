-- CreateIndex
CREATE INDEX "Application_userId_idx" ON "Application"("userId");

-- CreateIndex
CREATE INDEX "Application_createdAt_idx" ON "Application"("createdAt");

-- CreateIndex
CREATE INDEX "Application_Status_idx" ON "Application"("Status");

-- CreateIndex
CREATE INDEX "Application_companyName_idx" ON "Application"("companyName");

-- CreateIndex
CREATE INDEX "Resume_userId_idx" ON "Resume"("userId");

-- CreateIndex
CREATE INDEX "User_id_idx" ON "User"("id");
