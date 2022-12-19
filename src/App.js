import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Lost from './pages/Lost'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='*' element={<Lost />} />
    </Routes>
  );
}

export default App;
