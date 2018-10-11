UPDATE "polls"
	SET "participants" = "participants" || $${$2}$$
WHERE "pollId" = $1
RETURNING *;