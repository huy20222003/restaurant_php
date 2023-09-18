import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from '../layouts/dashboard';
import SimpleLayout from '../layouts/simple';
import HomeLayout from '../layouts/home';
import HomePage from '../Pages/User/HomePage';
import LoginPage from '../Pages/User/Auth/Login';
import RegisterPage from '../Pages/User/Auth/Register';
import Page404 from '../Pages/Page404';
import { ProductsPage, ProductPageDetail } from '../Pages/User/ProductsPage';
import DashboardAppPage from '../Pages/User/DashboardAppPage';
import CartPage from '../Pages/User/CartPages';
import { OrderPage, OrderSuccessPage } from '../Pages/User/OrderPage';
import ProfilePage from '../Pages/User/ProfilePage';
import FAQPage from '../Pages/User/FAQPage';
import AboutPage from '../Pages/User/AboutPage';
import AdminLogin from '../Pages/Admin/Auth/AdminLogin';
import AdminDashboard from '../Pages/Admin/AdminDashboard';
import DashboardLayoutAdmin from '../layouts/admin/DashboardLayoutAdmin';
import CategoryManage from '../Pages/Admin/CategoryManage';
import CustomerManage from '../Pages/Admin/CustomerManage';
import { ProductManage, ProductForm } from '../Pages/Admin/ProductManage';
import EmployeeManage from '../Pages/Admin/EmployeeManage';

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <HomeLayout />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: 'faq', element: <FAQPage /> },
        { path: 'about', element: <AboutPage /> },
      ],
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { index: true, element: <DashboardAppPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'products/:_id', element: <ProductPageDetail /> },
        {
          path: 'cart',
          element: <CartPage />,
          children: [
            { path: 'cart-order-success', element: <OrderSuccessPage /> },
          ],
        },
        { path: 'order', element: <OrderPage /> },
        { path: 'profile', element: <ProfilePage /> },
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
        { path: '/', element: <AdminDashboard /> },
        { path: 'customer-manage', element: <CustomerManage /> },
        { path: 'employee-manage', element: <EmployeeManage /> },
        { path: 'product-manage', element: <ProductManage /> },
        { path: 'product-manage/create', element: <ProductForm /> },
        { path: 'category-manage', element: <CategoryManage /> },
      ],
    },
    {
      element: <SimpleLayout />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" />,
    },
  ]);

  return routes;
}
