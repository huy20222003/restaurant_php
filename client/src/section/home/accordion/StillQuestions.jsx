//@mui
import styled from "@emotion/styled";
import { Box, ButtonBase, Typography } from "@mui/material";

//-------------------------------------------

const StyledButtonBaseContact = styled(ButtonBase)`
  && {
    font-weight: 700;
    line-height: 1.71429;
    font-size: 0.875rem;
    text-transform: capitalize;
    font-family: __Public_Sans_66e638, __Public_Sans_Fallback_66e638, Helvetica,
      Arial, sans-serif;
    min-width: 64px;
    padding: 6px 12px;
    border-radius: 8px;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: none;
    color: rgb(255, 255, 255);
    background-color: rgb(33, 43, 54);
    min-width: 100px;
  }
`;


const StillQuestions = ()=> {
    return (
        <Box
        sx={{
          borderWidth: '1px',
          borderRadius: '24px',
          textAlign: 'center',
          borderStyle: 'dashed',
          borderColor: 'rgba(145, 158, 171, 0.32)',
          padding: '30px 70px',
          margin: '64px auto',
          maxWidth: '80%',
        }}
      >
        <Typography variant="h3">Still Have Questions?</Typography>
        <Typography
          variant="body2"
          sx={{ color: 'rgb(99, 115, 129)', margin: '12px 0px 20px' }}
        >
          Please describe your case to receive the most accurate advice.
        </Typography>
        <StyledButtonBaseContact>Contact Us</StyledButtonBaseContact>
      </Box>
    );
}

export default StillQuestions;