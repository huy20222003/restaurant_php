import styles from './DefaultLayoutUser.module.css';
import Header from '../../Components/User/Header';
import Footer from '../../Components/User/Footer';

// eslint-disable-next-line react/prop-types
const DefaultLayout = ({children}) => {
  return (
    <div>
      <div className={styles.header}>
        <Header />
      </div>
      <div>
        {children}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default DefaultLayout;