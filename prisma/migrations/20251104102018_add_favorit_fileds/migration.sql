/*
  Warnings:

  - Added the required column `date` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Favorite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Favorite" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "language" TEXT NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
