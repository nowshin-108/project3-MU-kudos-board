// import { useState } from 'react';
// import PropTypes from 'prop-types';
// import "./Board.css";

// function DeleteBoard({ searchQuery }) {
//     const handleSearch = async (searchQuery) => {
//         try {
//             const response = await fetch(`http://localhost:3000/boards?search=${searchQuery}`);
//             const data = await response.json();
//             setBoards(data.boards);
//         } catch (error) {
//             console.error('Failed to fetch boards:', error);
//         }
//     };
//     return (
//         <input
//         type="text"
//         placeholder="Search boards..."
//         value={searchQuery}
//         onChange={(event) => setSearchQuery(event.target.value)}
//         />
//     );
// }

// DeleteBoard.propTypes = {
//     onBoardCreated: PropTypes.func.isRequired,
//     id: PropTypes.number.isRequired
// };

// export default DeleteBoard

