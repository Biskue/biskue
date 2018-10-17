DELETE FROM "listItems" WHERE "listId" = $1;
DELETE FROM "favoriteLists" WHERE "id" = $1;