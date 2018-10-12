SELECT pu.*, p."votesPerUser"
FROM "polls" p
INNER JOIN "pollUsers" pu
ON p."pollId" = pu."pollId"
WHERE p."pollId" = $1
AND pu.username = $2;