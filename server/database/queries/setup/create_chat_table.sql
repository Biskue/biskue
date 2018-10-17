CREATE TABLE "chat" (
  	"pollId" INTEGER REFERENCES "polls" ("pollId"), 
	"messageId" SERIAL PRIMARY KEY,
	"username" VARCHAR,
	"message" VARCHAR,
	"sentAt" TIMESTAMP NOT NULL DEFAULT now()
);