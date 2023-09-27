import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import SimpleLayout from '../layouts/simple';
import HomeLayout from '../layouts/home';
//user page
const HomePage = lazy(() => import('../Pages/User/HomePage'));
const LoginPage = lazy(() => import('../Pages/User/Auth/Login'));
const RegisterPage = lazy(()=> import('../Pages/User/Auth/Register'));
const Page404 = lazy(()=> import('../Pages/Page404'));
const ProductsPage = lazy(() => import('../Pages/User/ProductsPage/ProductsPage'));
const ProductPageDetail = lazy(() => import('../Pages/User/ProductsPage/ProductPageDetail'));
const DashboardAppPage = lazy(() => import('../Pages/User/DashboardAppPage'));
const CartPage = lazy(() => import('../Pages/User/CartPages'));
const OrderPage = lazy(() => import('../Pages/User/OrderPage/OrderPage'));
const OrderPageDetail = lazy(() => import('../Pages/User/OrderPage/OrderPageDetail'));
const ProfilePage = lazy(() => import('../Pages/User/ProfilePage'));
const FAQPage = lazy(() => import('../Pages/User/FAQPage'));
const AboutPage = lazy(() => import('../Pages/User/AboutPage'));
const SettingPage = lazy(() => import('../Pages/User/SettingPage'));
//Admin Page
const AdminLogin = lazy(() => import('../Pages/Admin/Auth/AdminLogin'));
const AdminDashboard = lazy(() => import('../Pages/Admin/AdminDashboard'));
const DashboardLayoutAdmin = lazy(() => import('../layouts/admin/DashboardLayoutAdmin'));
const CategoryManage = lazy(() => import('../Pages/Admin/CategoryManage/CategoryManage'));
const CategoryDetail = lazy(() => import('../Pages/Admin/CategoryManage/CategoryDetail'));
const CustomerManage = lazy(() => import('../Pages/Admin/CustomerManage/CustomerManage'));
const CustomerDetail = lazy(() => import('../Pages/Admin/CustomerManage/CustomerDetail'));
const ProductManage = lazy(() => import('../Pages/Admin/ProductManage/ProductManage'));
const ProductForm = lazy(() => import('../Pages/Admin/ProductManage/ProductForm'));
const EmployeeManage = lazy(() => import('../Pages/Admin/EmployeeManage/EmployeeManage'));
const EmployeeDetail = lazy(() => import('../Pages/Admin/EmployeeManage/EmployeeDetail'));
const OrderManage = lazy(() => import('../Pages/Admin/OrderManage/OrderManage'));
const OrderDetail = lazy(() => import('../Pages/Admin/OrderManage/OrderDetail'));
const ProfileAdminPage = lazy(() => import('../Pages/Admin/Profile'));
const SettingAdminPage = lazy(() => import('../Pages/Admin/Setting'));
//loader
import Loader from '../Components/Loader';
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
        { path: 'order', element: <OrderPage /> },
        { path: 'order/:_id', element: <OrderPageDetail /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'setting', element: <SettingPage /> },
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
        { path: 'customer-manage', element: <CustomerManage /> },
        { path: 'customer-manage/:_id', element: <CustomerDetail /> },
        { path: 'employee-manage', element: <EmployeeManage /> },
        { path: 'employee-manage/:_id', element: <EmployeeDetail /> },
        { path: 'product-manage', element: <ProductManage /> },
        { path: 'product-manage/create', element: <ProductForm /> },
        { path: 'product-manage/edit/:_id', element: <ProductForm /> },
        { path: 'category-manage', element: <CategoryManage /> },
        { path: 'category-manage/:_id', element: <CategoryDetail /> },
        { path: 'order-manage', element: <OrderManage /> },
        { path: 'order-manage/:_id', element: <OrderDetail /> },
        { path: 'profile', element: <ProfileAdminPage /> },
        { path: 'setting', element: <SettingAdminPage /> },
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

  return <Suspense fallback={<Loader />}>{routes}</Suspense>;
}
