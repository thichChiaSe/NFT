import { Logout, Settings } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions, selectUser } from 'features/auth/authSlice';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export const AccountDrawer = () => {
  const dispatch = useAppDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const { t } = useTranslation();

  const [openPopup, setOpenPopup] = useState(false);
  const user = useAppSelector((s) => s.auth.currentUser);
  const name = user
    ? user.userInfo.fullName
      ? user.userInfo.fullName
      : user.userInfo.username
    : '';

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  const handleChangePassword = () => {
    setOpenPopup(true);
  };

  useEffect(() => {
    dispatch({ type: 'INIT_APP_USER' });
  }, [dispatch]);

  const users = useAppSelector(selectUser) as any | undefined;
  const nameAVATAR = users?.data.username.slice(0, 2);
  const names = users?.data.username;

  return (
    <>
      <Tooltip title={`${t('Account')}`}>
        <Button onClick={toggleDrawer} size="small" sx={{ ml: 2 }}>
          <Avatar
            sx={{ width: 32, height: 32, marginLeft: 1, marginRight: 1, background: '#FB731A' }}
          >
            {nameAVATAR}
          </Avatar>
          {names}
        </Button>
      </Tooltip>
      <Drawer open={openDrawer} anchor="right" onClose={toggleDrawer}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            px: [1],
            minWidth: '360px',
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronRightIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav" onClick={handleChangePassword}>
          <ListItemButton>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary={t('Change password')} />
          </ListItemButton>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary={t('Logout')} />
          </ListItemButton>
        </List>
      </Drawer>

      {/* <Popup
        title={t('Change password')}
        openPopup={openPopup}
        onClose={() => {
          setOpenPopup(false);
        }}
      >
        <ChangePasswordForm
          onSubmit={() => {
            setOpenPopup(false);
          }}
        />
      </Popup> */}
    </>
  );
};
