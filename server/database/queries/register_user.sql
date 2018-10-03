INSERT INTO "users" (
  "username", "email", "firstName", "lastName", "password", "avatar"
)
VALUES (
  $1, $2, $3, $4, $5, $6
)

RETURNING *;