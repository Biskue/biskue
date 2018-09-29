CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR(30),
	"email" VARCHAR(30),
	"firstName" TEXT,
	"lastName" TEXT,
	"password" VARCHAR(20),
	"avatar" TEXT,
	"createdAt" TIMESTAMP NOT NULL DEFAULT now()
);
