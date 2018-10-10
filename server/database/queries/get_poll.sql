SELECT
  p.*, po."pollOption", po."downVotes", po."upVotes" 
FROM
  "polls" p
INNER JOIN 
  "pollOptions" po 
ON
  p."pollId" = po."pollId"
WHERE
  p."pollId" = $1;