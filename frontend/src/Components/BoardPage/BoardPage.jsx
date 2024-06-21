import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BoardPage.css'
import CreateCard from './CreateCard';
import DeleteCard from './DeleteCard';
import Upvote from './Upvote';

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
            setCards(data.cards);
        } catch (error) {
            console.log("Error fetching cards", error);
        }
    };


    // const handleCategoryChange = (category) => {
    //     setSelectedCategory(category);
    // };

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
                        <p>Author Sign: {card.author}</p>
                        <p>{card.message}</p>
                        <Upvote boardId={board_id} cardId={card.card_id} onCardCreated={reloadCardList} vote_count={card.votes}/>
                        <DeleteCard boardId={board_id} cardId={card.card_id} onCardCreated={reloadCardList}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BoardPage;