import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home'
import Login from './pages/Login'
import Lost from './pages/Lost'
import Settings from './pages/Settings'
import Classes from './pages/Classes';
import SideNav from './pages/components/SideNav';
import RequireAuth from './pages/components/RequireAuth';

function App() {
  return (
    <>
      <SideNav />
    
      <Routes>
        {/* Before User Sign In */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Login />} />

        {/* After User Sign In */}
        <Route 
          path="/" 
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route 
          path='/classes' 
          element={
            <RequireAuth>
              <Classes />
            </RequireAuth>
          }
        />
        <Route 
          path='/settings' 
          element={
            <RequireAuth>
              <Settings />
            </RequireAuth>
          }
        />
        
        {/* Other */}
        <Route path='*' element={<Lost />} />
      </Routes>
    </>
  );
}

export default App;
