import React from 'react';  
import "./elder.css";

const Sidebar = ({active, setActive}) => {  
    const items=[

        {
            id:"home",label:"Home",icon:"fa fa-home"},
            {id:"profile",label:"Profile",icon:"fa fa-user"},
            {id:"tasks",label:"Tasks",icon:"fa fa-tasks"},
            {id:"medications",label:"Medications",icon:"fa fa-pills"},
            {id:"emergency",label:"Emergency",icon:"fa fa-phone"},
            {id:"settings",label:"Settings",icon:"fa fa-cog"},
            {id:"logout",label:"Logout",icon:"fa fa-sign-out-alt"},


    ];
    return (
       <aside className="sidebar">
      <div className="sidebar-top">
        <img
          src="/mnt/data/0cc31bac-a798-48fa-a6f6-a6d28de76a77.png"
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
            <span className="nav-icon">{it.icon}</span>
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