import React from 'react';  
import "./elder.css";

const Sidebar = ({active, setActive, role = "elder"}) => {
    // Define menu items based on user role
    const menuItems = {
        elder: [
            {id:"home", label:"Home", icon:"fa-solid fa-house"},
            {id:"profile", label:"Profile", icon:"fa-solid fa-user"},
            {id:"tasks", label:"Tasks", icon:"fa-solid fa-list-check"},
            {id:"medications", label:"Medications", icon:"fa-solid fa-pills"},
            {id:"emergency", label:"Emergency", icon:"fa-solid fa-phone"},
            {id:"settings", label:"Settings", icon:"fa-solid fa-gear"},
            {id:"logout", label:"Logout", icon:"fa-solid fa-right-from-bracket"},
        ],
        admin: [
            {id:"home", label:"Dashboard", icon:"fa-solid fa-gauge-high"},
            {id:"users", label:"Users", icon:"fa-solid fa-users"},
            {id:"volunteers", label:"Volunteers", icon:"fa-solid fa-hand-holding-heart"},
            {id:"sos", label:"SOS Alerts", icon:"fa-solid fa-triangle-exclamation"},
            {id:"reports", label:"Reports", icon:"fa-solid fa-chart-bar"},
            {id:"settings", label:"Settings", icon:"fa-solid fa-gear"},
            {id:"logout", label:"Logout", icon:"fa-solid fa-right-from-bracket"},
        ],
        familyMember: [
            {id:"home", label:"Home", icon:"fa-solid fa-house"},
            {id:"elders", label:"My Elders", icon:"fa-solid fa-user-group"},
            {id:"medications", label:"Medications", icon:"fa-solid fa-pills"},
            {id:"tasks", label:"Tasks", icon:"fa-solid fa-list-check"},
            {id:"messages", label:"Messages", icon:"fa-solid fa-comments"},
            {id:"settings", label:"Settings", icon:"fa-solid fa-gear"},
            {id:"logout", label:"Logout", icon:"fa-solid fa-right-from-bracket"},
        ],
        caregiver: [
            {id:"home", label:"Dashboard", icon:"fa-solid fa-house"},
            {id:"assigned", label:"Assigned Elders", icon:"fa-solid fa-clipboard-user"},
            {id:"schedule", label:"Schedule", icon:"fa-solid fa-calendar-days"},
            {id:"tasks", label:"Tasks", icon:"fa-solid fa-list-check"},
            {id:"messages", label:"Messages", icon:"fa-solid fa-comments"},
            {id:"settings", label:"Settings", icon:"fa-solid fa-gear"},
            {id:"logout", label:"Logout", icon:"fa-solid fa-right-from-bracket"},
        ],
    };

    const items = menuItems[role] || menuItems.elder;

    return (
       <aside className="sidebar">
      <div className="sidebar-top">
        <img
          src="/logo.png"
          alt="logo"
          className="logo"
        />
        <h3 className="app-title">ElderCare</h3>
      </div>

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

      <div className="sidebar-footer">
        <small>v1.0</small>
      </div>
    </aside>
  );
};

export default Sidebar;