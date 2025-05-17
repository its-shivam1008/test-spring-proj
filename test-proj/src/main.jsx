import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AllEmployee from './components/AllEmployee'
import AddForm from './components/AddForm'
import GetEmployee from './components/GetEmployee'
import UpdateEmployee from './components/UpdateEmployee'


const router = createBrowserRouter([
  {
    path:'/',
    element:<App />,
    children:[
      {
        path:"/",
        element:<AddForm/>
      },
      {
        path:"/employees",
        element:<AllEmployee/>
      },
      {
        path:"/get-employee",
        element:<GetEmployee/>
      },
      {
        path:"/update-employee",
        element:<UpdateEmployee/>
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}/>
  </StrictMode>,
)
