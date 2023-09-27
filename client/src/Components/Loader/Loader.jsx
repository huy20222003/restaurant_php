import { Box } from '@mui/material';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className={styles.customLoader}></div>
    </Box>
  );
};

export default Loader;
