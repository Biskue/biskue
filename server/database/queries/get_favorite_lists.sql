SELECT li.*, fl.*
FROM "favoriteLists" fl
JOIN "listItems" li
ON li."listId" = fl.id
WHERE fl."ownerUserId" = $1;