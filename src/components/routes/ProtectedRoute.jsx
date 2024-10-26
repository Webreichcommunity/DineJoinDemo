import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';

const App = () => {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [foodItems, setFoodItems] = useState([]);

  const ProtectedRoute = ({ children }) => {
    return adminLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AdminLogin setAdminLoggedIn={setAdminLoggedIn} />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminPanel foodItems={foodItems} setFoodItems={setFoodItems} />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
