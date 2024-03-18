import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Box, Button, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useToggle } from 'hooks/useToggle';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { LoginPayload, Roles } from '../models';
import { InputField } from 'components/FormFields';
import CheckboxField from 'components/FormFields/CheckboxField';
import { useHistory } from 'react-router-dom';
import { selectRoles } from '../authSlice';
import { useEffect } from 'react';

export interface LoginFormProps {
  initialValues?: LoginPayload;
  onSubmit?: (formValues: LoginPayload) => void;
}

const schema = yup.object().shape({
  rememberMe: yup.boolean(),
  password: yup.string().required(t('Password is required')),
  username: yup.string().required(t('Username is required')),
});

export default function LoginForm({ initialValues, onSubmit }: LoginFormProps) {
  const error = useAppSelector((state) => state.auth.error);
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useToggle();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginPayload>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const roles = useAppSelector(selectRoles) as Roles | undefined;
  const name = roles?.data?.pagingData;

  useEffect(() => {
    dispatch({ type: 'INIT_APP' });
  }, [dispatch]);

  const handleFormSubmit = async (formValues: LoginPayload) => {
    await onSubmit?.(formValues);
    if (name?.find((e) => e.name === 'Records Management')) {
      history.push('/reception/manage');
    }
  };

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="username" control={control} label={t('Username')} type="text" />
        <InputField
          name="password"
          control={control}
          label={`${t('Password')}`}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={setShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <CheckboxField name="rememberMe" control={control} label={t('remember login')} />
        {error && <Alert severity="error">{error}</Alert>}
        {!error && error?.length === 0 && (
          <Alert severity="success">{t('Logged in successfully')}</Alert>
        )}
        <Box mt={3}>
          {!isLoading && (
            <Button
              size="large"
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              fullWidth
            >
              {t('Login')}
            </Button>
          )}
          {isLoading && <CircularProgress size={30} />}
        </Box>
      </form>
    </Box>
  );
}
