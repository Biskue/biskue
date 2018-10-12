INSERT INTO "pollUsers" 
	( "pollId", "username" ) 
VALUES 
	($1, $2)
RETURNING *;