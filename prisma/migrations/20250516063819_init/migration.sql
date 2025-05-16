/*
  Warnings:

  - Added the required column `director` to the `Play` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Play" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "premiere" INTEGER NOT NULL,
    "director" TEXT NOT NULL,
    "description" TEXT
);
INSERT INTO "new_Play" ("description", "id", "premiere", "title") SELECT "description", "id", "premiere", "title" FROM "Play";
DROP TABLE "Play";
ALTER TABLE "new_Play" RENAME TO "Play";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
