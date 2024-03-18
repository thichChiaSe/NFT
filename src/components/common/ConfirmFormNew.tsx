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
import { makeStyles } from '@mui/styles';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

interface CommonDialogProps {
  open: boolean;
  onClose: () => void;
  ref?: any;
  deletez: string;
  content: string;
  onClick: (a: any) => void;
}

const useStyles = makeStyles({
  colorText: {
    color: '#418eda',
  },
  iconWrapper: {},
  icon: {
    transition: 'opacity 0.5s ease-in-out',
  },
});
export default function ConfirmFormNew({
  deletez,
  open,
  content,
  onClose,
  onClick,
}: // ref,
CommonDialogProps) {
  const classes = useStyles();
  const handleSinger = (props: any) => {
    onClick(props);
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      // ref={ref}
    >
      <DialogTitle sx={{ textAlign: 'center' }} className={classes.iconWrapper}>
        <QuestionMarkIcon className={classes.icon} sx={{ fontSize: 60 }} color="success" />
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" align="center">
          <Typography color="#223354" component="h1" variant="h6" className={classes.icon}>
            {content}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSinger} color="primary">
          {t('Confirm')}
        </Button>
        <Button onClick={onClose} color="error">
          {t('Exit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
