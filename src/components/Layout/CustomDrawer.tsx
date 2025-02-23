import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import ConfirmDialog from "../Dialogs/ConfirmDialog";
import { useAuth } from "../../hooks/useAuth";
const drawerWidth = 220;

const CustomDrawer = () => {
  const { t, i18n } = useTranslation();
  const { logout } = useAuth();

  const isRTL = i18n.language === 'ar'

  const [dialog, setDialog] = React.useState(false)


  return (
    <React.Fragment>
      <ConfirmDialog
        onClose={() => setDialog(false)}
        open={dialog}
        onSubmit={logout}
        type="sign-out"
      />
      <Drawer
        variant="permanent"
        anchor={isRTL ? "right" : "left"}
        sx={{
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box
          sx={{
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            height: "100%",

          }}
        >
          <List dir={isRTL ? "rtl" : "ltr"}>
            <ListItem
              disablePadding
              sx={{
                backgroundColor: "#F3F6F9",
                ...(isRTL ? { borderRight: "5px solid #1F7BF4" } : { borderLeft: "5px solid #1F7BF4" })
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <IconButton>
                    <Icon
                      icon="fluent-emoji-high-contrast:student"
                      color="#1F7BF4"
                      fontSize={20}
                    />
                  </IconButton>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 600, fontSize: "14px", textAlign: isRTL ? "right" : "left" }}>
                      {t(`Students' Data`)}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          </List>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ p: 2 }}>
            <List dir={isRTL ? "rtl" : "ltr"}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setDialog(true)}>
                  <ListItemIcon>
                    <IconButton>
                      <Icon icon="hugeicons:logout-04" fontSize={20} />
                    </IconButton>
                  </ListItemIcon>
                  <ListItemText primary={t("logout")} sx={{ textAlign: isRTL ? "right" : "left" }} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Drawer>
    </React.Fragment>
  );
};

export default CustomDrawer;
