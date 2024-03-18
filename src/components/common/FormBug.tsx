import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
  } from '@mui/material';
  import { t } from 'i18next';
  import InfoIcon from '@mui/icons-material/Info';
  interface CommonDialogProps {
    open: boolean;
    onClose: () => void;
    item: any;
    mainMessage: any;
    ref?: any;
    deletez: string;
  }
  
  export default function FormBug({
    deletez,
    open,
    onClose,
    item,
    mainMessage,
  }: // ref,
  CommonDialogProps) {
    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // ref={ref}
      >
        <DialogTitle sx={{ textAlign: 'center' }}>
          <InfoIcon sx={{ fontSize: 60 }} color="error" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" align="center">
            <Typography color="#223354" component="h1" variant="h6">
              {mainMessage}
            </Typography>{' '}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            {t('Exit')}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  