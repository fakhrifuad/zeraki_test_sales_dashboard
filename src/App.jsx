import './App.css';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
       {/* <Route path="/about" element={<About />} />*/}


        {/* Add more routes for other pages */}
      </Routes>
    </Router>
  );
}

export default App;
