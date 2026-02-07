import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: 'user',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.role || !formData.email || !formData.password) {
      alert('Please fill all fields!');
      return;
    }

    // Store user in localStorage
    const userData = {
      ...formData,
      name: formData.email.split('@')[0]
    };
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
    
    // Trigger custom event for Navbar to update
    window.dispatchEvent(new Event('user-login'));
    
    // Redirect based on role
    if (formData.role === 'agent') {
      navigate('/agent-dashboard');
    } else if (formData.role === 'employee') {
      navigate('/employee-dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="auth-container">
      <div className="form-section glass">
        <h2>Welcome Back</h2>
        <p>Login to continue your journey</p>
        <form onSubmit={handleSubmit}>
          <div className="role-selection">
            <label>Select Role:</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={formData.role === 'user'}
                  onChange={handleChange}
                />
                <span>1. User</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="role"
                  value="agent"
                  checked={formData.role === 'agent'}
                  onChange={handleChange}
                />
                <span>2. Agent</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="role"
                  value="employee"
                  checked={formData.role === 'employee'}
                  onChange={handleChange}
                />
                <span>3. Employee</span>
              </label>
            </div>
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn-primary">Login</button>
        </form>
        <p className="link-text">
          New user? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;