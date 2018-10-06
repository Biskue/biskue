UPDATE "users" 
  SET
    "password" = $2,
    "firstName" = $3,
    "lastName" = $4,
    "avatar" = $5,
    "email" = $6
WHERE 
  "id" = $1

RETURNING *;
