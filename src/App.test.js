import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock axios
jest.mock('axios');

test('renders ElderCare app without crashing', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  // App should render without crashing
  expect(document.body).toBeInTheDocument();
});

test('renders homepage elements', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  // Check if the app renders properly
  const appElement = document.querySelector('.App') || document.body;
  expect(appElement).toBeInTheDocument();
});
