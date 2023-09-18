//@mui
import { Container, Grid } from '@mui/material';
import { keyframes } from '@mui/system';
//component
import ServiceItem from './ServiceItem';
//config
import services from './config';
//--------------------------------------------

const forwardToFront = keyframes`
  0% {
    transform: translateY(100px);
  } 
  100% {
    transform: translateX(0);
  }
`;

const Service = () => {
  return (
    <Container
      sx={{
        padding: '90px 0',
        maxWidth: { xs: '90%' },
        animation: `${forwardToFront} 0.6s liear`,
      }}
    >
      <Grid container spacing={3}>
        {services.map((service, index) => (
          <ServiceItem
            key={index}
            iconSrc={service.iconSrc}
            title={service.title}
            description={service.description}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default Service;
