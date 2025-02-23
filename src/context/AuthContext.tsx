import React, { createContext, useContext, useState, useEffect } from 'react';
import { Client, storage_key__admin_token } from '../configs/api';
import { useNavigate } from 'react-router-dom';
import { AuthContextType, User, LoginCredentials } from '../types';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';



export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { t } = useTranslation();

	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const verifyToken = async () => {
			const token = localStorage.getItem(storage_key__admin_token);

			if (token) {
				try {
					setIsAuthenticated(true);
					//	setUser(user);
				} catch (error) {
					console.error('Token verification failed:', error);
					localStorage.removeItem(storage_key__admin_token);
					setIsAuthenticated(false);
					setUser(null);
				}
			}
			setLoading(false);
		};

		verifyToken();
	}, []);

	const login = async (data: LoginCredentials) => {
		try {
			setLoading(true);
			toast.loading(t('sending...'));
			const response = await Client.admin().post('User/SignIn', data);
			const { token, user } = response.data;
			localStorage.setItem(storage_key__admin_token, token);
			setUser(user);
			setIsAuthenticated(true);
			toast.success(t('done'));
			toast.loading(t('redirecting...'));
			toast.dismiss();
			navigate('/students');


		} catch (error) {
			console.error('Login failed:', error);
			toast.error(t('Something went wrong'));
			toast.dismiss();

		} finally {
			setLoading(false);
		}
	};

	const logout = () => {
		localStorage.removeItem(storage_key__admin_token);
		setUser(null);
		setIsAuthenticated(false);
		navigate('/login');
	};

	const value = {
		isAuthenticated,
		user,
		login,
		logout,
		loading,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};