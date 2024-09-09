import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeroPage from './Pages/HeroPage';
import RecipeComponent from './Pages/RecipeComponent';
import Navbar from './Components/Navbar';
import EnhancedLoginToggle from './Components/EnhancedLoginToggle';
import ProfileDashboard from './Components/ProfileDashboard';

function App() {
  return (
    <Router>
      <div>
        <div className='sticky top-0 z-20 bg-white bg-opacity-70 bg-blend-saturation'>
          <Navbar />
        </div>

        <Routes>
          {/* Profile Dashboard Route */}
          <Route  path="/profile/*" element={<ProfileDashboard />} />

          {/* Default Home Route */}
          <Route path="/" element={<HeroPage />} />

          {/* Recipes Route */}
          <Route path="/Recipes" element={<RecipeComponent />} />

          {/* Login Route */}
          <Route path="/login" element={<EnhancedLoginToggle />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
