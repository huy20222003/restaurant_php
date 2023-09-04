import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//DefaultLayout
import DefaultLayoutUser from './DefaultLayout/DefaultLayoutUser';
import DefaultLayoutAdmin from './DefaultLayout/DefaultLayoutAdmin';

//Page 404
import Page404 from './Pages/Page404/Page404';

import {
  noDefaultLayout,
  defaultLayoutUser,
  defaultLayoutAdmin,
} from './routers/routes';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {noDefaultLayout.map((route, index) => {
            const Page = route.element;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
          {defaultLayoutUser.map((route, index) => {
            const Page = route.element;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <DefaultLayoutUser>
                    <Page />
                  </DefaultLayoutUser>
                }
              />
            );
          })}
          {defaultLayoutAdmin.map((route, index) => {
            const Page = route.element;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <DefaultLayoutAdmin>
                    <Page />
                  </DefaultLayoutAdmin>
                }
              />
            );
          })}
          <Route path="*" element={<Page404 />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
