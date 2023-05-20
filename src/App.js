import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home'
import Login from './pages/Login'
import Lost from './pages/Lost'
import Settings from './pages/Settings'
import Classes from './pages/Classes';
import SideNav from './pages/components/SideNav';
import BottomNav from './pages/components/BottomNav'
import RequireAuth from './pages/components/RequireAuth';
import { Flex } from '@chakra-ui/react';
import AboutUs from './pages/AboutUs';
import TestQuestions from './pages/TestQuestions';

function App() {
  return (
    <>
      <Flex>
        {/* Side Nav stacked ontop of everything but hidden without Auth */}
        <SideNav />
        <BottomNav />

        <Routes>
          {/* Before User Sign In */}
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Login />} />
          <Route path='/aboutus' element={<AboutUs />} />


          {/* 
            After User Sign In 
            Wrapped in Auth component to restrict to user login
          */}
          <Route path="/" element={<RequireAuth> <Home /> </RequireAuth>} />
          <Route path='/classes' element={<RequireAuth> <Classes /> </RequireAuth>} />
          <Route path='/settings' element={<RequireAuth> <Settings /> </RequireAuth>} />
          <Route path='/testQuestions' element={<RequireAuth> <TestQuestions /> </RequireAuth>} />

          {/* Other */}
          <Route path='*' element={<Lost />} />
        </Routes>
      </Flex>
    </>
  );
}

export default App;
