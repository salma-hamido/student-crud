import React, { useState } from "react";
import {
      Box,
      Divider,
      FormControl,
      FormHelperText,
      Grid,
      GridOwnProps,
      IconButton,
      InputAdornment,
      ListSubheader,
      MenuItem,
      OutlinedInput,
      Select,
      SelectProps,
      SelectVariants,
      SxProps,
      TextField,
      TextFieldProps,
      TextFieldVariants,
      Typography,


} from "@mui/material";

import { Control, Controller, FieldError, FieldErrorsImpl, FieldValues, Merge, RegisterOptions } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

type CustomInputFieldProps = {
      rules?:
      | Omit<
            RegisterOptions<FieldValues, any>,
            "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
      | undefined;
      required?: boolean;
      name: string;
      label?: string | React.ReactNode;
      labelProps?: {
            textColor?: string;
            sx?: SxProps;
      };
      error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
      gridProps?: GridOwnProps;
      fieldProps?: {
            variant?: TextFieldVariants;
      } & Omit<TextFieldProps, "variant">;
      readOnly?: boolean;
      type: "text" | "number" | "email" | "password" | "file" | "longtext";
      rows?: number;
      variant?: "filled" | "outlined" | "standard" | "labelBefore" | undefined
};

type CustomSelectFieldProps = {
      rules?:
      | Omit<
            RegisterOptions<FieldValues, any>,
            "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
      | undefined;
      required: boolean;
      name: string;
      label?: string | React.ReactNode;
      labelProps?: {
            textColor?: string;
            sx?: SxProps;
      };
      error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
      gridProps?: GridOwnProps;
      readOnly?: boolean;
      options: { key: string | number; value: string | number; disabled?: boolean }[];
      fieldProps?: {
            variant?: SelectVariants;
      } & Omit<SelectProps<SelectVariants>, "variant">;
      type: "select";
      variant?: "filled" | "outlined" | "standard" | "labelBefore" | undefined;
      afterChange?: (value: any) => void;
};

type CustomDateFieldType = {
      rules?:
      | Omit<
            RegisterOptions<FieldValues, any>,
            "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
      | undefined;
      required?: boolean;
      name: string;
      label?: string | React.ReactNode;
      labelProps?: {
            textColor?: string;
            sx?: SxProps;
      };
      error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
      gridProps?: GridOwnProps;
      fieldProps?: {
            variant?: TextFieldVariants;
      } & Omit<TextFieldProps, "variant">;
      readOnly?: boolean;
      type: "date";
      showTime?: boolean;
};

type CustomElement = {
      type: "custom";
      name: string;
      CustomComponent: React.ReactNode;
};

export type Fields = (
      | CustomInputFieldProps
      | CustomSelectFieldProps
      | CustomDateFieldType
      | CustomElement
) & {
      disabled?: boolean;
};

type FieldsDistributorProps = {
      control: any;
      fields: Fields[];
};

const CustomInputField = ({
      control,
      rules,
      required = false,
      name,
      label,
      labelProps,
      gridProps = {},
      error,
      type = "text",
      readOnly,
      fieldProps = {},
      rows,

}: CustomInputFieldProps & { control: Control<FieldValues> }) => {

      let { sx } = fieldProps;
      delete fieldProps.sx;
      if (!sx) sx = {};

      return (
            <Grid item {...gridProps}>
                  <FormControl required={required} fullWidth>
                        <Typography fontSize="0.9rem" color={labelProps?.textColor} sx={{ ...labelProps?.sx }}>{label}</Typography>
                        <Controller
                              name={name}
                              control={control}
                              rules={rules}
                              render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                                    <React.Fragment>
                                          <Box
                                                display="flex"
                                                justifyContent="space-between"
                                                {...(rows ? {} : { alignItems: "center" })}
                                          >
                                                <TextField
                                                      disabled={readOnly}
                                                      size="medium"
                                                      required={required}
                                                      // label={label}
                                                      fullWidth
                                                      sx={{ ...sx, maxWidth: "100%" }}
                                                      InputLabelProps={{
                                                            sx: {
                                                                  textTransform: "capitalize",
                                                            },
                                                      }}
                                                      value={value}
                                                      onBlur={onBlur}
                                                      onChange={onChange}
                                                      error={Boolean(error)}
                                                      type={type}
                                                      multiline={type === "longtext"}
                                                      InputProps={{ rows }}
                                                      {...fieldProps}
                                                />
                                          </Box>
                                          <FormHelperText
                                                sx={{ color: "error.main" }}
                                          >
                                                {error?.message}
                                          </FormHelperText>
                                    </React.Fragment>
                              )
                              }
                        />
                  </FormControl>
            </Grid>
      );
};

const CustomSelectField = ({
      control,
      rules,
      required = false,
      name,
      label,
      labelProps,
      readOnly,
      gridProps = {},
      error,
      options,
      fieldProps = {}

}: CustomSelectFieldProps & { control: Control<FieldValues> }) => {


      const renderSelectGroup = (option: any) => {

            const items = option.items.map((p: any) => {

                  return (
                        <MenuItem key={p.key} value={p.key}>{p.value}</MenuItem>
                  );
            });

            return [<ListSubheader>{option.group}</ListSubheader>, items];
      };

      return (
            <Grid item {...gridProps}>
                  <FormControl size="medium" required={required} fullWidth>
                        <Typography fontSize="0.9rem" color={labelProps?.textColor} sx={{ ...labelProps?.sx }}>{label}</Typography>
                        <Controller
                              name={name}
                              control={control}
                              rules={rules}
                              render={({ field: { value, onChange, onBlur, name } }) => {
                                    return (
                                          <Box
                                                display="flex"
                                                justifyContent="space-between"
                                                alignItems="center"
                                          >
                                                <Select
                                                      fullWidth
                                                      disabled={readOnly}
                                                      required={required}
                                                      labelId={name + "-select-outlined-label"}
                                                      value={
                                                            value || (fieldProps.multiple ? [] : "")
                                                      }
                                                      onBlur={onBlur}
                                                      onChange={onChange}
                                                      error={Boolean(error)}
                                                      {...fieldProps}
                                                      sx={{
                                                            ...(fieldProps.sx ? fieldProps.sx : {}),
                                                            maxWidth: "100%",
                                                      }}
                                                      size="small"
                                                      variant="outlined"
                                                >
                                                      {options?.map((opt: any, index: any) => {
                                                            if (opt?.group && opt?.items) {
                                                                  return (options?.map((p: any) => renderSelectGroup(p)))

                                                            } else {
                                                                  return (
                                                                        <MenuItem key={opt.key} disabled={opt.disabled} value={opt.key}>
                                                                              {opt.value}
                                                                        </MenuItem>
                                                                  );
                                                            }
                                                      })}
                                                </Select>
                                          </Box>
                                    );
                              }}
                        />
                        {error && (
                              <FormHelperText sx={{ color: "error.main" }}>
                                    {error?.message &&
                                          typeof error?.message === "string" &&
                                          error.message}
                              </FormHelperText>
                        )}
                  </FormControl>
            </Grid>
      );
};

const CustomDateField = ({
      control,
      rules,
      required = false,
      name,
      label,
      labelProps,
      gridProps = {},
      error,
      fieldProps = {},
      showTime,
}: CustomDateFieldType & any) => {

      let { sx } = fieldProps;
      delete fieldProps.sx;
      if (!sx) sx = {};


      const [date, setDate] = React.useState<Date | null>(fieldProps.value || null);
      // const { i18n } = useTranslation();
      // const popperPlacement = i18n.dir() === "ltr" ? "bottom-start" : "bottom-end";
      const popperPlacement = "bottom-end";
      const convertToData = (data: any) => {
            try {
                  return new Date(data);
            } catch (error) {
                  console.log(error);
                  return "";
            }
      };

      function preparedDate() {
            if (!date) return "";
            return showTime
                  ? moment(date).format("YYYY - MM - DD | hh:mm A")
                  : moment(date).format("YYYY - MM - DD");
      }

      const PickersComponent = React.memo(
            React.forwardRef((props: any, ref: any) => {
                  // ** Props
                  const { label, readOnly }: any = props;
                  return (
                        <TextField
                              fullWidth
                              inputRef={ref}
                              {...props}
                              label={label || ""}
                              {...(readOnly && { inputProps: { readOnly: true } })}
                              value={preparedDate()}
                              size="small"
                              width="100%"
                        />
                  );
            })
      );

      return (
            <Grid item {...gridProps}>
                  <Typography fontSize="0.9rem" color={labelProps?.textColor} sx={{ ...labelProps?.sx }}>{label}</Typography>
                  <Controller
                        name={name}
                        control={control}
                        rules={rules}
                        render={({ field }) => {
                              const isDateObject = field.value instanceof Date;
                              if (isDateObject && field.value.getTime() !== date?.getTime()) {
                                    setDate(field.value);
                              }

                              return (
                                    <ReactDatePicker
                                          showTimeSelect={showTime}
                                          required={required}
                                          dateFormat="dd/MM/yyyy"
                                          showYearDropdown
                                          showMonthDropdown
                                          onChange={(date) => {
                                                field.onChange(date);
                                                date && setDate(date);
                                          }}
                                          selected={
                                                typeof field.value !== "object" && field.value
                                                      ? convertToData(field.value)
                                                      : typeof field.value === "object"
                                                            ? field.value
                                                            : ""
                                          }
                                          popperPlacement={popperPlacement}
                                          customInput={
                                                <Box position="relative" zIndex={2}>
                                                      <PickersComponent
                                                            size="medium"
                                                            error={Boolean(error)}
                                                      // label={label}
                                                      />
                                                </Box>
                                          }
                                          {...fieldProps}
                                          sx={{ ...sx, maxWidth: "100%" }}
                                    //  locale={i18n.language === "ar" ? ar : null}

                                    />
                              );
                        }}
                  />
                  {error && (
                        <FormHelperText sx={{ color: "error.main" }}>
                              {error?.message}
                        </FormHelperText>
                  )}
            </Grid>
      );
};

const CustomPasswordField = ({
      control,
      rules,
      required = false,
      name,
      label,
      labelProps = {},
      gridProps = {},
      error,
      readOnly,
      fieldProps = {},
}: CustomInputFieldProps & any) => {

      const [showPassword, setShowPassword] = useState(false);
      return (
            <Grid item {...gridProps}>
                  <FormControl required={required} fullWidth>
                        <Typography fontSize="0.9rem" color={labelProps?.textColor} sx={{ ...labelProps?.sx }}>{label}</Typography>
                        <Controller
                              name={name}
                              control={control}
                              rules={rules}
                              render={({ field: { value, onChange, onBlur } }) => (
                                    <OutlinedInput
                                          //  label={label}
                                          id="auth-login"
                                          disabled={!!readOnly}
                                          size="medium"
                                          required={required}
                                          value={value}
                                          onBlur={onBlur}
                                          onChange={onChange}
                                          error={Boolean(error)}
                                          type={showPassword ? "text" : "password"}
                                          {...fieldProps}
                                          endAdornment={
                                                <InputAdornment position="end">
                                                      <IconButton
                                                            edge="end"
                                                            onMouseDown={(e) => e.preventDefault()}
                                                            onClick={() =>
                                                                  setShowPassword(!showPassword)
                                                            }
                                                      >
                                                            {showPassword ? (
                                                                  <FaRegEye />
                                                            ) : (
                                                                  <FaRegEyeSlash />
                                                            )}
                                                      </IconButton>
                                                </InputAdornment>
                                          }
                                    />
                              )}
                        />
                        {error && (
                              <FormHelperText sx={{ color: "error.main" }}>
                                    {error?.message}
                              </FormHelperText>
                        )}
                  </FormControl>
            </Grid>
      );
};



const FieldsDistributor = ({ control, fields }: FieldsDistributorProps) => {
      return fields.map((item: any) => {
            if (item.disabled) return "";
            if (
                  item.type === "text" ||
                  item.type === "number" ||
                  item.type === "email" ||
                  item.type === "longtext"
            )
                  return <CustomInputField {...item} control={control} key={item.name} />;
            if (item.type === "select")
                  return <CustomSelectField {...item} control={control} key={item.name} />;
            if (item.type === "date")
                  return <CustomDateField {...item} control={control} key={item.name} />;
            if (item.type === "custom")
                  return <item.CustomComponent key={item.name}>{item.CustomComponent}</item.CustomComponent>;
            if (item.type === "password")
                  return <CustomPasswordField {...item} control={control} key={item.name} />;
            if (item.type === "divider")
                  return (
                        <Grid item xs={12} my={3} mt={6} px={4} pt={4}>
                              <Typography variant="subtitle2" mx={1}>
                                    {item.label}
                              </Typography>
                              <Divider />
                        </Grid>
                  );
      });
};

export default FieldsDistributor;
