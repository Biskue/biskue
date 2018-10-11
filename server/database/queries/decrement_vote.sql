update "pollOptions"
    set 
        "downVotes" = "downVotes" + 1
    where "optionId" = $1

returning *;