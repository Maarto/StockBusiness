import { Route, Routes } from 'react-router-dom';

// Importing Routes

import Homepage from '../pages/dashboard/homepage';
import LoginForm from '../pages/auth/Login/Loginform';
import ProtectedRoutes from '../utils/protected.routes';

function EnviromentRoutes() {
  return (
    <Routes>

      <Route path='/auth/login' element={<LoginForm />} />

      <Route element={<ProtectedRoutes />}>
        <Route path='/dashboard' element={<Homepage />} />
      </Route>


    </Routes>
  );
}

export default EnviromentRoutes;