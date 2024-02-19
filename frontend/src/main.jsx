import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './components/Login.jsx';
import PageNotFound from './components/PageNotFound.jsx';
import Registration from './components/Registration.jsx';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Login />,
//     errorElement: <PageNotFound />
//   },
//   {
//     path: "/registration",
//     element: <Registration />
//   }
// ])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
)
