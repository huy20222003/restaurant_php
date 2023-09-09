import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import SimpleLayout from '../layouts/simple';
//user page
import LoginPage from '../Pages/User/Auth/Login';
import RegisterPage from '../Pages/User/Auth/Register';
import Page404 from '../Pages/Page404';
import { ProductsPage, ProductPageDetail } from '../Pages/User/ProductsPage';
import DashboardAppPage from '../Pages/User/DashboardAppPage';
import CartPage from '../Pages/User/CartPages';
import OrderPage from '../Pages/User/OrderPage';
//Admin Page
import AdminLogin from '../Pages/Admin/Auth/AdminLogin';
import AdminDashboard from '../Pages/Admin/AdminDashboard';
import DashboardLayoutAdmin from '../layouts/admin/DashboardLayoutAdmin';
import CategoryManage from '../Pages/Admin/CategoryManage';
import CustomerManage from '../Pages/Admin/CustomerManage';
import ProductManage from '../Pages/Admin/ProductManage';
import EmployeeManage from '../Pages/Admin/EmployeeManage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'products/:_id', element: <ProductPageDetail /> },
        { path: 'cart', element: <CartPage /> },
        { path: 'order', element: <OrderPage /> },
      ],
    },
    {
      path: 'auth/login',
      element: <LoginPage />,
    },
    {
      path: 'auth/register',
      element: <RegisterPage />,
    },
    {
      path: 'auth/admin/login',
      element: <AdminLogin />,
    },
    {
      path: '/admin',
      element: <DashboardLayoutAdmin />,
      children: [
        { path: 'dashboard', element: <AdminDashboard /> },
        { path: 'category-manage', element: <CategoryManage /> },
        { path: 'customer-manage', element: <CustomerManage /> },
        { path: 'employee-manage', element: <EmployeeManage /> },
        { path: 'product-manage', element: <ProductManage /> },
      ],
    },
    {
      element: <SimpleLayout />,
      // children: [
      //   { element: <Navigate to="/dashboard/app" />, index: true },
      //   { path: '404', element: <Page404 /> },
      //   { path: '*', element: <Navigate to="/404" /> },
      // ],
    },
    {
      path: '*',
      element: <Page404 />,
    },
  ]);

  return routes;
}
