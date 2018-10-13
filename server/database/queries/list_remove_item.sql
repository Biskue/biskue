DELETE FROM "listItems"
WHERE "listId" = $1
AND "itemId" = $2
RETURNING *;