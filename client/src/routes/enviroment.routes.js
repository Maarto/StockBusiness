import { Route, Routes } from 'react-router-dom';

// Importing Routes

import Homepage from '../pages/dashboard/homepage';
import LoginForm from '../pages/auth/Login/Loginform';
import ProtectedRoutes from '../utils/protected.routes';
import Errorpage from '../pages/error/errorpage';
import DashBoard__NavigateBar from '../components/dashboard/navigation/navBar';
import ProfileConfiguration from '../pages/dashboard/configpanel';

function EnviromentRoutes({ enableNavigate, setEnableNavigate }) {
  return (
    <Routes>

      <Route path="*" element={<Errorpage />} />
      <Route path='/auth/login' element={<LoginForm />} />

      <Route element={<ProtectedRoutes />}>
        <Route path='/dashboard' element={<Homepage enableNavigate={enableNavigate} setEnableNavigate={setEnableNavigate}/>}/>
        <Route path='/dashboard/profile/config' element={<ProfileConfiguration enableNavigate={enableNavigate} setEnableNavigate={setEnableNavigate}/>}/>
      </Route>


    </Routes>
  );
}

export default EnviromentRoutes;