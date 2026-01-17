// src/RouterWrapper.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

/**
 * RouterWrapper ensures a single BrowserRouter wraps your app.
 * All nested components can safely use Routes, Link, useNavigate, etc.
 */
export default function RouterWrapper({ children }) {
  return <BrowserRouter>{children}</BrowserRouter>;
}
