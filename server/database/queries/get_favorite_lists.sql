SELECT fl.*
FROM "favoriteLists" fl
WHERE fl."ownerUserId" = $1;