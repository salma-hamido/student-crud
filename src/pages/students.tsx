import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import CustomDataGrid from "../components/DataGrid/CustomDataGrid";
import { Divider } from "@mui/material";
import FilterTextField from "../components/Inputs/FilterTextField";
import TextField from "@mui/material/TextField";
import { MenuItem, Select } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ConfirmDialog from "../components/Dialogs/ConfirmDialog";
import CreateUpdateDialog from "../components/Dialogs/CreateUpdateDialog";
import moment from "moment";
import ReactDatePicker from "react-datepicker";

import { useStudent } from "../hooks/useStudent";
import Loading from "../components/loading";

export default function Students() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const { students, deleteStudent, loading } = useStudent();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedOperator, setSelectedOperator] = useState("Equal to");
  const [deleteDialog, setDeleteDialog] = React.useState({ value: false, id: "" })
  const [dialog, setDialog] = React.useState<any>();


  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const handleOperatorChange = (event: any) => {
    setSelectedOperator(event.target.value);
  };


  const filteredRows = React.useMemo(() => {
    return students?.filter((row: any) => {
      const matchesName = `${row?.firstName} ${row?.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const rowDate = new Date(row?.birthDate);
      const selectedDateObj = new Date(selectedDate);

      let matchesDate = true;
      if (selectedDate) {
        if (selectedOperator === "Equal to") {
          matchesDate = rowDate.toDateString() === selectedDateObj.toDateString();
        } else if (selectedOperator === "Greater than") {
          matchesDate = rowDate > selectedDateObj;
        } else if (selectedOperator === "Less than") {
          matchesDate = rowDate < selectedDateObj;
        }
      }

      return matchesName && matchesDate;
    });
  }, [students, searchTerm, selectedDate, selectedOperator]);


  const columns = [
    {
      field: "firstName",
      headerName: t("First Name"),
      flex: 1,
    },
    {
      field: "lastName",
      headerName: t("Last Name"),
      flex: 1,
    },
    {
      field: "date_birth",
      headerName: t("Birth Date"),
      flex: 1,
      renderCell: ({ row }: any) => {
        const { birthDate } = row;

        return moment(birthDate).format("MM-DD-YYYY")
      }
    },
    {
      field: "educationl_level",
      headerName: t("Educational level"),
      flex: 1,
      minWidth: 150,
      renderCell: ({ row }: any) => {
        let iconColor = "black";
        const _grade = row?.grade?.translations?.find((p: any) => p?.cultureCode === 0)?.name

        switch (_grade) {
          case "Grade 8":
            iconColor = "#6ACC74";
            break;
          case "Grade 9":
            iconColor = "#783EFD";
            break;
          case "Grade 5":
            iconColor = "#F9896B";
            break;
          default:
            iconColor = "black";
        }

        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Icon
              icon="oui:dot"
              fontSize={20}
              style={{ color: iconColor, marginRight: "8px" }}
            />
            {row?.grade?.translations[0]?.name}
          </div>
        );
      },
    },
    {
      field: "gender",
      headerName: t("Gender"),
      flex: 1,
      renderCell: ({ row }: any) => {
        const { gender } = row;
        const is_female = gender.translations.find((p: any) => p?.cultureCode === 0)?.name === "Female"
        const _gender = is_female ? t("Female") : t("Male")

        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Icon
              icon={is_female ? "fa:female" : "fa-solid:male"}
              fontSize={20}
              style={{
                color: is_female ? "#E330C7" : "#6591FF",
                marginRight: isRTL ? "1px" : "8px",
                marginLeft: isRTL ? "8px" : "1px"
              }}
            />
            {_gender}
          </div>
        );
      },
    },
    {
      field: "country",
      headerName: t("Country"),
      flex: 1,
    },
    {
      field: "city",
      headerName: t("City"),
      flex: 1,
    },
    {
      field: "phone",
      headerName: t("Mobile Number"),
      flex: 1,
      minWidth: 150,
    },
    {
      field: "remarks",
      headerName: t("Notes"),
      flex: 1,
    },
    {
      field: "actions",
      headerName: t("Actions"),
      flex: 1,
      renderCell: ({ row }: any) => {
        return (
          <div style={{ direction: isRTL ? "ltr" : "rtl" }}>
            <IconButton
              onClick={() => setDeleteDialog({ value: true, id: row?.id })}
            >
              <Icon
                icon="fluent:delete-12-filled"
                style={{ color: 'red' }}
                fontSize={18}
              />
            </IconButton>


            <IconButton
              onClick={() => setDialog({ type: "update", data: row })}
            >
              <Icon
                icon="lucide:edit-2"
                style={{ color: 'green' }}
                fontSize={18}
              />
            </IconButton>
          </div>
        );
      },
    },
  ];





  console.log('filteredRows xx: ', filteredRows)

  return (
    <React.Fragment>
      <CreateUpdateDialog
        type={dialog?.type}
        open={!!dialog}
        title={dialog?.type === 'create' ? t("Add New") : t("Modify Student Data")}
        rowSelected={dialog?.data}
        onClose={() => setDialog(null)}
      />
      <ConfirmDialog
        onClose={() => setDeleteDialog((prev) => ({
          ...prev,
          value: false
        }))}
        open={deleteDialog.value}
        onSubmit={async () => {
          const is_delete = await deleteStudent(deleteDialog?.id)
          if (is_delete) {
            setDeleteDialog((prev) => ({
              ...prev,
              value: false
            }))
          }
        }}
        type="delete"
      />

      {
        loading ? <Loading /> :
          <Box sx={{ display: "flex", paddingTop: '8rem' }}>
            <Card sx={{ borderRadius: "9px", width: "1240px" }}>
              <CardContent>
                <Header setDialog={setDialog} />
                <Filter
                  searchTerm={searchTerm}
                  handleSearchChange={handleSearchChange}
                  selectedDate={selectedDate}
                  handleDateChange={handleDateChange}
                  selectedOperator={selectedOperator}
                  handleOperatorChange={handleOperatorChange}
                />

                <Divider sx={{ my: 2, height: "2px", backgroundColor: "#99999957" }} />

                <CustomDataGrid
                  pageName="Students"
                  columns={columns}
                  data={filteredRows}
                  pageSize={30}
                />
              </CardContent>
            </Card>
          </Box>
      }
    </React.Fragment>
  );

}



const Header = ({ setDialog }: any) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" component="div" gutterBottom fontWeight={500}>
        {t("Students' Data")}
      </Typography>

      <Button
        variant="contained"
        sx={{
          textTransform: "capitalize",
          borderRadius: "9px",
          backgroundColor: "#1F7BF4",
        }}
        startIcon={
          <Icon
            icon="material-symbols:add"
            className="ml-2"
            fontSize={18}
          />
        }
        onClick={() => setDialog({ type: "create", data: null })}
      >
        {t("Add Student")}
      </Button>
    </Box>
  );
};



const Filter = ({
  searchTerm,
  handleSearchChange,
  selectedDate,
  handleDateChange,
  selectedOperator,
  handleOperatorChange,
}: any) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography
        variant="subtitle2"
        gutterBottom
        sx={{
          display: "flex", alignItems: "center", gap: 1, color: "#1F7BF4",
          marginLeft: '.5rem', marginRight: '.5rem'
        }}
      >
        <Icon icon="hugeicons:filter-horizontal" fontSize={20} />

        {t("Filter By: ")}
      </Typography>

      <FilterTextField
        id="outlined-basic"
        label={t("Search by first name, last name")}
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        size="small"
        InputLabelProps={{
          style: { color: "rgb(119 116 116 / 63%)", fontSize: "14px" },
        }}
        sx={{ width: "16rem", ml: 2 }}
      // borderColor="rgb(119 116 116 / 63%)"
      />

      <DateFilter
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
        selectedOperator={selectedOperator}
        handleOperatorChange={handleOperatorChange}
      />
    </Box>
  );
};



const DateFilter = ({
  selectedDate,
  handleDateChange,
  selectedOperator,
  handleOperatorChange,
}: any) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const operators = ["Equal to", "Greater than", "Less than"];

  return (
    <Box sx={{ display: "flex", alignItems: "center", ml: 3 }}>
      <Select
        value={selectedOperator}
        onChange={handleOperatorChange}
        size="small"
        sx={{
          borderRadius: isRTL ? "0 10px 10px 0" : "10px 0 0 10px",
          backgroundColor: "#F1F2F6",
        }}
        SelectDisplayProps={{
          style: { fontSize: "14px" },
        }}
      >
        {operators.map((operator) => (
          <MenuItem key={operator} value={operator} sx={{ textAlign: isRTL ? "right" : "left" }}>
            {t(operator)}
          </MenuItem>
        ))}
      </Select>
      <ReactDatePicker
        className="test-class"
        showTimeSelect={false}
        dateFormat="dd/MM/yyyy"
        showYearDropdown
        scrollableYearDropdown
        showMonthDropdown
        onChange={(date) => {
          handleDateChange(date);
        }}
        selected={selectedDate}
        popperPlacement={"bottom-end"}
        customInput={
          <Box position="relative" zIndex={2}>
            <TextField
              fullWidth
              value={selectedDate ? moment(selectedDate).format("DD/MM/YYYY") : ""}
              size="small"
              sx={{
                backgroundColor: "#F1F2F6",
                ...(!isRTL ? {
                  borderTopRightRadius: "12px",
                  borderBottomRightRadius: "12px",
                } : {
                  borderTopLeftRadius: "12px",
                  borderBottomLeftRadius: "12px",
                }),
                "& .MuiInputBase-root": {
                  ...(!isRTL ? {
                    borderTopRightRadius: "12px",
                    borderBottomRightRadius: "12px",
                    borderTopLeftRadius: "0px",
                    borderBottomLeftRadius: "0px",
                  } : {
                    borderTopLeftRadius: "12px",
                    borderBottomLeftRadius: "12px",
                    borderTopRightRadius: "0px",
                    borderBottomRightRadius: "0px",
                  })
                }
              }}
              InputProps={{
                endAdornment: (
                  selectedDate ?
                    <IconButton
                      onClick={() => handleDateChange(null)}
                      sx={{ padding: 0 }}
                    >
                      <Icon
                        icon="mdi:close-circle"
                        fontSize={20}
                        style={{ marginLeft: "5px", marginRight: "5px" }}
                      />
                    </IconButton> :
                    <Icon icon="mdi:calendar" fontSize={20} style={{ cursor: "pointer", marginLeft: "5px", marginRight: "5px" }} />
                ),
              }}
            />
          </Box>
        } />
    </Box>
  );
};
