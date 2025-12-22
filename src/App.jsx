import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';


const App = () => {
  return (
    <Router>
      <Routes>

        {/* Login Page */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={ <Dashboard /> }
        />
        <Route path="/logout" element={<Logout/>}/>
      </Routes>
    </Router>
  );
};

export default App;
