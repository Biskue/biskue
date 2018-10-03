CREATE TABLE "pollOptions" (
	"pollId" INTEGER REFERENCES "polls" ("pollId"), 
	"pollOption" JSONB,
	"upVotes" INTEGER NOT NULL DEFAULT 0,
	"downVotes" INTEGER NOT NULL DEFAULT 0
);