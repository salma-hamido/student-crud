import React from "react";
import {
      Box,
      Button,
      Dialog,
      DialogActions,
      DialogContent,
      DialogTitle,
      IconButton,
      Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react/dist/iconify.js";

const ConfirmDialog = (props: any) => {
      const { i18n, t } = useTranslation();
      const is_delete = props.type === "delete";

      const _style = {
            icon: is_delete ? "material-symbols:info-outline" : "codicon:sign-out",
            color: is_delete ? "#F34235" : "#1F7BF4"
      }

      return (
            <Dialog dir={i18n.dir()}
                  maxWidth="sm" scroll="paper"
                  PaperProps={{
                        sx: {
                              borderRadius: '12px',
                        },
                  }}
                  {...props}>
                  <DialogTitle
                        sx={{
                              bgcolor: _style.color,
                              color: "white",
                              padding: "0.5rem 1rem 0.3rem 1rem",
                              maxWidth: "100%",
                              borderRadius: '12px'
                        }}
                  >
                        <Box display="flex" alignItems="center" justifyContent="center"
                              sx={{ padding: "2rem", borderBottomLeftRadius: '1rem', borderBottomRightRadius: '1rem' }}>
                              <Icon icon={_style.icon} fontSize={55} />
                        </Box>
                  </DialogTitle>
                  <DialogContent sx={{ mt: 4, textAlign: 'center' }}>
                        {
                              is_delete ? (
                                    <React.Fragment>
                                          <Typography variant="h6" color={_style.color} fontWeight={600}>
                                                {t("Are you sure ?")}
                                          </Typography>
                                          <Typography variant="body1">
                                                {t("Are you sure you want to delete this student's information?")}
                                          </Typography>
                                          <Typography variant="body2" color={_style.color}>
                                                {t("This action cannot be undone.")}
                                          </Typography>
                                    </React.Fragment>
                              ) : (
                                    <React.Fragment>
                                          <Typography variant="h6" color={_style.color} fontWeight={600}>
                                                {t("Sign out")}
                                          </Typography>
                                          <Typography variant="body1">
                                                {t("Are you sure you would like to sign out of your account?")}
                                          </Typography>
                                    </React.Fragment>
                              )
                        }
                  </DialogContent>
                  <DialogActions>
                        <div style={{ margin: '1.5rem auto 1rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>

                              <Button variant="contained"
                                    sx={{ color: "white", backgroundColor: _style.color, textTransform: 'capitalize', borderRadius: '7px', width: '120px' }}
                                    onClick={props.onSubmit}
                              >

                                    {is_delete ? t("Delete") : t("Sign out")}
                              </Button>

                              <Button variant="outlined"
                                    sx={{ color: _style.color, borderColor: _style.color, textTransform: 'capitalize', borderRadius: '7px', width: '120px' }}
                                    onClick={(event) => props.onClose(event, "backdropClick")}
                              >

                                    {t("Cancel")}
                              </Button>
                        </div>
                  </DialogActions>
            </Dialog>
      );
};

export default ConfirmDialog;