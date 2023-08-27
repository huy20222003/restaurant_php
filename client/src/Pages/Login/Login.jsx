import styles from './Login.module.css';
import anhLogin from '../../assets/images/anhLogin.jpg';

const Login = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.contentLeft}>
          <img src={anhLogin} alt="anh do an" />
        </div>
        <div className={styles.contentRight}>
          <form>
            <header>
              <h2>Login</h2>
            </header>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
