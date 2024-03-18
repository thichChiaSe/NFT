import { Dialog, DialogContent, DialogTitle, IconButton, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles((theme: Theme) => ({
  dialogWrapper: {
    padding: 8,
    position: 'absolute',
    top: '5%',
  },
  dialogTitle: {
    paddingRight: '0px',
  },
  closeBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
}));

interface PopupProps {
  title: any;
  fullWidth?: boolean;
  subtitle?: string;
  fullScreen?: boolean;
  children: any;
  openPopup: boolean;
  onClose: () => void;
}

export default function Popup(props: PopupProps) {
  const { title, fullScreen, subtitle, children, openPopup, onClose } = props;
  const classes = useStyles();

  return (
    <Dialog
      fullScreen={fullScreen ?? undefined}
      open={openPopup}
      maxWidth="lg"
      fullWidth={props.fullWidth ?? false}
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Typography variant="subtitle1" component="div">
            {subtitle}
          </Typography>
          {onClose ? (
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </div>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
