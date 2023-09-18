//@mui

import styled from '@emotion/styled';
import { Box, Grid, Paper, Typography } from '@mui/material';

//-----------------------------------

const StyledPaper = styled(Paper)`
  && {
    color: rgb(33, 43, 54);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border: 1px solid rgba(145, 158, 171, 0.16);
    background-image: none;
    padding: 24px;
    border-radius: 16px;
    background-color: unset;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const Service = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <StyledPaper>
          <Box
            component={'img'}
            src="/assets/icons/service/ic_account.svg"
            sx={{ height: '100px' }}
          ></Box>
          <Typography variant="subtitle2" sx={{ m: 0 }}>
            Manage Account
          </Typography>
        </StyledPaper>
      </Grid>
      <Grid item xs={12} md={4}>
        <StyledPaper>
          <Box
            component={'img'}
            src="/assets/icons/service/ic_payment.svg"
            sx={{ height: '100px' }}
          ></Box>
          <Typography variant="subtitle2" sx={{ m: 0 }}>
            Payment
          </Typography>
        </StyledPaper>
      </Grid>
      <Grid item xs={12} md={4}>
        <StyledPaper>
          <Box
            component={'img'}
            src="/assets/icons/service/ic_delivery.svg"
            sx={{ height: '100px' }}
          ></Box>
          <Typography variant="subtitle2" sx={{ m: 0 }}>
            Delivery
          </Typography>
        </StyledPaper>
      </Grid>
      <Grid item xs={12} md={4}>
        <StyledPaper>
          <Box
            component={'img'}
            src="/assets/icons/service/ic_package.svg"
            sx={{ height: '100px' }}
          ></Box>
          <Typography variant="subtitle2" sx={{ m: 0 }}>
            Problem with the Product
          </Typography>
        </StyledPaper>
      </Grid>
      <Grid item xs={12} md={4}>
        <StyledPaper>
          <Box
            component={'img'}
            src="/assets/icons/service/ic_refund.svg"
            sx={{ height: '100px' }}
          ></Box>
          <Typography variant="subtitle2" sx={{ m: 0 }}>
            Return and Refund
          </Typography>
        </StyledPaper>
      </Grid>
      <Grid item xs={12} md={4}>
        <StyledPaper>
          <Box
            component={'img'}
            src="/assets/icons/service/ic_assurances.svg"
            sx={{ height: '100px' }}
          ></Box>
          <Typography variant="subtitle2" sx={{ m: 0 }}>
            Guarantees and assurances
          </Typography>
        </StyledPaper>
      </Grid>
    </Grid>
  );
};

export default Service;
