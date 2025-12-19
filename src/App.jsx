import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';


const App = () => {
  return (
    <Router>
      <Routes>

        {/* Login Page */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={ <Dashboard /> }
        />
      </Routes>
    </Router>
  );
};

export default App;
