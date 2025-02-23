import {
      DataGrid,
      useGridApiRef,
} from "@mui/x-data-grid";
import React, { useState } from "react";
import { arSD } from "@mui/x-data-grid/locales/arSD";
import RoundedPagination from "./RoundedPagination";

const CustomDataGrid = (props: any) => {
      let {
            pageName,
            data,
            columnVisibilityModel,
            rows,
            columns,
            disableRowSelectionOnClick,
            getRowClassName,
            checkboxSelection,
            rowSelectionModel,
            onRowSelectionModelChange,
            isRowSelectable,
            initialState,
            sx,
            getRowId,
            rowHeight,
            apiRef,
            disableSpacing,
            pageSize,
            onPageChange,
      } = props;

      const _apiRef = apiRef;

      const locale = 'ar';
      if (!rows) rows = data;

      const [paginationModel, setPaginationModel] = useState({
            pageSize: pageSize || 30,
            page: 0,
      });

      const [columnVisibility, setColumnVisibility] = useState(columnVisibilityModel || {});

      function _savePageConfig(model: any) {
            setPaginationModel(model);
      }

      const mainStyle = {
            border: 0,
            "& .MuiDataGrid-columnHeader": {
                  backgroundColor: "#1F7BF4",
                  color: "white",
                  fontWeight: "bolder",
                  fontSize: "0.9rem",
                  padding: "12px 16px",
                  //   borderRadius: '12px'
            },
            "& .MuiDataGrid-row": {
                  backgroundColor: "white",
                  borderRadius: "12px",
                  fontSize: "0.8rem",
                  transition: "all 200ms",
                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
                  ":hover": {
                        backgroundColor: "white",
                        boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.15)",
                  },
                  ".Mui-hovered": {
                        backgroundColor: "white",
                  },
            },
            "& .MuiDataGrid-row:nth-of-type(even)": {
                  backgroundColor: "#EEF5F9",
            },
            "& .MuiDataGrid-pagination": {
                  backgroundColor: "primary.main",
                  color: "white",
                  "& .MuiButtonBase-root": {
                        color: "white",
                  },
            },
      };

      const _columns = columns.map((col: any) => ({
            ...col,
            resizable: false,
            hideable: false,
            align: "center",
            headerAlign: "center",
      }));

      return (
            <DataGrid
                  {...props}
                  pagination
                  paginationModel={paginationModel}
                  onPaginationModelChange={_savePageConfig}
                  slots={{
                        pagination: () => (
                              <RoundedPagination
                                    currentPage={paginationModel.page + 1}
                                    pageCount={Math.ceil(data?.length / paginationModel.pageSize)}
                                    setPage={(page: any) => {
                                          _savePageConfig({ ...paginationModel, page: page - 1 });
                                          onPageChange && onPageChange();
                                    }}
                              />
                        ),
                  }}
                  apiRef={_apiRef}
                  componentsProps={{
                        toolbar: {
                              data,
                              _apiRef,
                        },
                  }}
                  rows={rows}
                  columns={_columns}
                  autoHeight
                  disableRowSelectionOnClick={disableRowSelectionOnClick}
                  columnVisibilityModel={columnVisibility}
                  onColumnVisibilityModelChange={setColumnVisibility}
                  getRowSpacing={(params) =>
                        disableSpacing
                              ? {}
                              : {
                                    top: params.isFirstVisible ? 6 : 2,
                                    bottom: 2,
                              }
                  }
                  {...(locale == "ar"
                        ? {
                              localeText: arSD,
                        }
                        : {})}
                  {...(rowHeight ? { rowHeight } : { rowHeight: 50 })}
                  {...(sx ? { sx: { ...mainStyle, ...sx } } : { sx: mainStyle })}
                  {...(initialState ? { initialState } : {})}
                  {...(getRowClassName ? { getRowClassName } : {})}
                  {...(checkboxSelection ? { checkboxSelection } : {})}
                  {...(rowSelectionModel ? { rowSelectionModel } : {})}
                  {...(onRowSelectionModelChange ? { onRowSelectionModelChange } : {})}
                  {...(isRowSelectable ? { isRowSelectable } : {})}
                  {...(getRowId ? { getRowId } : {})}
            />
      );
};

export default CustomDataGrid;