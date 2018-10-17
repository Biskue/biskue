UPDATE "users" 
  SET
    "firstName" = $2,
    "lastName" = $3,
    "avatar" = $4,
    "email" = $5
WHERE 
  "id" = $1
RETURNING *;
