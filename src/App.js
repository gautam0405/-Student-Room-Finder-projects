import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PostRoom from './pages/PostRoom';
import SearchRoom from './pages/SearchRoom';
import SearchResults from './pages/SearchResults';
import HostelPage from './pages/HostelPage';
import HostelResults from './pages/HostelResults';
import AgentDashboard from './pages/AgentDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post-room" element={<PostRoom />} />
          <Route path="/search-room" element={<SearchRoom />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/hostel/:gender" element={<HostelPage />} />
          <Route path="/hostel-results" element={<HostelResults />} />
          <Route path="/agent-dashboard" element={<AgentDashboard />} />
        </Routes>
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;