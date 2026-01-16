import React from 'react';  
import "./elder.css";

const Sidebar = ({active, setActive}) => {  
    const items=[
        {id:"home", label:"Home", icon:"fa-solid fa-house"},
        {id:"profile", label:"Profile", icon:"fa-solid fa-user"},
        {id:"tasks", label:"Tasks", icon:"fa-solid fa-list-check"},
        {id:"medications", label:"Medications", icon:"fa-solid fa-pills"},
        {id:"emergency", label:"Emergency", icon:"fa-solid fa-phone"},
        {id:"settings", label:"Settings", icon:"fa-solid fa-gear"},
        {id:"logout", label:"Logout", icon:"fa-solid fa-right-from-bracket"},
    ];
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