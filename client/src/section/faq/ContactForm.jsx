//@mui

import styled from '@emotion/styled';
import {
  ButtonBase,
  FormControl,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

//------------------------------------------------------

const StyledButtonBase = styled(ButtonBase)`
  && {
    text-decoration: none;
    font-weight: 700;
    line-height: 1.71429;
    text-transform: unset;
    font-family: 'Public Sans', sans-serif;
    min-width: 64px;
    width: 120px;
    padding: 8px 16px;
    border-radius: 8px;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: none;
    color: rgb(255, 255, 255);
    background-color: rgb(33, 43, 54);
    height: 48px;
    font-size: 15px;
  }
`;

const ContactForm = () => {
  return (
    <Stack>
      <Typography variant="h4" sx={{ mb: '20px' }}>
        Haven't found the right help?
      </Typography>
      <Stack sx={{ gap: '20px' }}>
        <FormControl fullWidth>
          <TextField label="Name" name="name" />
        </FormControl>
        <FormControl fullWidth>
          <TextField label="Email" name="email" />
        </FormControl>
        <FormControl fullWidth>
          <TextField label="Subject" name="subject" />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="Enter your message here"
            name="message"
            multiline
            rows={4}
          />
        </FormControl>
        <StyledButtonBase>Submit Now</StyledButtonBase>
      </Stack>
    </Stack>
  );
};

export default ContactForm;
