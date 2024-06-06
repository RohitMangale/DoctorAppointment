import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Doctors from '../pages/Doctors/Doctors'
import DoctorDetails from '../pages/Doctors/DoctorDetails'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Contactus from '../pages/Contactus'
import Services from '../pages/Services'
import MyAccount from '../Dashboards/user-account/MyAccount'
import Dashboard from '../Dashboards/doctor-account/Dashboard'
import ProtectedRoutes from './ProtectedRoutes'

const Router = () => {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:id' element={<DoctorDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/contact' element={<Contactus />} />
        <Route path='/services' element={<Services />} />
        <Route path='/users/profile/me' element={ <ProtectedRoutes allowedRoles={['patient']}> <MyAccount /> </ProtectedRoutes> } />
        <Route path='/doctors/profile/me' element={<ProtectedRoutes allowedRoles={['doctor']}> <Dashboard /> </ProtectedRoutes>} />
      </Routes>

  )
}

export default Router
