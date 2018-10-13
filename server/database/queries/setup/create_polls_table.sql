CREATE TABLE "polls" (
	"pollId" SERIAL PRIMARY KEY, 
	"pollCode" VARCHAR(20),
	"pollURL" TEXT,
	"adminUserId" INTEGER REFERENCES "users" ("id"), 
	"votesPerUser" INTEGER,
	"allowDownVotes" BOOLEAN,
	"isActive" BOOLEAN,
]	"pollWinner" JSONB,
	"createdAt" TIMESTAMP NOT NULL DEFAULT now(),
	"updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
	"adminDecidesTie" BOOLEAN
);