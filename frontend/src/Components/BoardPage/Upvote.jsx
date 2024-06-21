import PropTypes from 'prop-types';
import "./Upvote.css";
import { BiUpvote } from "react-icons/bi";

function Upvote({ boardId, cardId, onCardCreated, vote_count }) {
    const updateVote = async () => {
        try {
            const response = await fetch(`http://localhost:3000/boards/${boardId}/cards/${cardId}/votes`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    vote: true
                })
            });
            if (response.ok) {
                console.log("Upvoted successfully");
                onCardCreated();
            } else {
                throw new Error('Failed to upvote');
            }
        } catch (error) {
            console.error("Error upvoting:", error);
        }
    };
    return (
        <div className='upvote-container'>
            <div className='upvote-number'>{vote_count}</div>
            <div className='upvote-icon'><BiUpvote onClick={updateVote} /></div>
        </div>
    );
}

Upvote.propTypes = {
    onCardCreated: PropTypes.func.isRequired,
    boardId: PropTypes.string.isRequired,
    cardId: PropTypes.number.isRequired,
    vote_count: PropTypes.number.isRequired
};

export default Upvote

