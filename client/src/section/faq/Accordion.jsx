//@mui
import {
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
//component
import AccordionItems from './AccordionItems';

//----------------------------------

const Accordion = () => {
  return (
    <Container sx={{ padding: '100px 0 0 0' }}>
      <Typography variant="h3" sx={{ textAlign: 'center' }}>
        Frequently Asked Questions
      </Typography>
      <Box
        sx={{
          maxWidth: { xs: '80%', sm: '60%', md: '60%' },
          margin: '2rem auto',
        }}
      >
        {AccordionItems.map((item, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<AddIcon />}
              aria-controls={`panel${index + 1}-content`}
              id={`panel${index + 1}-header`}
            >
              <Typography sx={{ fontWeight: 550 }}>{item.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.content}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default Accordion;
