import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage"
import Login from "./pages/Login"
import TaskForm from "./pages/TaskForm"
import Navbar from "./components/Navbar"
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
      <AuthProvider>
          <Router>
              <Navbar />
              <Routes>
                  <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/tasks/:id" element={<ProtectedRoute><TaskForm /></ProtectedRoute>} />
                  <Route path="/tasks/new" element={<ProtectedRoute><TaskForm /></ProtectedRoute>} />
              </Routes>
          </Router>
      </AuthProvider>
  );
}

export default App;