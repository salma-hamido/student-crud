import { Box, AppBar, Toolbar, Avatar } from "@mui/material";
import LanguageSelect from "../CustomComponent/LanguageSelect";
import { useTranslation } from "react-i18next";

const CustomAppBar = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar'

  return (
    <AppBar position="fixed" sx={{
      zIndex: (theme) => theme.zIndex.drawer + 1,
      backgroundColor: 'white',
      color: "black",
      boxShadow: '0px 1px 3px -1px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12)',

    }}>
      <Toolbar sx={{ direction: isRTL ? 'rtl' : 'ltr' }}>
        <img alt="Logo" src="/images/open-book.png" />

        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          ...(isRTL ? { mr: 'auto' } : { ml: 'auto' })
        }}>
          <Avatar alt="Logo" src="/images/mask-group.png" />

          <LanguageSelect />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;