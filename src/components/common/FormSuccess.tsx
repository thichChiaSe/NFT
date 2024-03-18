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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface CommonDialogProps {
  open: boolean;
  onClose: () => void;
  item: any;
  mainMessage: any;
  ref?: any;
  deletez: string;
}

export default function FormSuccess({
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
        <CheckCircleIcon color="success" />
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
