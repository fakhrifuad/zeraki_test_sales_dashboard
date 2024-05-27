import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
       {/* <Route path="/about" element={<About />} />*/}


        {/* Add more routes for other pages */}
      </Routes>
    </Router>
  );
}

export default App;
