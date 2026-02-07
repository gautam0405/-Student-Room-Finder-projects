import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AgentDashboard.css';

const AgentDashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Check if user is logged in and is an agent
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!user || user.role !== 'agent') {
      navigate('/login');
      return;
    }
    setLoggedInUser(user);

    // Fetch all posts from localStorage
    const allPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(allPosts);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  const handleApprovePost = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index].status = 'approved';
    updatedPosts[index].approvedBy = loggedInUser.email;
    updatedPosts[index].approvedDate = new Date().toLocaleDateString();
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    alert('Post approved!');
  };

  const handleRejectPost = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index].status = 'rejected';
    updatedPosts[index].rejectedBy = loggedInUser.email;
    updatedPosts[index].rejectedDate = new Date().toLocaleDateString();
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    alert('Post rejected!');
  };

  const handleDeletePost = (index) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const updatedPosts = posts.filter((_, i) => i !== index);
      setPosts(updatedPosts);
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      alert('Post deleted!');
    }
  };

  const filteredPosts = filterStatus === 'all' 
    ? posts 
    : posts.filter(post => (post.status || 'pending') === filterStatus);

  return (
    <div className="agent-dashboard">
      {/* Header */}
      <div className="dashboard-header glass">
        <div className="header-content">
          <h1>🏢 Agent Dashboard</h1>
          <p>Welcome, {loggedInUser?.name || loggedInUser?.email}</p>
        </div>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </div>

      {/* Stats */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Posts</h3>
          <p className="stat-number">{posts.length}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Review</h3>
          <p className="stat-number">{posts.filter(p => (p.status || 'pending') === 'pending').length}</p>
        </div>
        <div className="stat-card">
          <h3>Approved</h3>
          <p className="stat-number">{posts.filter(p => p.status === 'approved').length}</p>
        </div>
        <div className="stat-card">
          <h3>Rejected</h3>
          <p className="stat-number">{posts.filter(p => p.status === 'rejected').length}</p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="filter-section glass">
        <h3>Filter Posts:</h3>
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            All ({posts.length})
          </button>
          <button 
            className={`filter-btn ${filterStatus === 'pending' ? 'active' : ''}`}
            onClick={() => setFilterStatus('pending')}
          >
            Pending
          </button>
          <button 
            className={`filter-btn ${filterStatus === 'approved' ? 'active' : ''}`}
            onClick={() => setFilterStatus('approved')}
          >
            Approved
          </button>
          <button 
            className={`filter-btn ${filterStatus === 'rejected' ? 'active' : ''}`}
            onClick={() => setFilterStatus('rejected')}
          >
            Rejected
          </button>
        </div>
      </div>

      {/* Posts List */}
      <div className="posts-container">
        {filteredPosts.length === 0 ? (
          <div className="no-posts glass">
            <p>No posts found</p>
          </div>
        ) : (
          filteredPosts.map((post, index) => (
            <div key={index} className={`post-card glass status-${post.status || 'pending'}`}>
              <div className="post-header">
                <div className="post-title-section">
                  <h3>📍 {post.location}</h3>
                  <span className={`status-badge status-${post.status || 'pending'}`}>
                    {(post.status || 'pending').toUpperCase()}
                  </span>
                </div>
                <div className="posted-by">
                  <span>Posted by: <strong>{post.postedBy || 'Anonymous'}</strong></span>
                  <span>Date: {post.postedDate || '--'}</span>
                </div>
              </div>

              <div className="post-details">
                <div className="detail-row">
                  <div className="detail-item">
                    <label>📍 Full Address:</label>
                    <p>{post.address}</p>
                  </div>
                  <div className="detail-item">
                    <label>🚪 Flat Number:</label>
                    <p>{post.flatNumber}</p>
                  </div>
                </div>

                <div className="detail-row">
                  <div className="detail-item">
                    <label>💰 Rent:</label>
                    <p className="highlight">₹{post.rent}/month</p>
                  </div>
                  <div className="detail-item">
                    <label>💳 Deposit:</label>
                    <p>₹{post.deposit}</p>
                  </div>
                </div>

                <div className="detail-row">
                  <div className="detail-item">
                    <label>🛏️ Room Type:</label>
                    <p>{post.roomType}</p>
                  </div>
                  <div className="detail-item">
                    <label>📅 Availability Date:</label>
                    <p>{post.availabilityDate}</p>
                  </div>
                </div>

                {post.description && (
                  <div className="detail-row">
                    <div className="detail-item full-width">
                      <label>📝 Description:</label>
                      <p>{post.description}</p>
                    </div>
                  </div>
                )}

                {post.amenities && (
                  <div className="detail-row">
                    <div className="detail-item full-width">
                      <label>🏠 Amenities:</label>
                      <p>{post.amenities}</p>
                    </div>
                  </div>
                )}

                {post.contact && (
                  <div className="detail-row">
                    <div className="detail-item">
                      <label>📞 Contact Number:</label>
                      <p>{post.contact}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Status Timeline */}
              {(post.status === 'approved' || post.status === 'rejected') && (
                <div className="status-timeline">
                  {post.status === 'approved' && (
                    <div className="timeline-item approved">
                      <span>✅ Approved by {post.approvedBy}</span>
                      <span>{post.approvedDate}</span>
                    </div>
                  )}
                  {post.status === 'rejected' && (
                    <div className="timeline-item rejected">
                      <span>❌ Rejected by {post.rejectedBy}</span>
                      <span>{post.rejectedDate}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              {(post.status === undefined || post.status === 'pending') && (
                <div className="action-buttons">
                  <button 
                    className="btn-approve"
                    onClick={() => handleApprovePost(posts.indexOf(post))}
                  >
                    ✅ Approve
                  </button>
                  <button 
                    className="btn-reject"
                    onClick={() => handleRejectPost(posts.indexOf(post))}
                  >
                    ❌ Reject
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => handleDeletePost(posts.indexOf(post))}
                  >
                    🗑️ Delete
                  </button>
                </div>
              )}

              {post.status !== 'pending' && (
                <div className="action-buttons">
                  <button 
                    className="btn-delete"
                    onClick={() => handleDeletePost(posts.indexOf(post))}
                  >
                    🗑️ Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AgentDashboard;
