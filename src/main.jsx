import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import AuthLayout from './components/authentication/AuthLayout.jsx'
import Login from './components/authentication/Login.jsx'
import SignUp from './components/authentication/SignUp.jsx'
import HomeLayout from './components/HomeLayout/HomeLayout.jsx'
import ProfileDetail from './components/ProfileSection/ProfileDetail.jsx'
import Preview from './components/PreviewComponent/Preview.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AuthLayout />}>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
      </Route>

      <Route path='/' element={<HomeLayout />}>
        <Route index element={<App />} />
        <Route path='profile' element={<ProfileDetail />} />
        <Route path='preview' element={<Preview />} />
      </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
