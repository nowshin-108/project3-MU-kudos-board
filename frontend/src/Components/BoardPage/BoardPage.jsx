import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BoardPage.css'
import CreateCard from '../HandleCard/CreateCard';
import DeleteCard from '../HandleCard/DeleteCard';
import Upvote from '../HandleCard/Upvote';
import LoadComment from '../HandleCard/LoadComment';

function BoardPage() {
    const { board_id } = useParams();
    const [cards, setCards] = useState([]);

    const fetchCards = async () => {
        try {
            const url = `http://localhost:3000/boards/${board_id}/cards`;
            console.log(`Fetching cards from board ${board_id}:`, url); 
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await response.json();

            const sortedCards = data.cards.sort((a, b) => a.card_id - b.card_id);
            setCards(sortedCards);

            // setCards(data.cards)





        } catch (error) {
            console.log("Error fetching cards", error);
        }
    };

    const incrementCardVotes = (cardId) => {
        setCards(prevCards => prevCards.map(card => {
            if (card.card_id === cardId) {
                return { ...card, votes: card.votes + 1 };
            }
            return card;
        }));
    };

    const reloadCardList = () => {
        fetchCards();
    };

    useEffect(() => {
        fetchCards();
    }, []);

    return (
            <div className='main-content'>
            <CreateCard id={board_id} onCardCreated={reloadCardList}/>
            <div className="card-list">
                {cards.map((card) => (
                    <div key={card.card_id} className="card-preview">
                        <img
                        src={card.imgURL}
                        alt={card.card_id}
                        />
                        <h3>{card.title}</h3>
                        {card.author ? <p>Author Sign : {card.author}</p> : <p>Author sign : Anonymous</p>}
                        <p>{card.message}</p>
                        <Upvote boardId={board_id} cardId={card.card_id} onUpvoted={incrementCardVotes} vote_count={card.votes}/>
                        <DeleteCard boardId={board_id} cardId={card.card_id} onCardCreated={reloadCardList}/>
                        <LoadComment boardId={board_id} cardId={card.card_id}/>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default BoardPage;