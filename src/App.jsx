import './App.css';
import Dashboard from './components/Dashboard';
import Schools from './components/Schools';
import SchoolDetails from './components/SchoolDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/schools" element={<Schools />} />
        <Route path="/schools/:schoolId" element={<SchoolDetails />} />

       {/* <Route path="/about" element={<About />} />*/}


        {/* Add more routes for other pages */}
      </Routes>
    </Router>
  );
}

export default App;
