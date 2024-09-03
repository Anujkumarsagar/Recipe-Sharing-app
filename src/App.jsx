import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HeroPage from './Pages/HeroPage';
import RecipeComponent from './Pages/RecipeComponent';
import Navbar from './Components/Navbar';
import EnhancedLoginToggle from './Components/EnhancedLoginToggle';

function App() {
  return (
    <Router>
      <div>
        <div className='sticky top-0 z-20 bg-white bg-opacity-70 bg-blend-saturation'>
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/Recipes" element={<RecipeComponent />} /> {/* Example route */}
          <Route path='/login' element={<EnhancedLoginToggle/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
