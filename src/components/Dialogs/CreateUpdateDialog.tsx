import { yupResolver } from "@hookform/resolvers/yup";
import CustomDialog from "../CustomComponent/CustomDialog";
import FieldsDistributor, { Fields } from "../Inputs/FieldsDistributor";
import { Box, Button, Grid } from "@mui/material";
import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

import countries from "../../dummy-data/countries.json";
import moment from "moment";

import { useStudent } from "../../hooks/useStudent";

type RowSelected = {
      id?: string;
      firstName: string;
      lastName: string;
      birthDate: string;
      grade: string;
      country: string;
      city: string;
      phone: string;
      gender: string;
      remarks: string;
}

type CreateUpdateDialogProps = {
      type: "create" | "update";
      open: boolean;
      title: string;
      rowSelected: RowSelected;
      onClose: () => void;
}

const CreateUpdateDialog = (props: CreateUpdateDialogProps) => {
      const { type, rowSelected } = props;

      const { t } = useTranslation();
      const { grades, gender, addStudent, updateStudent } = useStudent();

      console.log('rowSelected: ', rowSelected)

      const schema = React.useMemo(
            () =>
                  Yup.object({
                        firstName: Yup.string().required(t("This field is required")),
                        lastName: Yup.string().required(t("This field is required")),
                        birthDate: Yup.string().required(t("This field is required")),
                        grade: Yup.string().required(t("This field is required")),
                        gender: Yup.string().required(t("This field is required")),
                        country: Yup.string().required(t("This field is required")),
                        city: Yup.string().required(t("This field is required")),
                        phone: Yup.string().required(t("This field is required")),
                        remarks: Yup.string().required(t("This field is required")),
                  }),
            [t]
      );

      const formMethods: UseFormReturn<RowSelected> = useForm({
            defaultValues: {
                  firstName: '',
                  lastName: '',
                  birthDate: '',
                  grade: '',
                  country: '',
                  city: '',
                  phone: '',
                  gender: '',
                  remarks: '',
            },
            resolver: yupResolver(schema),
            mode: 'onBlur',
      });

      const { control, handleSubmit, formState: { errors }, watch, reset } = formMethods;



      console.log('errors: ', errors)

      console.log(watch())

      const selectedCities = React.useMemo(() => {
            return countries.find((country) => country.country === watch('country'))?.cities || [];
      }, [watch('country')]);


      const fields: Fields[] = [
            {
                  type: "text",
                  name: "firstName",
                  label: t("First Name*"),
                  labelProps: { textColor: 'gray' },
                  gridProps: { xs: 6, mb: 1, mt: 2 },
                  fieldProps: { size: "small" },
                  required: true,
                  error: errors?.firstName,
            },
            {
                  type: "text",
                  name: "lastName",
                  label: t("Last Name*"),
                  labelProps: { textColor: 'gray' },
                  gridProps: { xs: 6, mb: 1, mt: 2 },
                  fieldProps: { size: "small" },
                  required: true,
                  error: errors?.lastName,
            },
            {
                  type: "date",
                  name: "birthDate",
                  label: t("Date of Birth*"),
                  labelProps: { textColor: 'gray' },
                  gridProps: { xs: 6, my: 1 },
                  fieldProps: { size: "small" },
                  required: true,
                  error: errors?.birthDate,
            },
            {
                  type: "select",
                  name: "grade",
                  label: t("Educational level*"),
                  labelProps: { textColor: 'gray' },
                  options: grades?.map((_g: any) => ({ key: _g.id, value: _g?.translations?.find((p: any) => p?.cultureCode === 0)?.name })) || [],
                  gridProps: { xs: 6, my: 1 },
                  fieldProps: { size: "small", multiple: false },
                  required: true,
                  error: errors?.grade,
            },
            {
                  type: "select",
                  name: "country",
                  label: t("Country*"),
                  labelProps: { textColor: 'gray' },
                  options: countries?.map((_c: any) => ({ key: _c.country, value: _c.country })) || [],
                  gridProps: { xs: 6, my: 1 },
                  fieldProps: { size: "small", multiple: false },
                  required: true,
                  error: errors?.country,
            },
            {
                  type: "select",
                  name: "city",
                  label: t("City*"),
                  labelProps: { textColor: 'gray' },
                  options: selectedCities?.map((_c: any) => ({ key: _c, value: _c })) || [],
                  gridProps: { xs: 6, my: 1 },
                  fieldProps: { size: "small", multiple: false },
                  required: true,
                  error: errors?.city,
            },
            {
                  type: "text",
                  name: "phone",
                  label: t("Mobile*"),
                  labelProps: { textColor: 'gray' },
                  gridProps: { xs: 6, my: 1 },
                  fieldProps: { size: "small" },
                  required: true,
                  error: errors?.phone,
            },
            {
                  type: "select",
                  name: "gender",
                  label: t("Gender*"),
                  labelProps: { textColor: 'gray' },
                  options: gender?.map((_g: any) => ({ key: _g.id, value: _g?.translations?.find((p: any) => p?.cultureCode === 0)?.name })) || [],
                  gridProps: { xs: 6, my: 1 },
                  fieldProps: { size: "small", multiple: false },
                  required: true,
                  error: errors?.gender,
            },
            {
                  type: "longtext",
                  name: "remarks",
                  label: t("Notes"),
                  labelProps: { textColor: 'gray' },
                  gridProps: { xs: 12, my: 1 },
                  rows: 4,
            },
      ];


      React.useEffect(() => {
            if (rowSelected) {
                  reset({
                        firstName: rowSelected?.firstName,
                        lastName: rowSelected?.lastName,
                        // @ts-ignore
                        birthDate: new Date(rowSelected?.birthDate),
                        // @ts-ignore
                        grade: rowSelected?.grade?.id,
                        country: rowSelected?.country,
                        city: rowSelected?.city,
                        phone: rowSelected?.phone,
                        // @ts-ignore
                        gender: rowSelected?.gender?.id,
                        remarks: rowSelected?.remarks,
                  });
            } else resetForm()

      }, [rowSelected?.id]);

      async function _createStudent(data: any) {
            const is_created = await addStudent({ ...data, birthDate: moment(data?.birthDate).format("YYYY-MM-DD") });
            if (is_created) {
                  resetForm()
                  props.onClose()
            }
      }

      async function _updateStudent(data: any) {
            if (!data) return;
            const updated = await updateStudent({ ...data, id: rowSelected?.id, birthDate: moment(data?.birthDate).format("YYYY-MM-DD") });
            if (updated) {
                  resetForm()
                  props.onClose()
            }
      }

      const resetForm = () => {
            reset({
                  firstName: '',
                  lastName: '',
                  birthDate: '',
                  grade: '',
                  country: '',
                  city: '',
                  phone: '',
                  gender: '',
                  remarks: '',
            })
      }


      return (
            <CustomDialog {...props} onClose={() => {
                  resetForm()
                  props.onClose()

            }}>
                  <form onSubmit={handleSubmit(type === "create" ? _createStudent : _updateStudent)}>
                        <Grid container maxWidth="600px" spacing={1}>
                              <FieldsDistributor fields={fields} control={control} />
                        </Grid>

                        <Box display="flex" mx="auto" width="100%" mt={2} gap={2}>
                              <Button
                                    className="rounded-xl capitalize"
                                    variant="contained"
                                    type="submit"
                                    fullWidth
                              >
                                    {type === "create" ? t("Add") : t("Modify")}
                              </Button>
                              <Button
                                    className="rounded-xl bg-white capitalize"
                                    variant="outlined"
                                    type="button"
                                    onClick={resetForm}
                                    fullWidth
                              >
                                    {t("Cancel")}
                              </Button>

                        </Box>
                  </form>
            </CustomDialog>
      );
};

export default CreateUpdateDialog;