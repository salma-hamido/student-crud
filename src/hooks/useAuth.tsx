import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (context === undefined) {
		throw new Error('Error in useAuth');
	}

	return context;
};