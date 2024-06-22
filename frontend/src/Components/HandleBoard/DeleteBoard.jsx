import PropTypes from 'prop-types';
import "./DeleteBoard.css";

function DeleteBoard({ id, onBoardCreated }) {
    const handleDelete = async () => {
        try {
            const response = await fetch(`https://project3-mu-kudos-board-5.onrender.com/boards/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                onBoardCreated();
            } else {
                throw new Error('Failed to delete the board');
            }
        } catch (error) {
            console.error("Error deleting board:", error);
        }
    };
    return (
        <button className="board-card-button" onClick={handleDelete}>Delete Board</button>
    );
}

DeleteBoard.propTypes = {
    onBoardCreated: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired
};

export default DeleteBoard

