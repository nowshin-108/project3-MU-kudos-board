import { useState } from "react";
import PropTypes from 'prop-types';
import "./CreateCard.css";

function CreateCard({id, onCardCreated}) {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [author, setauthor] = useState('');
    const [imgURL, setImgURL] = useState('');
    const [searchGif, setSearchGif] = useState('');
    const apiKey = import.meta.env.VITE_APP_API_KEY

    const [modal, setModal] = useState(false);

    const handleSearch = async (event) => {
        const newSearchQuery = event.target.value;
        setSearchGif(newSearchQuery);
        if (!newSearchQuery.trim()) return;
        const params = new URLSearchParams({
            api_key: apiKey,
            q: newSearchQuery,
            limit: 10  
        });
        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?${params.toString()}`);
            const data = await response.json();
            if (data.data.length > 0) {
                setImgURL(data.data[0].images.original.url); 
            }
        } catch (error) {
            console.error("Error searching for GIFs:", error);
        }
    };

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
                message,
                author,
                imgURL
            })
        };
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/boards/${id}/cards`, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            onCardCreated();
            console.log("Card created successfully:", data);
            toggleModal();
            return data;
        } catch (error) {
            console.error("Error creating board:", error);
        }
    };

    return (
        <>
                <button onClick={toggleModal} className="create-brd-btn">
                    Add Card
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
                                    <label htmlFor="message">Message:</label>
                                    <input                                        
                                        type="text"
                                        id="message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                    
                                    /> 
                                </div>
                                <div>
                                    <label htmlFor="author">Sign as author:</label>
                                    <input
                                        type="text"
                                        id="author"
                                        value={author}
                                        onChange={(e) => setauthor(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="imgURL">Gif:</label>
                                    <input
                                        type="text"
                                        placeholder="Search Gifs..."
                                        value={searchGif}
                                        onChange={handleSearch}
                                    />
                                    {imgURL ? <img src={imgURL} alt="gif" /> : null}
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

CreateCard.propTypes = {
    id: PropTypes.string.isRequired,
    onCardCreated: PropTypes.func.isRequired,
}

export default CreateCard

//after creating the board there the modal has to close.