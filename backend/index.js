const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const cors = require('cors')
const express = require('express')

const app = express();
app.use(express.json())
app.use(cors());

app.get('/boards', async (req, res) => {
    const { category, searchQuery } = req.query;

    try {
        let queryOptions = {};
        if (category === "Recent") {
            // Order by creation time in descending order without filtering by category
            queryOptions.orderBy = {
                create_time: 'desc'
            };
        } else if (category) {
            // Filter by category and optionally order by creation time or other criteria
            queryOptions.where = { category };
        } else if (searchQuery) {
            queryOptions.where = {
                title:{
                    startsWith: searchQuery, mode: 'insensitive'
                },
            };
        }

        const boards = await prisma.board.findMany(queryOptions);
        res.status(200).json({ boards });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
});

// app.get('/boards/search/:search', async(req,res)=>{
//     try{
        
//         const searchQuery = req.params.search;
//         console.log(searchQuery);
//         const boards = await prisma.board.findMany({
//             where:{
//                 title:{
//                     startsWith: searchQuery, mode: 'insensitive'
//                 },
//             },
//         })
//         res.status(200).json({boards})
//     }
//     catch (error){
//         console.log(error);
//     }
// })

// app.get('/boards', async (req, res) => {
//     const { category } = req.query
//     try {
//         const boards = await prisma.board.findMany({
//             where: {category: category}
//         });
//         res.status(200).json({ boards });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Server Error' });
//     }
// });

// Board-Route: Getting a specific board
app.get('/boards/:board_id', async (req, res) => {
    const { board_id } = req.params;
    try {
        const board = await prisma.board.findUnique({
        where: { board_id: parseInt(board_id) },
        include: {cards: true}
        });
        
        if (!board) {
            console.log('Board not found');
            res.status(404).json({ error: 'Board not found' });
            return;
        }
        else {
            res.status(200).json({ board });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Board-Route: Posting a new board
app.post('/boards', async (req, res) => {
    const { title, category, author, description } = req.body;
    try {
        const board = await prisma.board.create({
        data: {
            title,
            category,
            author,
            description
        },
        });
        res.status(201).json(board);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Board-Route: deleting a specific board
app.delete('/boards/:board_id', async (req, res) => {
    const { board_id } = req.params;
    try {
        await prisma.board.delete({
        where: {
            board_id: parseInt(board_id),
        },
        });
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Card-Route: Getting all cards of a specific board
app.get('/boards/:board_id/cards', async (req, res) => {
    const { board_id } = req.params;
    try {
        const cards = await prisma.card.findMany({
        where: { board_id: parseInt(board_id) },
        });
        res.status(200).json({ cards });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Card-Route: posting a card to a specific board
app.post('/boards/:board_id/cards', async (req, res) => {
    const { board_id } = req.params;
    const { title, message, imgURL, author } = req.body;
    try {
        const card = await prisma.card.create({
        data: {
            title,
            message,
            imgURL,
            author,
            board_id: parseInt(board_id)},
        });
        res.status(201).json(card);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Card-Route: deleting a card to a specific board
app.delete('/boards/:board_id/cards/:card_id', async (req, res) => {
    const { board_id, card_id } = req.params;
    try {
        await prisma.card.delete({
        where: { card_id: parseInt(card_id), board_id: parseInt(board_id) },
        });
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Card-Vote-Route: get card vote
app.get('/boards/:board_id/cards/:card_id/votes', async (req, res) => {
    const { board_id, card_id } = req.params;
    try {
        const card = await prisma.card.findUnique({
        where: { card_id: parseInt(card_id), board_id: parseInt(board_id) },
        select: { votes: true },
        });
        if (!card) {
        return res.status(404).json({ message: 'Card not found' });
        }
        res.status(200).json({ votes: card.votes });
    } catch (error) {
        console.error('Error retrieving votes for card:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PATCH votes for a card: update card vote
app.patch('/boards/:board_id/cards/:card_id/votes', async (req, res) => {
    const { board_id, card_id } = req.params;
    try {
        const updatedVote = await prisma.card.update({
            where: {
                board_id:parseInt(board_id),
                card_id: parseInt(card_id),
            },
            data: {
                votes: {
                    increment: 1  // Assuming you're incrementing a vote count
                }
            }
        });
        res.json(updatedVote);
    } catch (error) {
        console.error("Failed to update votes:", error);
        res.status(500).send("Failed to update votes");
    }
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})