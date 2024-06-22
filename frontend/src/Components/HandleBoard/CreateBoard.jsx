import { useState } from "react";
import PropTypes from 'prop-types';
import "./CreateBoard.css";

function CreateBoard({onBoardCreated}) {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Celebration');
    const [author, setauthor] = useState('');
    const [description, setDescription] = useState('')
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const handleSubmit = async (event) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                category,
                author,
                description
            })
        };
        event.preventDefault(); 
        try {
            const response = await fetch(`https://project3-mu-kudos-board-5.onrender.com/boards`, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            onBoardCreated()
            toggleModal();
            return data; 
        } catch (error) {
            console.error("Error creating board:", error);
        }
    };

    return (
        <>
            <button onClick={toggleModal} className="create-brd-btn">
                Create a New Board
            </button>
            {modal && (
                <div className="overlay" onClick={toggleModal}>
                    <div className="modal_content" onClick={e => e.stopPropagation()} >
                        <div className="form_container">
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="title">Title:</label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="category">Category:</label>
                                    <select                                         
                                        type="text"
                                        id="category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        required
                                    
                                    >   
                                        <option value="Celebration">Celebration</option>
                                        <option value="Inspiration">Inspiration</option>
                                        <option value="Thank You">Thank You</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="author">Author (optional):</label>
                                    <input
                                        type="text"
                                        id="author"
                                        value={author}
                                        onChange={(e) => setauthor(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="description">Description:</label>
                                    <input
                                        type="text"
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit">Create Board</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

CreateBoard.propTypes = {
    onBoardCreated: PropTypes.func.isRequired,
}

export default CreateBoard