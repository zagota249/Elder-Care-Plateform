import React from 'react';  
import "./elder.css";

const Sidebar = ({active, setActive, role = "elder"}) => {
    // Get user info from localStorage
    const getUserInfo = () => {
      try {
        return JSON.parse(localStorage.getItem("user") || '{}');
      } catch {
        return {};
      }
    };
    const user = getUserInfo();

    // Role display names
    const roleLabels = {
      elder: "Elder",
      admin: "Administrator",
      familyMember: "Family Member",
      caregiver: "Volunteer"
    };

    // Define menu items based on user role
    const menuItems = {
        elder: [
            {id:"home", label:"Home", icon:"fa-solid fa-house"},
            {id:"medications", label:"Medicines", icon:"fa-solid fa-pills"},
            {id:"tasks", label:"Tasks", icon:"fa-solid fa-list-check"},
            {id:"messages", label:"Messages", icon:"fa-solid fa-comments"},
            {id:"profile", label:"Profile", icon:"fa-solid fa-user"},
        ],
        admin: [
            {id:"home", label:"Dashboard", icon:"fa-solid fa-gauge-high"},
            {id:"users", label:"Users", icon:"fa-solid fa-users"},
            {id:"volunteers", label:"Volunteers", icon:"fa-solid fa-hand-holding-heart"},
            {id:"sos", label:"SOS Alerts", icon:"fa-solid fa-triangle-exclamation"},
            {id:"reports", label:"Reports", icon:"fa-solid fa-chart-bar"},
        ],
        familyMember: [
            {id:"home", label:"Home", icon:"fa-solid fa-house"},
            {id:"elders", label:"My Elders", icon:"fa-solid fa-user-group"},
            {id:"medications", label:"Medications", icon:"fa-solid fa-pills"},
            {id:"tasks", label:"Tasks", icon:"fa-solid fa-list-check"},
            {id:"messages", label:"Messages", icon:"fa-solid fa-comments"},
        ],
        caregiver: [
            {id:"home", label:"Dashboard", icon:"fa-solid fa-house"},
            {id:"assigned", label:"Assigned Elders", icon:"fa-solid fa-clipboard-user"},
            {id:"schedule", label:"Schedule", icon:"fa-solid fa-calendar-days"},
            {id:"tasks", label:"Tasks", icon:"fa-solid fa-list-check"},
            {id:"messages", label:"Messages", icon:"fa-solid fa-comments"},
        ],
    };

    // Bottom menu items (same for all roles)
    const bottomItems = [
        {id:"settings", label:"Settings", icon:"fa-solid fa-gear"},
        {id:"logout", label:"Logout", icon:"fa-solid fa-right-from-bracket", className:"logout-item"},
    ];

    const items = menuItems[role] || menuItems.elder;

    return (
       <aside className="sidebar">
        {/* Logo Section */}
        <div className="sidebar-top">
          <div className="logo-section">
            <div className="logo-icon">
              <i className="fa-solid fa-heart-pulse"></i>
            </div>
            <div className="logo-text">
              <h3 className="app-title">ElderCare</h3>
              <span className="app-subtitle">Health & Coordination</span>
            </div>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="sidebar-user">
          <div className="user-avatar">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="user-info">
            <span className="user-name">{user.name || "User"}</span>
            <span className="user-role">{roleLabels[role] || "User"}</span>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="nav">
          {items.map((it) => (
            <div
              key={it.id}
              className={`nav-item ${active === it.id ? "active" : ""}`}
              onClick={() => setActive(it.id)}
            >
              <i className={`nav-icon ${it.icon}`}></i>
              <span className="nav-label">{it.label}</span>
            </div>
          ))}
        </nav>

        {/* Bottom Navigation */}
        <div className="nav-bottom">
          {bottomItems.map((it) => (
            <div
              key={it.id}
              className={`nav-item ${it.className || ""} ${active === it.id ? "active" : ""}`}
              onClick={() => setActive(it.id)}
            >
              <i className={`nav-icon ${it.icon}`}></i>
              <span className="nav-label">{it.label}</span>
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <small>v1.0</small>
        </div>
      </aside>
    );
};

export default Sidebar;