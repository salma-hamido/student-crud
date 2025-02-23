import { Box } from '@mui/material';
import { Icon } from '@iconify/react';

const Loading = () => {
	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
			<Icon icon="line-md:loading-twotone-loop" className='text-blue-500' fontSize={100} />
		</Box>
	)
}

export default Loading;
