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
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { makeStyles } from '@mui/styles';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { useState } from 'react';
interface CommonDialogProps {
  open: boolean;
  onClose: () => void;
  ref?: any;
  deletez: string;
  onClick: () => void;
  onClickz: () => void;
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
export default function ConfirmForm({
  deletez,
  open,
  onClose,
  onClick,
  onClickz,
}: // ref,
CommonDialogProps) {
  const classes = useStyles();
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    onClick();
    setIsSaved(true);
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
        {isSaved ? (
          //   <CheckCircleOutlinedIcon
          //     className={classes.icon}
          //     sx={{ fontSize: 60 }}
          //     color="success"
          //     style={{ opacity: isSaved ? 1 : 0 }}
          //   />
          <img src="/static/done.gif" alt="hinh anh" style={{ width: '300px', height: '175px' }} />
        ) : (
          <HelpOutlineOutlinedIcon
            className={classes.icon}
            sx={{ fontSize: 60 }}
            color="success"
            style={{ opacity: isSaved ? 0 : 1 }}
          />
        )}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" align="center">
          {isSaved ? (
            <Typography
              color="#223354"
              component="h1"
              variant="h6"
              className={classes.icon}
              style={{ opacity: isSaved ? 1 : 0 }}
            >
              {t('File saved do you want to go to the')}{' '}
              <span style={{ color: 'green' }}>{t('Archive')}</span> {t('a')}
            </Typography>
          ) : (
            <Typography
              color="#223354"
              component="h1"
              variant="h6"
              className={classes.icon}
              style={{ opacity: isSaved ? 0 : 1 }}
            >
              {t('Do you want saved')}
            </Typography>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {isSaved ? (
          <>
            <Button
              onClick={onClickz}
              color="primary"
              className={classes.icon}
              style={{ opacity: isSaved ? 1 : 0 }}
            >
              {t('Jump to')}
            </Button>
            <Button onClick={onClose} color="error" className={classes.icon}>
              {t('Exit')}
            </Button>
          </>
        ) : (
          <>
            <Button onClick={handleSave} color="primary" style={{ opacity: isSaved ? 0 : 1 }}>
              {t('Save')}
            </Button>
            <Button onClick={onClose} color="error">
              {t('Exit')}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
