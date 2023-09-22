import { useState, useRef, useCallback } from 'react';
//@mui
import {
  Avatar,
  Box,
  CardContent,
  Paper,
  Typography,
  Divider,
  CardActions,
  Button,
} from '@mui/material';
//toast
import { toast } from 'react-toastify';
//component
import PreviewAvatar from './PreviewAvatar';
//context
import { useAuth } from '../../../hooks/context';
//-------------------------------------------

const ProfileCardAvatar = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [previewAvatar, setPreviewAvatar] = useState('');
  const {authState: {user}} = useAuth();
  const refImage = useRef();

  const handleChooseFile = () => {
    refImage.current.click();
  };

  const handleChangeFile = useCallback(async (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewAvatar(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      setOpen(true);
      reader.onerror = () => {
        toast.error('Error occurred while reading the file.');
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  }, []);

  return (
    <Paper elevation={1}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Avatar
            src={user?.avatar}
            alt="Avatar"
            sx={{
              userSelect: 'none',
              width: '5rem',
              height: '5rem',
              mb: '1rem',
              letterSpacing: 0,
            }}
          />
          <Typography variant="h6">{user?.fullName}</Typography>
          <Typography variant="body2">{user?.username}</Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'center' }}>
        <input
          type="file"
          name="avatarUpdate"
          onChange={handleChangeFile}
          accept="image/*"
          hidden={true}
          ref={refImage}
        />
        <Button
          size="medium"
          variant="text"
          onClick={handleChooseFile}
          sx={{
            fontSize: '0.8rem',
            minWidth: '6rem',
            lineHeight: 1.5,
            fontWeight: 600,
            p: '0.6rem 1.2rem',
          }}
        >
          Upload picture
        </Button>
      </CardActions>
      <PreviewAvatar
        previewAvatar={previewAvatar}
        open={open}
        setOpen={setOpen}
        avatarUpdate={selectedImage}
      />
    </Paper>
  );
};

export default ProfileCardAvatar;
