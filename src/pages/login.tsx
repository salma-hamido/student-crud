import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid, CardContent, Card, Typography } from '@mui/material';
import LanguageSelect from '../components/CustomComponent/LanguageSelect';
import { LoginFormData, LoginFormProps } from '../types';
import FieldsDistributor, { Fields } from '../components/Inputs/FieldsDistributor';
import { useForm, UseFormReturn } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAuth } from '../hooks/useAuth';

const LoginPage: React.FC = () => {

  const { t, i18n } = useTranslation();
  const { login, loading } = useAuth();


  const submit = async (data: LoginFormData) => {
    if (!data.userName || !data.password) return;
    await login(data);

  };

  return (
    <Box
      className="min-h-screen flex flex-col md:flex-row items-center justify-center"
      dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
    >
      <Box className="w-full md:w-2/5 p-5" sx={{ height: '100vh' }}>
        <Box className="flex flex-col justify-start">
          <Box className="w-full mb-28">
            <LanguageSelect />
          </Box>
          <Box className="w-9/12 m-auto" sx={{ marginTop: '2rem' }}>
            <img
              src="/images/432-02 1.png"
              alt="login-image"
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            />
          </Box>
        </Box>
      </Box>
      <Box
        className="w-full md:w-3/5 p-5 lg-image-card"
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <LoginForm onSubmit={submit} sending={loading} />
      </Box>
    </Box>
  );
};


const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, sending }) => {
  const { t } = useTranslation();

  const schema = React.useMemo(
    () =>
      Yup.object({
        password: Yup.string().required(t('This field is required')),
        userName: Yup.string().required(t('This field is required')),
      }),
    [t]
  );

  const formMethods: UseFormReturn<LoginFormData> = useForm({
    mode: 'onBlur',
    defaultValues: {
      userName: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const { control, handleSubmit, formState: { errors } } = formMethods;

  const fields: Fields[] = [
    {
      type: 'text',
      name: 'userName',
      error: errors.userName,
      label: t('Username'),
      labelProps: { textColor: 'gray', sx: { mb: 1 } },
      gridProps: { xs: 12 },
      fieldProps: { size: 'small' },
      required: true,
    },
    {
      type: 'password',
      name: 'password',
      error: errors.password,
      label: t('Password'),
      labelProps: { textColor: 'gray', sx: { mb: 1 } },
      gridProps: { xs: 12 },
      fieldProps: { size: 'small' },
    },
  ];

  return (
    <Card className="max-w-xl p-5">
      <CardContent sx={{ p: theme => `${theme.spacing(3, 3, 3)} !important` }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
          {t('Login')}
        </Typography>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4}>
            <FieldsDistributor fields={fields} control={control} />
            <Grid item xs={12}>
              <LoadingButton
                type="submit"
                variant="contained"
                fullWidth
                loading={sending}
                sx={{ textTransform: 'capitalize' }}
                disabled={sending}
              >
                {t('Sign In')}
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginPage;