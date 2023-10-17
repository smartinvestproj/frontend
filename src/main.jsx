import React from 'react'
import ReactDOM from 'react-dom/client'
import routes from './router'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Modal from 'react-modal';

Modal.setAppElement('#root');

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
)
