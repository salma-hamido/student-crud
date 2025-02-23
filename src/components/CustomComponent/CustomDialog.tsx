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
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

const CustomDialog = (props: any) => {
      const withoutTitle = Object.keys(props).includes("withoutTitle") ? props.withoutTitle : false;
      const { i18n } = useTranslation();
      return (
            <Dialog dir={i18n.dir()} maxWidth="lg" scroll="paper" {...props}>
                  {!withoutTitle && (
                        <DialogTitle
                              sx={{
                                    bgcolor: "white",
                                    color: "black",
                                    padding: "0.5rem 1rem 0.3rem 1rem",
                                    maxWidth: "100%",
                              }}
                        >
                              <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                              >
                                    <Box height="fit-content">
                                          <Typography variant="h6">{props.title}</Typography>
                                    </Box>
                                    <IconButton
                                          sx={{ fontSize: 30 }}
                                          onClick={(event) => props.onClose(event, "backdropClick")}
                                    >
                                         <Icon icon="tdesign:multiply" fontSize={25} />
                                    </IconButton>
                              </Box>
                        </DialogTitle>
                  )}
                  {props.customContent ? (
                        props.children
                  ) : (
                        <DialogContent>{props.children}</DialogContent>
                  )}
            </Dialog>
      );
};

export default CustomDialog;