import PropTypes from 'prop-types';
import "./DeleteCard.css";

function DeleteCard({ boardId, cardId, onCardCreated }) {
    const handleDelete = async () => {
        try {
            const response = await fetch(`https://project3-mu-kudos-board-5.onrender.com/boards/${boardId}/cards/${cardId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                onCardCreated();
            } else {
                throw new Error('Failed to delete the board');
            }
        } catch (error) {
            console.error("Error deleting board:", error);
        }
    };
    return (
        <button className="card-button" onClick={handleDelete}>Delete Card</button>
    );
}

DeleteCard.propTypes = {
    onCardCreated: PropTypes.func.isRequired,
    boardId: PropTypes.string.isRequired,
    cardId: PropTypes.number.isRequired
};

export default DeleteCard

