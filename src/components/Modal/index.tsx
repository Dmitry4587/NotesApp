import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IModalComponentProps } from '../../types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
} as const;

const ModalComponent = ({ openModal, setOpenModal, deleteNote }: IModalComponentProps) => {
  const handleClose = () => setOpenModal(false);
  const handleCloseDel = () => {
    setOpenModal(false);
    deleteNote();
  };

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" sx={{ fontSize: '18px' }} variant="h6" component="h2">
            Are you sure you want to delete the note?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '10px' }}>
            <Button onClick={handleClose} color="primary" variant="contained">
              Cancel
            </Button>
            <Button onClick={handleCloseDel} color="error" variant="contained">
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalComponent;
