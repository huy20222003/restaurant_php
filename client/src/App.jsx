import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//PageUser
//Auth
import Login from './Pages/User/Auth/Login';
import Register from './Pages/User/Auth/Register';

//Product
import Dashboard from './Pages/User/Dashboard';
import Dishes from './Pages/User/Dishes';

//PageAdmin
import AdminLogin from './Pages/Admin/Auth/AdminLogin';
import AdminDashboard from './Pages/Admin/AdminDashboard';

//DefaultLayout
import DefaultLayout from './DefaultLayout';

function App() {
  return (
    <Router>
      <div className="App">
        <DefaultLayout>
        <Routes>
          {/* User */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path='/' element={<Dashboard />} />
          <Route path='/dishes' element={<Dishes />} />
          {/* Admin */}
          <Route path="/auth/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
        </DefaultLayout>
      </div>
    </Router>
  );
}

export default App;
