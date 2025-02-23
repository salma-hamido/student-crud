import {
  Pagination,
  PaginationItem,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

const PaginationContext = React.createContext({
  list: [],
  page: 1,
  rowsPerPage: 30,
  count: 0,
  total: 0,
});

export default function RoundedPagination({ currentPage, pageCount, setPage }: any) {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar'

  const state: any = useContext(PaginationContext);

  const handleRowsPerPageChange = (event: any) => {
    state.setRowsPerPage(event.target.value);
    setPage(1); // Reset to first page when rows per page changes
  };

  return (
    <Pagination
      shape="rounded"
      count={
        typeof state === "undefined" || state.count === 0
          ? pageCount
          : Math.ceil(state.total / state.rowsPerPage)
      }
      page={
        typeof state === "undefined" || state.count === 0
          ? currentPage
          : state.page
      }
      onChange={(event: any, value: any) => {
        setPage(value);
        state.onPageChange && state.onPageChange(value);
      }}
      renderItem={(props) => <PaginationItem {...props} />}
      sx={{
        float: "right",
        "& ul > li:not(:first-child):not(:last-child) > button:not(.Mui-selected)":
        {
          backgroundColor: "#F1F2F6",
          color: "#1F7BF4",
        },
        "& ul > li:not(:first-child):not(:last-child) > button": {
          color: "#fff",
          backgroundColor: "#1F7BF4",
        },
      }}
      showFirstButton
      showLastButton

    />
  );
}

