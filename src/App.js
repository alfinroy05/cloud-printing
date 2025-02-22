import logo from './logo.svg';
import './App.css';

import First from './Components/First';
import Signup from './Components/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<First/>}/>
    <Route path='/signup' element={<Signup/>}/>
  </Routes>
  </BrowserRouter>
  );
}

export default App;
