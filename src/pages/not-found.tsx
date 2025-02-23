import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
const NotFound = () => {

  const { t } = useTranslation();
  const navigate = useNavigate();

  return (<Box className='flex flex-col items-center justify-center h-screen'>
    <img className='mb-4' src='/images/432-02 1.png' alt='404' width={400} height={400} />
    <Typography variant='h1' className='text-2xl font-bold text-gray-700'>{t('404')}</Typography>
    <Typography variant='h6' className='text-sm text-gray-500'>{t('Page Not Found')}</Typography>
    <Button className='bg-[#0C5AE5] text-white rounded-lg capitalize'
      sx={{ mt: 2 }}
      variant='contained' onClick={() => navigate('/')}>{t('Go to Home')}</Button>
  </Box>);
};

export default NotFound;
