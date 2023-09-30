import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const modalStyle = {
  box: { 
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400, 
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 3,
  },
  textbox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

};

interface Props {
  open: boolean,
  handleOpen: () => void,
  handleClose: () => void
}

const BasicModal: React.FC<Props>= ({open, handleClose}) => {

  return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={modalStyle.box}>
        <Box sx={modalStyle.textbox} m={1}>
       <Typography variant="h3" component="h4" align='center' p={3}>
            Time is up
       </Typography>
        <Button variant='contained' onClick={handleClose}> Turn off alarm </Button>
        </Box>
        </Box>
      </Modal>
  );
}

export default BasicModal;