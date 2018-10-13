UPDATE "polls"
    SET "pollWinner" = $2
    where "pollId" = $1;

