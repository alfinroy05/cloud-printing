import logo from './logo.svg';
import './App.css';

import First from './Components/First';
import Signup from './Components/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Upload from './Components/Upload';
import Orders from './Components/Orders';
import AdminOrUser from './Components/AdminOrUser';
import AdminDashboard from './Components/AdminDashboard';
import Payment from './Components/Payment';
import Adminlog from './Components/Adminlog';
import Shopmap from './Components/Shopmap'; // ✅ Import the Map Component

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
        
        {/* ✅ Add Map Route */}
        <Route path='/map' element={<Shopmap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
