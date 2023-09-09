import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routers/routes';
// theme
import ThemeProviders from './theme/ThemeProviders';
// components
import ScrollToTop from './Components/User/scroll-to-top';
//ToastContainer
import { ToastContainer } from 'react-toastify';
//context
import { AuthProvider } from './Contexts/AuthContext';
import { ProductsProvider } from './Contexts/ProductsContext';
import { CommonProvider } from './Contexts/CommonContext';
import { UsersProvider } from './Contexts/UsersContext';
import { EmployeesProvider } from './Contexts/EmployeesContext';
import { CategoryProvider } from './Contexts/CategoryContext';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ThemeProviders>
          <ToastContainer />
          <AuthProvider>
            <ProductsProvider>
              <CommonProvider>
                <UsersProvider>
                  <EmployeesProvider>
                    <CategoryProvider>
                      <Router />
                    </CategoryProvider>
                  </EmployeesProvider>
                </UsersProvider>
              </CommonProvider>
            </ProductsProvider>
          </AuthProvider>
        </ThemeProviders>
      </BrowserRouter>
    </HelmetProvider>
  );
}
