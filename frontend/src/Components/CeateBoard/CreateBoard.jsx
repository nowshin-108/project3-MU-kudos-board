import { useState } from "react";
import PropTypes from 'prop-types';
import "./CreateBoard.css";

function CreateBoard({onBoardCreated}) {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [owner, setOwner] = useState('');
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
                owner
            })
        };
        event.preventDefault(); // Prevent the default form submit behavior
        try {
            const response = await fetch(`http://localhost:3000/boards`, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            onBoardCreated()
            console.log("Board created successfully:", data);
            return data; // Return the created board data
        } catch (error) {
            console.error("Error creating board:", error);
        }
    };

    // const createCards = async (field) => {
    //     try {
    //         const response = await fetch(`http://localhost:3000/boards`, options);
    //         const data = await response.json();
    //     } catch (error) {
    //         console.log("Error fetching kudos board", error);
    //     }}

    return (
        <>
                <button onClick={toggleModal} className="create-brd-btn">
                    Create a New Board
                </button>
            {modal && (
                <dialog className="overlay" onClick={toggleModal}>
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
                                    <input
                                        type="text"
                                        id="category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="owner">Owner:</label>
                                    <input
                                        type="text"
                                        id="owner"
                                        value={owner}
                                        onChange={(e) => setOwner(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit">Create Board</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            )}
        </>
    );
}

CreateBoard.propTypes = {
    onBoardCreated: PropTypes.func.isRequired, // Validate that onBoardCreated is a function and is required
};

export default CreateBoard

