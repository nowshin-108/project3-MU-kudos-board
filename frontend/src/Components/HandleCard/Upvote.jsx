import PropTypes from 'prop-types';
import { useState} from "react";
import "./Upvote.css";
import { BiUpvote } from "react-icons/bi";

function Upvote({ boardId, cardId, onUpvoted, vote_count }) {
    const [votes, setVotes] = useState(vote_count || 0);
    const updateVote = async () => {
        try {
            const response = await fetch(`http://localhost:3000/boards/${boardId}/cards/${cardId}/votes`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    votes: votes + 1,
                })
            });
            if (response.ok) {
                onUpvoted(cardId);
            } else {
                throw new Error('Failed to upvote');
            }
            setVotes(votes+1)
        } catch (error) {
            console.error("Error upvoting:", error);
        }
    };
    return (
        <div className='upvote-container'>
            <p className='upvote-number'>{vote_count}&nbsp;&nbsp;</p> 
            <p className='upvote-icon'><BiUpvote onClick={updateVote} /></p>
        </div>
    );
}

Upvote.propTypes = {
    onUpvoted: PropTypes.func.isRequired,
    boardId: PropTypes.string.isRequired,
    cardId: PropTypes.number.isRequired,
    vote_count: PropTypes.number.isRequired
};

export default Upvote

