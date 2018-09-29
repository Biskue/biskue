CREATE TABLE "favoriteLists" (
	"id" SERIAL PRIMARY KEY, 
	"ownerUserId" INTEGER REFERENCES "users" ("id"),
	"listName" VARCHAR(30),
	"listItems" JSONB,
	"searchLatitude" TEXT,
	"serachLongitude" TEXT,
	"searchRadius" BIGINT,
	"searchCategories" TEXT,
	"searchPrice" TEXT,
	"searchOpen" TEXT
);