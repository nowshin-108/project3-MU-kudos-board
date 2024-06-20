-- CreateTable
CREATE TABLE "board" (
    "board_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "create_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "board_pkey" PRIMARY KEY ("board_id")
);

-- CreateTable
CREATE TABLE "card" (
    "board_id" INTEGER NOT NULL,
    "card_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "gif" TEXT NOT NULL,
    "votes" INTEGER NOT NULL DEFAULT 0,
    "create_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "card_pkey" PRIMARY KEY ("card_id")
);

-- AddForeignKey
ALTER TABLE "card" ADD CONSTRAINT "card_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "board"("board_id") ON DELETE RESTRICT ON UPDATE CASCADE;
