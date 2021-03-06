SELECT
  p.*, po."pollOption", po."downVotes", po."upVotes", po."optionId"
FROM
  "polls" p
INNER JOIN 
  "pollOptions" po 
ON
  p."pollId" = po."pollId"
WHERE
  p."pollCode" = $1;