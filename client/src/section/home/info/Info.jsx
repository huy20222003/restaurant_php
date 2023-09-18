//@mui
import { Box, Paper, Container, Grid } from '@mui/material';
import { keyframes } from '@mui/system';
//component
import InfoCard from './InfoCard';
//--------------------------------------------------------------

const forwardToFront = keyframes`
  0% {
    transform: translateY(100px);
  } 
  100% {
    transform: translateX(0);
  }
`;

const Info = () => {
  return (
    <Box
      component="section"
      sx={{
        paddingTop: '24px',
        paddingBottom: '24px',
        opacity: 1,
        background: 'transparent',
        color: 'rgb(52, 71, 103)',
        boxShadow: 'none',
        margin: '-10px 0 0 0',
        position: 'relative',
        animation: `${forwardToFront} 0.5s linear`
      }}
    >
      <Container maxWidth="lg">
        <Paper elevation={1}>
          <Grid
            container
            spacing={2}
            sx={{ maxWidth: '80%', margin: '0 auto' }}
          >
            <InfoCard
              title="Total Sales"
              value="300+"
              description="Over 300 orders have been sold to the market."
            />
            <InfoCard
              title="Total Sales"
              value="50+"
              description="Over 300 orders have been sold to the market."
            />
            <InfoCard
              title="Total Sales"
              value="100+"
              description="Over 300 orders have been sold to the market."
            />
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Info;
