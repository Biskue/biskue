SELECT p.*, pu.username, pu."votesUsed"
FROM "polls" p
INNER JOIN "pollUsers" pu
ON p."pollId" = pu."pollId"
WHERE p."pollCode" = $1;