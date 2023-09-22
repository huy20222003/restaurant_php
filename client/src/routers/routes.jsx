import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import SimpleLayout from '../layouts/simple';
import HomeLayout from '../layouts/home';
//user page
import HomePage from '../Pages/User/HomePage';
import LoginPage from '../Pages/User/Auth/Login';
import RegisterPage from '../Pages/User/Auth/Register';
import Page404 from '../Pages/Page404';
import { ProductsPage, ProductPageDetail } from '../Pages/User/ProductsPage';
import DashboardAppPage from '../Pages/User/DashboardAppPage';
import CartPage from '../Pages/User/CartPages';
import {
  OrderPage,
  OrderSuccessPage,
  OrderPageDetail,
} from '../Pages/User/OrderPage';
import ProfilePage from '../Pages/User/ProfilePage';
import FAQPage from '../Pages/User/FAQPage';
import AboutPage from '../Pages/User/AboutPage';
//Admin Page
import AdminLogin from '../Pages/Admin/Auth/AdminLogin';
import AdminDashboard from '../Pages/Admin/AdminDashboard';
import DashboardLayoutAdmin from '../layouts/admin/DashboardLayoutAdmin';
import CategoryManage from '../Pages/Admin/CategoryManage';
import { CustomerManage, CustomerDetail } from '../Pages/Admin/CustomerManage';
import { ProductManage, ProductForm } from '../Pages/Admin/ProductManage';
import EmployeeManage from '../Pages/Admin/EmployeeManage';
import OrderManage from '../Pages/Admin/OrderManage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <HomeLayout />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/faq', element: <FAQPage /> },
        { path: '/about', element: <AboutPage /> },
      ],
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'products/:_id', element: <ProductPageDetail /> },
        { path: 'cart', element: <CartPage /> },
        { path: 'cart/order-success', element: <OrderSuccessPage /> },
        { path: 'order', element: <OrderPage /> },
        { path: 'order/:_id', element: <OrderPageDetail /> },
        { path: 'profile', element: <ProfilePage /> },
      ],
    },
    { path: 'faq', element: <FAQPage /> },
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
        { path: '/admin', element: <AdminDashboard /> },
        { path: '/admin/customer-manage', element: <CustomerManage /> },
        { path: '/admin/customer-manage/:_id', element: <CustomerDetail /> },
        { path: '/admin/employee-manage', element: <EmployeeManage /> },
        { path: '/admin/product-manage', element: <ProductManage /> },
        { path: '/admin/product-manage/create', element: <ProductForm /> },
        { path: '/admin/product-manage/edit/:_id', element: <ProductForm /> },
        { path: '/admin/category-manage', element: <CategoryManage /> },
        { path: '/admin/order-manage', element: <OrderManage /> },
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
