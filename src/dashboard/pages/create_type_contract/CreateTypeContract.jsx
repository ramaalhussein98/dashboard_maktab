import { Typography } from "@mui/material";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../../../assets/dashboard/css/Bills.css";
import TinyEditor from "../../../website/pages/CreateContract/components/TinyEditor";
import * as Yup from "yup";
const CreateTypeContract = () => {
  const initialValues = {
    type_name: "",
    description: "",
    contract_types: "",
  };
  const validationSchema = Yup.object().shape({
    type_name: Yup.string().required(" اسم النموذج مطلوب"),
    description: Yup.string().required("  الوصف مطلوب"),
  });
  const onSubmit = (
    values,
    { setSubmitting, setErrors, resetForm, isValid }
  ) => {
    if (isValid) {
      console.log(values);
    } else {
      console.log("Form has errors");
    }
    setSubmitting(false);
  };
  return (
    <div>
      <Typography variant="h6" gutterBottom style={{ fontWeight: "700" }}>
        أضافة نموذج
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <div className="ModalInputsBox2" style={{ gap: "15px" }}>
          <div className="div_33">
            <span> اسم النموذج:</span>
            <Field type="text" name="type_name" className="input1" />
            <ErrorMessage name="type_name" component="div" className="error" />
          </div>
          <div className="div_33">
            <span> الوصف:</span>
            <Field type="text" name="description" className="input1" />
            <ErrorMessage
              name="description"
              component="div"
              className="error"
            />
          </div>
          <div className="div_33">
            <span> نماذج عقود جاهزة:</span>
            <Field as="select" name="contract_types" className="input1">
              <option value=""></option>
              <option value="cash">Cash</option>
              <option value="credit_card">Credit Card</option>
            </Field>
            <ErrorMessage
              name="contract_types"
              component="div"
              className="error"
            />
          </div>
        </div>
      </Formik>
      <TinyEditor />
      <button className="btnAddContarct">إضافة</button>
    </div>
  );
};

export default CreateTypeContract;
