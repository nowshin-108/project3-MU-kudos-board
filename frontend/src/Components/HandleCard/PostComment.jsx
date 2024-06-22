import { useState } from "react";
import PropTypes from 'prop-types';
import "./PostComment.css";

function PostComment({ boardId, cardId, onCommentCreated }) {
    const [author, setauthor] = useState('');
    const [content, setContent] = useState('')

    const handleComment = async (event) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author,
                content
            })
        };
        event.preventDefault(); 
        try {
            const response = await fetch(`http://localhost:3000/boards/${boardId}/cards/${cardId}/comments`, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            onCommentCreated();
            return data; 
        } catch (error) {
            console.error("Error creating comments:", error);
        }
    };

    return (
        <>
            <div className="form_container">
                    <form onSubmit={handleComment}>
                        <div>
                            <label htmlFor="author">Author:</label>
                            <input
                                type="text"
                                id="author"
                                value={author}
                                onChange={(e) => setauthor(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Comment here..."
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Comment</button>
                    </form>
            </div>
        </>
    );
}

PostComment.propTypes = {
    onCommentCreated: PropTypes.func.isRequired,
    boardId: PropTypes.string.isRequired,
    cardId: PropTypes.number.isRequired
};

export default PostComment

