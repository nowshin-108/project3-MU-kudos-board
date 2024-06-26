import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css'
import CreateBoard from '../HandleBoard/CreateBoard';
import DeleteBoard from '../HandleBoard/DeleteBoard';

function Homepage() {
    const navigate = useNavigate();
    const [boards, setBoards] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState("");

    const fetchBoards = async (category = 'all') => {
        try {
            const url = (category === 'All') ? `https://project3-mu-kudos-board-5.onrender.com/boards` : `https://project3-mu-kudos-board-5.onrender.com/boards?category=${category}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await response.json();
            setBoards(data.boards);
        } catch (error) {
            console.error("Error fetching boards", error);
        }
    };


    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleBoardCreated = () => {
        fetchBoards(selectedCategory);
    };

    const handleSearch = async (event) => {
        const newSearchQuery = event.target.value;
        setSearchQuery(newSearchQuery);
        if (newSearchQuery.trim() === "") {
            fetchBoards(selectedCategory);
            return;
        }
        setBoards([]);
        try {
            const url = `https://project3-mu-kudos-board-5.onrender.com/boards?searchQuery=${searchQuery}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await response.json();
            setBoards(data.boards);
        } catch (error) {
            console.error("Error fetching boards", error);
        }
    };

    useEffect(() => {
        fetchBoards(selectedCategory);
    }, [selectedCategory]);

    const goToBoard = (id) => {
        navigate(`/boards/${id}/cards`);
    };

    return (
            <div className='main-content'>
            <main className="search">
                <input
                type="text"
                placeholder="Search boards..."
                value={searchQuery}
                onChange={handleSearch}
                />
            </main>

            <button className="button-common category-button" onClick={() => handleCategoryChange('All')}>All</button>
            <button className="button-common category-button" onClick={() => handleCategoryChange('Recent')}>Recent</button>
            <button className="button-common category-button" onClick={() => handleCategoryChange('Inspiration')}>Inspiration</button>
            <button className="button-common category-button" onClick={() => handleCategoryChange('Celebration')}>Celebration</button>
            <button className="button-common category-button" onClick={() => handleCategoryChange('Thank You')}>Thank You</button>
            <CreateBoard onBoardCreated={handleBoardCreated}/>
            <div className="board-list">
                {boards.map((board) => (
                    <div key={board.board_id} className="board-preview">
                        <img
                        src={`https://picsum.photos/300/300?random=${board.board_id}`}
                        alt={board.board_id}
                        />
                        <h2>{board.title}</h2>
                        <h5>Category: {board.category}</h5>
                        {board.author ? <h5>By: {board.author}</h5> : <h5>Anonymous</h5>}
                        <h5>{board.description}</h5>
                        <button className="board-card-button" onClick={() => goToBoard(board.board_id)}>View</button>
                        <DeleteBoard id={board.board_id} onBoardCreated={handleBoardCreated}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Homepage;