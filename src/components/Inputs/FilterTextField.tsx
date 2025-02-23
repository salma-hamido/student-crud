import { styled } from "@mui/material";
import MuiTextField from "@mui/material/TextField";

const options = {
      shouldForwardProp: (prop: any) => prop !== "borderColor",
};
const outlinedSelectors = [
      "& .MuiOutlinedInput-notchedOutline",
      "&:hover .MuiOutlinedInput-notchedOutline",
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline",
];

const FilterTextField = styled(
      MuiTextField,
      options
)(({ borderColor }: any) => ({
      "& label.Mui-focused": {
            color: borderColor,
      },
      [outlinedSelectors.join(",")]: {
            borderWidth: 1,
            borderRadius: "10px",
            borderColor,
      },
      "& .MuiInputBase-input": {
            backgroundColor: "#F1F2F6",
            borderRadius: "14px",
            px: 4,
      },
}));

export default FilterTextField;
