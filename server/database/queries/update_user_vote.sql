UPDATE "pollUsers"
  SET "votesUsed" = "votesUsed" + 1
  WHERE "pollId" = $1
  AND "username" = $2
RETURNING *;