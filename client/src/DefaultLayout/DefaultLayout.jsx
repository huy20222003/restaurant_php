import styles from './DefaultLayout.module.css';
import Header from '../Components/User/Header';
import Footer from '../Components/User/Footer';

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