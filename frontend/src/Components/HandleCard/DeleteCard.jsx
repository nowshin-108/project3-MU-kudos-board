import PropTypes from 'prop-types';
import "./DeleteCard.css";

function DeleteCard({ boardId, cardId, onCardCreated }) {
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/boards/${boardId}/cards/${cardId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                console.log("Card deleted successfully");
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

