CREATE TABLE "favoriteLists" (
	"id" SERIAL PRIMARY KEY, 
	"ownerUserId" INTEGER REFERENCES "users" ("id"),
	"listName" VARCHAR(30),
	"latitude" TEXT,
	"longitude" TEXT
);