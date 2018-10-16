INSERT INTO "listItems"
  ("listId", "listItem")
VALUES
  ($1, $2)
RETURNING *;