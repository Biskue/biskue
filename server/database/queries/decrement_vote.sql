update "pollOptions"
    set 
        "downVotes" = "upVotes" - 1
    where "optionId" = $1

returning *;