import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminOrUser from './Components/AdminOrUser';
import First from './Components/First';
import Signup from './Components/Signup';
import Upload from './Components/Upload';
import Orders from './Components/Orders';
import AdminDashboard from './Components/AdminDashboard';
import Payment from './Components/Payment';
import Adminlog from './Components/Adminlog';
import Dashboard from './Components/Dashboard';
import Shopmap from './Components/Shopmap';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AdminOrUser />} />
        <Route path='/first' element={<First />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/admindashboard' element={<AdminDashboard />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/alog' element={<Adminlog />} />
        <Route path='/dashboard' element={<Dashboard />} /> {/* ✅ Added Dashboard Route */}
        <Route path='/shopmap' element={<Shopmap/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
