import { useTranslation } from "react-i18next";
import CustomAppBar from "./CustomAppBar";
import CustomDrawer from "./CustomDrawer";
import { Box, CssBaseline } from "@mui/material";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
      const { i18n } = useTranslation();
      const isRTL = i18n.language === 'ar'

      return (
            <Box className="flex">
                  <CssBaseline />
                  <CustomAppBar />
                  <CustomDrawer />


                  <Box
                        sx={{
                              height: '100vh',
                              flexGrow: 1,
                              p: 3,
                              backgroundColor: "#1e6fff0f",
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              ...(isRTL ? { ml: 'auto', mr: '12rem' } : { mr: 'auto', ml: '12rem' })
                        }}
                        dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                  >
                        {children}
                  </Box>
            </Box>
      );
};

export default AdminLayout;
