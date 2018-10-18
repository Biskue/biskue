SELECT * FROM "chat"
WHERE "pollId" = $1
ORDER BY "sentAt" ASC;