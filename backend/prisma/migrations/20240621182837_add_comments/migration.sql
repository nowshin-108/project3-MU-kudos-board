-- CreateTable
CREATE TABLE "comment" (
    "comment_id" SERIAL NOT NULL,
    "card_id" INTEGER NOT NULL,
    "author" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "create_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "likes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("comment_id")
);

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "card"("card_id") ON DELETE CASCADE ON UPDATE CASCADE;
