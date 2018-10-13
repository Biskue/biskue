UPDATE "polls"
    SET 
        "isActive" = FALSE,
        "updatedAt" = now()
WHERE "pollCode" = $1;