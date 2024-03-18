import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PrivateRoute } from 'components/common/PrivateRoute';
import { Route, Switch } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AppLayout } from 'components/layout/AppLayout';
import LoginPage from 'features/auth/pages/LoginPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from 'react-scroll-to-top';
import { useEffect } from 'react';
// import { setupTimers } from 'api/axiosClient';
function App() {
  // useEffect(() => {
  //   setupTimers();
  // }, []);
  return (
    <>
      <ScrollToTop smooth />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Switch>
          <Route path="/login">
            <LoginPage />
            {/* <AppLayout /> */}
          </Route>
          <PrivateRoute path="">
            <AppLayout />
          </PrivateRoute>
        </Switch>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </LocalizationProvider>
    </>
  );
}

export default App;
