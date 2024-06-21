import { useState } from "react";
import PropTypes from 'prop-types';
import "./LoadComment.css";
import PostComment from "./PostComment";
import { FaRegHeart } from "react-icons/fa";

function LoadComment({ boardId, cardId }) {

    const [comments, setComments] = useState([]);
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }


    const fetchComments = async () => {
        try {
            const url = `http://localhost:3000/boards/${boardId}/cards/${cardId}/comments`;
            
            console.log(`Fetching comments from card ${cardId}:`, url); 
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await response.json();
            console.log("Received data:", data);
            setComments(data);
        } catch (error) {
            console.log("Error fetching comments", error);
        }
    };

    const reloadCommentList = () => {
        fetchComments();
    };


    return (
        <>
        <button onClick={toggleModal} className="create-brd-btn">
            Comment
        </button>
        {modal && (
            <div className="overlay" onClick={toggleModal}>
                <div className="modal_content" onClick={e => e.stopPropagation()} >
                <span className="close" onClick={toggleModal}>&times;</span>
                    <div className="comment-list">
                    {comments && comments.map((comment) => (
                        <div key={comment.comment_id} className="comment-preview">
                            {comment.author ? <p>{comment.author}</p> : <p>Anonymous</p>}
                            <p>{comment.content}</p>
                            <p>{comment.likes}</p>
                            <FaRegHeart />
                        </div>
                    ))}
                    </div>
                    <PostComment boardId={boardId} cardId={cardId} onCommentCreated={reloadCommentList}/>
                </div>
            </div>
        )}
    </>
    );
}

LoadComment.propTypes = {
    boardId: PropTypes.string.isRequired,
    cardId: PropTypes.number.isRequired
};

export default LoadComment

