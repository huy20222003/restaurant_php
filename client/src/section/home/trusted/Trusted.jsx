//@mui
import { Box, Typography } from '@mui/material';

const Trusted = () => {
  return (
    <Box
      sx={{
        maxWidth: '50%',
        margin: '0 auto',
        textAlign: 'center',
        color: 'rgb(52, 71, 103)',
        padding: '100px 0'
      }}
    >
      <Typography variant="h2">Trusted by over</Typography>
      <Typography
        variant="h3"
        sx={{ color: 'rgb(26, 115, 232)', marginBottom: '16px' }}
      >
        1,679,477+ customers
      </Typography>
      <Typography variant="body2" sx={{ color: 'rgb(123, 128, 154)' }}>
        Many Fortune 500 companies, startups, universities, and governmental
        institutions love Creative Tim's products.
      </Typography>
    </Box>
  );
};

export default Trusted;
