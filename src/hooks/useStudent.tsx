import { useContext } from 'react';
import { StudentContext } from '../context/StudentContext';

export const useStudent = () => {
	const context = useContext(StudentContext);

	if (context === undefined) {
		throw new Error('Error in StudentContext');
	}

	return context;
};