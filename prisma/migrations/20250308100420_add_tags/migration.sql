/*
  Warnings:

  - You are about to drop the column `description` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the `TagsOnThemes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TagsOnThemes" DROP CONSTRAINT "TagsOnThemes_tagId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnThemes" DROP CONSTRAINT "TagsOnThemes_themeId_fkey";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "description";

-- DropTable
DROP TABLE "TagsOnThemes";

-- CreateTable
CREATE TABLE "ThemeTag" (
    "id" TEXT NOT NULL,
    "themeId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ThemeTag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ThemeTag_themeId_idx" ON "ThemeTag"("themeId");

-- CreateIndex
CREATE INDEX "ThemeTag_tagId_idx" ON "ThemeTag"("tagId");

-- CreateIndex
CREATE UNIQUE INDEX "ThemeTag_themeId_tagId_key" ON "ThemeTag"("themeId", "tagId");

-- AddForeignKey
ALTER TABLE "ThemeTag" ADD CONSTRAINT "ThemeTag_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThemeTag" ADD CONSTRAINT "ThemeTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
