import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { user, token, isAuthenticated, isSeller } = useAuth();

  const [stats, setStats] = useState({
    totalFoodItems: 0,
    availableFoodItems: 0,
    averageRating: 0,
    totalReviews: 0,
  });
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated() || !isSeller()) {
      navigate("/login");
      return;
    }

    fetchDashboardData(token);
  }, [navigate, isAuthenticated, isSeller, token]);

  const fetchDashboardData = async (token) => {
    try {
      const response = await fetch(
        "https://wbc-backend-13ki.onrender.com/api/seller/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setStats(data.data.stats);
        setFoodItems(data.data.recentFoodItems);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  //   return (
  //     <div className="dashboard">
  //       <div className="container">
  //         {/* Header */}
  //         <div className="dashboard-header">
  //           <div className="welcome-section">
  //             <h1>Welcome back, {user?.name}!</h1>
  //             <p>Manage your homemade food business and grow your sales</p>
  //           </div>
  //           <div className="header-actions">
  //             <Link to="/add-food-item" className="btn btn-primary">
  //               + Add New Homemade Item
  //             </Link>
  //           </div>
  //         </div>

  {
    /* Homemade Guidelines */
  }
  // <div className="homemade-notice">
  //   <div className="notice-content">
  //     <div className="notice-icon">🏠</div>
  //     <div className="notice-text">
  //       <h3>Homemade Items Only</h3>
  //       <p>
  //         Remember: This platform is exclusively for homemade food items.
  //         All items must be prepared in your home kitchen using fresh
  //         ingredients and traditional recipes.
  //       </p>
  //     </div>
  //   </div>
  // </div>

  //         {/* Stats Cards */}
  //         <div className="stats-grid">
  //           <div className="stat-card">
  //             <div className="stat-icon">🍽️</div>
  //             <div className="stat-content">
  //               <h3>{stats.totalFoodItems}</h3>
  //               <p>Total Food Items</p>
  //             </div>
  //           </div>
  //           <div className="stat-card">
  //             <div className="stat-icon">✅</div>
  //             <div className="stat-content">
  //               <h3>{stats.availableFoodItems}</h3>
  //               <p>Available Items</p>
  //             </div>
  //           </div>
  //           <div className="stat-card">
  //             <div className="stat-icon">⭐</div>
  //             <div className="stat-content">
  //               <h3>{stats.averageRating.toFixed(1)}</h3>
  //               <p>Average Rating</p>
  //             </div>
  //           </div>
  //           <div className="stat-card">
  //             <div className="stat-icon">💬</div>
  //             <div className="stat-content">
  //               <h3>{stats.totalReviews}</h3>
  //               <p>Total Reviews</p>
  //             </div>
  //           </div>
  //         </div>

  {
    /* Recent Food Items */
  }
  <div className="dashboard-section">
    <div className="section-header">
      <h2>Recent Food Items</h2>
      <Link to="/my-food-items" className="btn btn-secondary">
        View All
      </Link>
    </div>

    {foodItems.length > 0 ? (
      <div className="food-items-grid">
        {foodItems.map((item) => (
          <div key={item._id} className="food-item-card">
            <div className="food-item-image">
              {item.images && item.images.length > 0 ? (
                <img src={item.images[0]} alt={item.name} />
              ) : (
                <div className="no-image">No Image</div>
              )}
            </div>
            <div className="food-item-content">
              <h3>{item.name}</h3>
              <p className="food-item-price">${item.price}</p>
              <p className="food-item-category">{item.category}</p>
              <div className="food-item-rating">
                <span className="rating">
                  ⭐ {item.rating.average.toFixed(1)}
                </span>
                <span className="reviews">({item.rating.count} reviews)</span>
              </div>
              <div className="food-item-actions">
                <Link
                  to={`/edit-food-item/${item._id}`}
                  className="btn btn-small"
                >
                  Edit
                </Link>
                <button className="btn btn-small btn-danger">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="empty-state">
        <div className="empty-icon">🍽️</div>
        <h3>No food items yet</h3>
        <p>Start by adding your first food item to begin selling</p>
        <Link to="/add-food-item" className="btn btn-primary">
          Add Your First Item
        </Link>
      </div>
    )}
  </div>;

  {
    /* Quick Actions */
  }
  <div className="dashboard-section">
    <h2>Quick Actions</h2>
    <div className="quick-actions">
      <Link to="/add-food-item" className="quick-action-card">
        <div className="action-icon">➕</div>
        <h3>Add Food Item</h3>
        <p>Create a new food item listing</p>
      </Link>
      <Link to="/my-food-items" className="quick-action-card">
        <div className="action-icon">📋</div>
        <h3>Manage Items</h3>
        <p>View and edit your food items</p>
      </Link>
      <Link to="/orders" className="quick-action-card">
        <div className="action-icon">📦</div>
        <h3>View Orders</h3>
        <p>Check your order history</p>
      </Link>
      <Link to="/profile" className="quick-action-card">
        <div className="action-icon">👤</div>
        <h3>Edit Profile</h3>
        <p>Update your business information</p>
      </Link>
    </div>
  </div>;
  // </div>
  // </div>
  // );
};

export default SellerDashboard;
