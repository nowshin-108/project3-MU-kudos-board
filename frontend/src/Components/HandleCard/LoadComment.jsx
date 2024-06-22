import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import "./LoadComment.css";
import PostComment from "./PostComment";

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
            const url = `https://project3-mu-kudos-board-5.onrender.com/boards/${boardId}/cards/${cardId}/comments`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await response.json();
            if (data && Array.isArray(data)) {
                setComments(data);
            } else {
                setComments([]);
            }
        } catch (error) {
            console.error("Error fetching comments", error);
            setComments([]);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [boardId, cardId]);

    const reloadCommentList = () => {
        fetchComments();
    };


    return (
        <>
        <button onClick={toggleModal} className="card-button">
            Comment
        </button>
        {modal && (
            <div className="overlay" onClick={toggleModal}>
                <div className="modal_content" onClick={e => e.stopPropagation()} >
                <span className="close" onClick={toggleModal}>&times;</span>
                <PostComment boardId={boardId} cardId={cardId} onCommentCreated={reloadCommentList}/>
                    <div className="comment-list">
                    {comments && comments.map((comment) => (
                        <div key={comment.comment_id} className="comment-preview">
                            {comment.author ? <p>{comment.author} Commented: </p> : <p>Anonymous Commented: </p>}
                            <p>{comment.content}</p>
                        </div>
                    ))}
                    </div>
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

