import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePost from './routes/createPost.jsx'
import PostDetail from './routes/postDetail.jsx'
import EditPost from './routes/editPost.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
      <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index={true} element={<App />} />
          <Route index={false} path="/MakePost" element={<CreatePost />} />
          <Route index={false} path="/postdetail/:id" element={<PostDetail />} />
          <Route index={false} path="/editpost/:id" element={<EditPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
)
