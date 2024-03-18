import { Avatar, Box, CssBaseline, Grid, Paper, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { t } from 'i18next';
import { useEffect } from 'react';

import { authActions, selectRoles } from '../authSlice';
import LoginForm from '../components/LoginForm';
import { LoginPayload, Roles } from '../models';
import { useHistory } from 'react-router-dom';

const theme = createTheme();

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const roles = useAppSelector(selectRoles) as Roles | undefined;
  const name = roles?.data?.pagingData;

  useEffect(() => {
    dispatch({ type: 'INIT_APP' });
  }, [dispatch]);

  const handleSubmit = (formValues: LoginPayload) => {
    dispatch(authActions.login(formValues));
  };

  useEffect(() => {
    const isLoggedIn =
      Boolean(localStorage.getItem('access_token')) ||
      Boolean(sessionStorage.getItem('access_token'));
    if (isLoggedIn) {
      history.push('/');
    }
    // if (name?.find((e) => e.name === 'Records Management')) {
    //   history.push('/reception/manage');
    // }
  }, []);

  const initialValues: LoginPayload = {
    username: '',
    password: '',
    rememberMe: false,
  } as LoginPayload;

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={5}
          md={8}
          sx={{
            backgroundImage: `url(/static/login/logo_login.png)`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: '50%',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={7} md={4} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 18,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar
              alt="logo"
              src="/static/login/logo.jpg"
              sx={{
                width: 56,
                height: 56,
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            />

            <Typography component="h1" variant="h5">
              {t('Login')}
            </Typography>
            <LoginForm initialValues={initialValues} onSubmit={handleSubmit}></LoginForm>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
