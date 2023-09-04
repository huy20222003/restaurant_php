//PageUser
//Auth
import Login from '../Pages/User/Auth/Login';
import Register from '../Pages/User/Auth/Register';

//Product
import Dashboard from '../Pages/User/Dashboard';
import Dishes from '../Pages/User/Dishes';
import DishDetail from '../Pages/User/DishDetail';

//User
import Profile from '../Pages/User/Profile';
import Account from '../Pages/User/Account';
import Cart from '../Pages/User/Cart';

//Service
import About from '../Pages/User/About';
import Contact from '../Pages/User/Contact';
import Service from '../Pages/User/Service';

//PageAdmin
import AdminLogin from '../Pages/Admin/Auth/AdminLogin';
import AdminDashboard from '../Pages/Admin/AdminDashboard';
import CustomerManage from '../Pages/Admin/CustomerManage';
import CustomerDetail from '../Pages/Admin/CustomerManage/CustomerDetail';
import EmployeeManage from '../Pages/Admin/EmployeeManage';
import DishManage from '../Pages/Admin/DishManage';
import CategoryManage from '../Pages/Admin/CategoryManage';
import Charts from '../Pages/Admin/Charts';

const noDefaultLayout = [
  { path: '/auth/login', element: Login },
  { path: '/auth/register', element: Register },
  { path: '/auth/admin/login', element: AdminLogin },
];

const defaultLayoutUser = [
  { path: '/', element: Dashboard },
  { path: '/dishes', element: Dishes },
  { path: '/dishes/:_id', element: DishDetail },
  { path: '/about', element: About },
  { path: '/contact', element: Contact },
  { path: '/service', element: Service },
  { path: '/user/profile', element: Profile },
  { path: '/user/account', element: Account },
  { path: '/user/cart', element: Cart },
];

const defaultLayoutAdmin = [
  { path: '/admin', element: AdminDashboard },
  { path: '/admin/customer-manage', element: CustomerManage },
  { path: '/admin/customer-manage/:_id', element: CustomerDetail },
  { path: '/admin/employee-manage/', element: EmployeeManage },
  { path: '/admin/employee-manage/:_id', element: CategoryManage },
  { path: '/admin/dish-manage', element: DishManage },
  { path: '/admin/dish-manage/:_id', element: CategoryManage },
  { path: '/admin/category-manage', element: CategoryManage },
  { path: '/admin/category-manage/:_id', element: CategoryManage },
  { path: '/admin/chart', element: Charts }
]

export { noDefaultLayout, defaultLayoutUser, defaultLayoutAdmin  };
