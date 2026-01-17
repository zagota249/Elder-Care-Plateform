import React from 'react';  
import "./elder.css";

const Sidebar = ({active, setActive, role = "elder", user = null}) => {
    // Get user from localStorage if not provided
    const currentUser = user || (() => {
        try {
            return JSON.parse(localStorage.getItem("user") || '{}');
        } catch {
            return {};
        }
    })();

    // Role labels
    const roleLabels = {
        elder: "Elder",
        admin: "Admin",
        familyMember: "Family",
        caregiver: "Volunteer"
    };

    // Define menu items based on user role - matching the design
    const menuItems = {
        elder: [
            {id:"home", label:"Home", icon:"fa-solid fa-house"},
            {id:"medicines", label:"Medicines", icon:"fa-solid fa-pills"},
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
            {id:"home", label:"Dashboard", icon:"fa-solid fa-gauge-high"},
            {id:"elders", label:"My Elders", icon:"fa-solid fa-user-group"},
            {id:"medications", label:"Medicines", icon:"fa-solid fa-pills"},
            {id:"tasks", label:"Tasks", icon:"fa-solid fa-list-check"},
            {id:"messages", label:"Messages", icon:"fa-solid fa-comments"},
            {id:"notifications", label:"Notifications", icon:"fa-solid fa-bell"},
        ],
        caregiver: [
            {id:"home", label:"Dashboard", icon:"fa-solid fa-gauge-high"},
            {id:"helpRequests", label:"Help Requests", icon:"fa-solid fa-hand-holding-medical"},
            {id:"messages", label:"Messages", icon:"fa-solid fa-comments"},
            {id:"profile", label:"Profile", icon:"fa-solid fa-user"},
        ],
    };

    // Bottom menu items (Settings & Logout)
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
            <span className="app-subtitle">Support & Coordination</span>
          </div>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="sidebar-user">
        <div className="user-avatar">
          {currentUser.avatar ? (
            <img src={currentUser.avatar} alt={currentUser.name || "User"} />
          ) : (
            <span>{(currentUser.name || "U")[0].toUpperCase()}</span>
          )}
        </div>
        <div className="user-info">
          <span className="user-name">{currentUser.name || "User"}</span>
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
    </aside>
  );
};

export default Sidebar;