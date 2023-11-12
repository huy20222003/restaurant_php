import PropTypes from 'prop-types';
import { memo } from 'react';
//@mui
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
//sweetalert2
import Swal from 'sweetalert2';
//context
import { useEmployee } from '../../../hooks/context';

//------------------------------------------------------

const PreviewAvatar = ({ previewAvatar, open, setOpen, avatarUpdate }) => {
  const { handleUpdateAvatar } = useEmployee();

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdate = async () => {
    try {
      const updateData = await handleUpdateAvatar({ avatarUpdate });
      if (!updateData.success) {
        Swal.fire('', 'Error update avatar', 'error');
      } else {
        Swal.fire('', 'Update avatar successfull!', 'success');
      }
      handleClose();
    } catch (error) {
      Swal.fire('', 'Server Error', 'error');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center' }}>{'Preview Avatar'}</DialogTitle>
      <DialogContent sx={{ px: '4.5rem' }}>
        <Avatar
          src={previewAvatar}
          alt="Avatar"
          sx={{ width: '7rem', height: '7rem', mt: '1rem' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleUpdate} autoFocus variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

PreviewAvatar.propTypes = {
  previewAvatar: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  avatarUpdate: PropTypes.object.isRequired,
};

export default memo(PreviewAvatar);
