import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Box, Button, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAppDispatch } from 'app/hooks';


import { t } from 'i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { authApi } from '../api';
import { authActions } from '../authSlice';
import { useToggle } from 'hooks/useToggle';
import { InputField } from 'components/FormFields';

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ChangePasswordForm {
  onSubmit?: () => void;
}

const schema = yup.object().shape({
  oldPassword: yup.string().required(t('An old password is required')),
  newPassword: yup
    .string()
    .required(t('A new password is required'))
    .test(
      'oldnew',
      t('Please enter a new password that does not match the old password'),
      (item, testContext) => {
        return testContext.parent.oldPassword !== testContext.parent.newPassword;
      }
    ),
  confirmNewPassword: yup
    .string()
    .required(t('Please confirm new password'))
    .test('confirmPass', t('Check new password and confirm new password'), (item, testContext) => {
      return testContext.parent.confirmNewPassword === testContext.parent.newPassword;
    }),
});

const useStyles = makeStyles({
  container: {
    width: '100%',
  },
  wrap: {
    display: 'flex',
    justifyContent: 'center',
  },
});
export function ChangePasswordForm({ onSubmit }: ChangePasswordForm) {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [time, setTime] = useState(0);
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ChangePasswordPayload>({
    defaultValues: { oldPassword: '', newPassword: '', confirmNewPassword: '' },
    resolver: yupResolver(schema),
  });
  const handleFormSubmit = async (formValues: ChangePasswordPayload) => {
    setIsLoading(true);
    try {
      const response = await authApi.changePassword(formValues);
      let t = 0;
      setInterval(() => {
        setTime(++t);
        if (t == 5) {
          dispatch(authActions.logout());
        }
      }, 1000);
    } catch (error) {
      setError(t('Wrong password'));
    }
    setIsLoading(false);
  };
  // Toggle iconeye open - close
  const [showOldPassword, setShowOldPassword] = useToggle();
  const [showNewPassword, setShowNewPassword] = useToggle();
  const [confirmNewPassword, setConfirmNewPassword] = useToggle();

  return (
    <div className={classes.wrap}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={classes.container}>
        <InputField
          name="oldPassword"
          control={control}
          label={`${t('old password')}`}
          type={showOldPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={setShowOldPassword}
                  edge="end"
                >
                  {showOldPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <InputField
          name="newPassword"
          control={control}
          label={`${t('New password')}`}
          type={showNewPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={setShowNewPassword}
                  edge="end"
                >
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <InputField
          name="confirmNewPassword"
          control={control}
          label={`${t('Confirm new password')}`}
          type={confirmNewPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={setConfirmNewPassword}
                  edge="end"
                >
                  {confirmNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {error && <Alert severity="error">{error}</Alert>}
        {time != 0 && (
          <Alert severity="info">
            {t('Log out in ')}
            {5 - time} {t('seconds')}
          </Alert>
        )}
        <Box mt={3}>
          {!isLoading && (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              fullWidth
            >
              {t('Accept')}
            </Button>
          )}
          {isLoading && <CircularProgress size={30} />}
        </Box>
      </form>
    </div>
  );
}
