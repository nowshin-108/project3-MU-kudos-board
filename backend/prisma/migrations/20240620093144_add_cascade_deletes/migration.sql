-- DropForeignKey
ALTER TABLE "card" DROP CONSTRAINT "card_board_id_fkey";

-- AddForeignKey
ALTER TABLE "card" ADD CONSTRAINT "card_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "board"("board_id") ON DELETE CASCADE ON UPDATE CASCADE;
