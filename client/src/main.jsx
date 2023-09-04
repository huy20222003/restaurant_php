import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import GlobalStyles from './GlobalStyles/GlobalStyles.jsx';
import { AuthProvider } from './Contexts/AuthContext.jsx';
import { DishesProvider } from './Contexts/DishesContext.jsx';
import { CommonProvider } from './Contexts/CommonContext.jsx';
import { UsersProvider } from './Contexts/UsersContext.jsx';
import { EmployeesProvider } from './Contexts/EmployeesContext.jsx';
import { CategoryProvider } from './Contexts/CategoryContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyles>
      <CommonProvider>
        <AuthProvider>
          <DishesProvider>
            <UsersProvider>
              <EmployeesProvider>
                <CategoryProvider>
                  <App />
                </CategoryProvider>
              </EmployeesProvider>
            </UsersProvider>
          </DishesProvider>
        </AuthProvider>
      </CommonProvider>
    </GlobalStyles>
  </React.StrictMode>
);
