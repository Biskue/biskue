CREATE TABLE "listItems" (
  "itemId" SERIAL PRIMARY KEY,
  "listId" INTEGER REFERENCES "favoriteLists" ("id"), 
  "listItem" JSONB,
  "addedAt" TIMESTAMP NOT NULL DEFAULT now()
);