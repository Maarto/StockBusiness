import { Route, Routes } from 'react-router-dom';

// Importing Routes

import Homepage from '../pages/dashboard/homepage';
import LoginForm from '../pages/auth/Login/Loginform';


function EnviromentRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Homepage/>}/>

      <Route path='/auth/login' element={<LoginForm/>}/>
    </Routes>
  );
}

export default EnviromentRoutes;