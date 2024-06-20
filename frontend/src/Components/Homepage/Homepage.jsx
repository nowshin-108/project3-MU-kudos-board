import { useState, useEffect } from 'react';
import './Homepage.css'
import CreateBoard from '../HandleBoard/CreateBoard';
import DeleteBoard from '../HandleBoard/DeleteBoard';

function Homepage() {
    const [boards, setBoards] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState("");

    const fetchBoards = async (category = 'all') => {
        try {
            const url = (category === 'All') ? `http://localhost:3000/boards` : `http://localhost:3000/boards?category=${category}`;
            console.log("Fetching boards from URL:", url); 
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await response.json();
            setBoards(data.boards);
        } catch (error) {
            console.log("Error fetching boards", error);
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
            // If the search query is empty, fetch all boards again
            fetchBoards(selectedCategory);
            return;
        }
        setBoards([]);
        try {
            const url = `http://localhost:3000/boards?searchQuery=${searchQuery}`;
            console.log("Fetching searched boards from URL:", url); 
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await response.json();
            setBoards(data.boards);
        } catch (error) {
            console.log("Error fetching boards", error);
        }
    };

    useEffect(() => {
        fetchBoards(selectedCategory);
    }, [selectedCategory]);

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
                        src={`https://picsum.photos/200/300?random=${board.board_id}`}
                        alt={board.board_id}
                        />
                        <h3>{board.title}</h3>
                        <p>{board.category}</p>
                        <button className="board-card-button">View</button>
                        <DeleteBoard id={board.board_id} onBoardCreated={handleBoardCreated}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Homepage;