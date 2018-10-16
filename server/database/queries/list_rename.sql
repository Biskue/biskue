UPDATE "favoriteLists" 
  SET "listName" = $2
WHERE "id" = $1
RETURNING *;
