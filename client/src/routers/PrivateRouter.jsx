import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/context';
import PropTypes from 'prop-types';
//-----------------------------------------------

const PrivateRouter = ({ element, redirectTo }) => {
  const {
    authState: { isAuthenticated },
  } = useAuth();
  
  if (isAuthenticated) {
    return element;
  } else {
    return <Navigate to={redirectTo} replace />;
  }
};

PrivateRouter.propTypes = {
  element: PropTypes.element.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default PrivateRouter;
