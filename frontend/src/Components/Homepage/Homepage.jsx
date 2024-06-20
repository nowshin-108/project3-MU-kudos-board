// import { useState, useEffect } from 'react'
// import './Homepage.css'
// import CreateBoard from '../CeateBoard/CreateBoard';

// function Homepage() {
//     const [boards, setBoards] = useState([]);
//     const [cards, setCards] = useState([]);
//     const [searchQuery, setSearchQuery] = useState("");

//     const options = {
//         method: 'GET',
//         headers: {
//             "Content-Type": "application/json",
//         }
//         };

//     const fetchKudosBoards = async () => {
//         try {
//             const response = await fetch(`http://localhost:3000/boards`, options);
//             const data = await response.json();
//             setBoards(data.boards);
//         } catch (error) {
//             console.log("Error fetching kudos board", error);
//         }
//     };

//     useEffect(() => {
//         fetchKudosBoards();
//     },[]);

//     const fetchCards = async (field) => {
//         try {
//             const response = await fetch(`http://localhost:3000/boards/${field.board_id}/cards`, options);
//             const data = await response.json();
//             setCards(data.cards);
//             console.log("Card data", cards);
//         } catch (error) {
//             console.log("Error fetching kudos board", error);
//         }
//         return (
//             <div className="card-list">
//                 {cards.map((card) => (
//                     <div key={card.board_id} className="card-preview">
//                         <img
//                         src={card.gif}
//                         alt={card.title}
//                         />
//                         <h3>{card.title}</h3>
//                         <p>{card.message}</p>
//                         <p>{card.owner}</p>
//                     </div>
//                 ))}
//             </div>
//         )
//     };

//     return (
//         <div className="home-page">
//             <main className="search">
//                 <input
//                     type="text"
//                     placeholder="Search boards..."
//                     value={searchQuery}
//                     onChange={(event) => setSearchQuery(event.target.value)}
//                 />
//             </main>
//             <div className="category-buttons">
//                 <button className="button-common category-button">
//                     All
//                 </button>
//                 <button className="button-common category-button">
//                     Recent
//                 </button>
//                 <button className="button-common category-button">
//                     Celebration
//                 </button>
//                 <button className="button-common category-button">
//                     Thank You
//                 </button>
//                 <button className="button-common category-button">
//                     Inspiration
//                 </button>
//             </div>
//             <CreateBoard/>
//             <div className='board-list'>
//                 {boards.map((board) => (
//                         <div key={board.board_id} className="board-preview">
//                                 <img
//                                 src={`https://picsum.photos/200/300?random=${board.board_id}`}
//                                 alt={board.board_id}
//                                 />
//                                 <h3>{board.title}</h3>
//                                 <p>{board.category}</p>
//                                 <button className="button-common view-board" onClick={fetchCards()}>View Board</button>
//                                 {/* <Link to={`/boards/${board.board_id}`} className="button-common view-board">
//                                 View Board
//                             </Link> */}
//                                 {/* <button
//                                 className="button-common delete-board"
//                                 onClick={() => deleteBoard(board.board_id)}
//                                 >
//                                 Delete Board
//                                 </button> */}
//                         </div>
//                     ))}
//             </div>
//         </div>
//     );
// }

// export default Homepage




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
            const url = (category === 'All') ? `http://localhost:3000/boards?search=${searchQuery}` : `http://localhost:3000/boards?category=${category}`;
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

    // useEffect(() => {
    //     fetchBoards(selectedCategory);
    // }, [selectedCategory]);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleBoardCreated = () => {
        fetchBoards(selectedCategory);
    };

    useEffect(() => {
        fetchBoards(selectedCategory);
        // if (searchQuery.length > 0) {  // Optionally, you can add a condition to start searching after a certain number of characters
        //     fetchBoards();
        // } else {
        //     setBoards([]);  // Clear boards when query is empty
        // }
    }, [selectedCategory, searchQuery]);  // Dependency array includes selectedCategory to refetch when it changes

    return (
            <div className='main-content'>
            <main className="search">
                <input
                type="text"
                placeholder="Search boards..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
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