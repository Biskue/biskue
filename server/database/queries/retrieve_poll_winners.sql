WITH tally AS (
    SELECT po."optionId", po."pollOption", po."upVotes", po."downVotes", SUM(po."upVotes" - po."downVotes") as "score"
    FROM "pollOptions" po
    JOIN "polls" p
    ON po."pollId" = p."pollId"
    WHERE p."pollId" = $1
    GROUP BY 1,2
    ORDER BY 3 DESC
), top AS (
    SELECT MAX(po."upVotes" - po."downVotes") as "score"
    FROM "pollOptions" po
    JOIN "polls" p
    ON po."pollId" = p."pollId"
    WHERE p."pollId" = $1
) SELECT * FROM tally, top
WHERE tally."score" = top."score";