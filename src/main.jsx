import React from 'react'
import ReactDOM from 'react-dom/client'
import routes from './router'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { StockProvider } from './context/stockContext'

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StockProvider>
      <RouterProvider router={router}></RouterProvider>
    </StockProvider>
  </React.StrictMode>
)
