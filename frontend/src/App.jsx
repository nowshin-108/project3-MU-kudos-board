import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Homepage from './Components/Homepage/Homepage'
import { CiLinkedin } from "react-icons/ci";
import BoardDetails from './Components/BoardPage/BoardPage';

function App() {
  return (
    <BrowserRouter>
      <div>
        <header><h1>KudosBoard</h1></header>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/boards/:board_id/cards" element={<BoardDetails />} />
        </Routes>
        <footer><a href="https://www.linkedin.com/in/nowshinanber/"><CiLinkedin /></a></footer>
      </div>
    </BrowserRouter>
  );
}

export default App
