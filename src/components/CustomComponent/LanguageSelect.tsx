import React, { useEffect, useState } from 'react';
import { MenuItem } from '@mui/material';
import { Select } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LanguageSelect = () => {

	const { t, i18n } = useTranslation();

	const [locale, setLocale] = useState<string>("en");

	useEffect(() => {
		const storedLocale = localStorage.getItem("locale");
		if (storedLocale) {
			setLocale(storedLocale);
			i18n.changeLanguage(storedLocale);
		}
	}, []);


	return (
		<Select
			value={locale}
			onChange={(event: any) => {
				setLocale(event.target.value);
				i18n.changeLanguage(event.target.value);
				localStorage.setItem("locale", event.target.value);
			}}
			size="small"
			sx={{ color: "black", borderColor: "white", borderRadius: '12px' }}
		>
			<MenuItem value="en">{t("English")}</MenuItem>
			<MenuItem value="ar">{t("Arabic")}</MenuItem>
		</Select>
	);
};

export default LanguageSelect;
