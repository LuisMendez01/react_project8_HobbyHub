import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './routes/Layout';
import CreateView from './routes/CreateView.jsx';
import DisplayNewsFeed from './routes/DisplayNewsFeed.jsx';
import EditView from './routes/EditView.jsx';
import { Link } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<App />} />
          <Route index={false} path='/create' element={<CreateView />} />
          <Route index={false} path='/newsfeed' element={<DisplayNewsFeed />} />
          <Route index={false} path='/edit/:postId' element={<EditView />} />
          <Route
            path="*"
            element={
              <main>
              <div className="whole-page">
                <div className="main_page_">
                  <h2>There's nothing here!</h2>
                  <Link className="links" to="/">
                    Back to Home
                  </Link>
                  </div>
                </div>
              </main>
            }
          />
          </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
