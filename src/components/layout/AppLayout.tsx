import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import * as React from 'react';
import Layout from './Layout';
import { Route, Switch } from 'react-router-dom';


export function AppLayout() {
  // const backgroundColor = useAppSelector((state) => state.layout.backgroundColor);

  // const user = useAppSelector((s) => s.auth.currentUser);
  // const access_token =
  //   localStorage.getItem('access_token') ?? sessionStorage.getItem('access_token');
  // useEffect(() => {
  //   dispatch(authActions.getUserInfo());
  // }, [dispatch]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          // backgroundColor: backgroundColor,
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Layout>
          <Switch>
            <Route exact path="/mint-nft">
              zzz
            </Route>
            <Route exact path="/my-inventory">
              zzz
            </Route>
          </Switch>
        </Layout>
      </Box>
    </Box>
  );
}
