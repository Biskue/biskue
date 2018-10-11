update "pollOptions"
    set 
        "upVotes" = "upVotes" + 1
    where "optionId" = $1
    
returning *;