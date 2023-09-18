//@mui
import { Button, Typography } from "@mui/material";

//----------------------------------

const ButtonBack = ()=> {
    const handleBack = () => {
        window.history.back();
      };

    return (
        <Button onClick={handleBack} sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ color: 'black' }}>
            Back
          </Typography>
        </Button>
    );
}

export default ButtonBack;