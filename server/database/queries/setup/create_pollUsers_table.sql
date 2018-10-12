CREATE TABLE "pollUsers" (
  "pollId" INTEGER REFERENCES "polls" ("pollId"),
  "username" VARCHAR, 
  "votesUsed" INTEGER NOT NULL DEFAULT 0
);