import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Divider,
  TextField,
  Select,
  MenuItem,
  TextareaAutosize,
} from "@mui/material";
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const ReserveMoneyModal = ({ open, onClose, selectedRowId }) => {
  const { t, i18n } = useTranslation();
  const handleClose = () => {
    onClose();
  };
  const initialValues = {
    website: "",
    cash: "",
    date: "",
    requestTo: "",
    notes: "",
  };
  const validationSchema = Yup.object().shape({
    website: Yup.string().required("مواقع الدفع مطلوبة"),
    cash: Yup.string().required("طريقة الدفع مطلوبة"),
    date: Yup.string().required("التاريخ مطلوب"),
    requestTo: Yup.string().required("طلب إلى مطلوب"),
  });

  const onSubmit = (values) => {
    // Handle form submission here
    console.log(values);
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: 350, md: 800 },
          bgcolor: "background.paper",
          border: "2px solid transparent",
          borderRadius: "10px",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="modal_form">
              <Box className="d_flex_spaceBetween">
                <Box>
                  <b>{t("dashboard.finnace.requestrecipt")}</b>
                  <p className="color_gray">
                    {t("dashboard.modalmoney.sendrecipt")}
                  </p>
                </Box>
                <Box>
                  <p className="color_gray" style={{ marginBottom: "0px" }}>
                    {t("dashboard.modalmoney.totalunpaid")}
                  </p>
                  <b>SAR 37000</b>
                </Box>
              </Box>
              <Divider />
              <Box className="ModalInputsBox">
                <form className="modal_form">
                  <div className="div_50">
                    <span> {t("dashboard.modalmoney.Paymentamount")}*</span>
                    <Field type="text" name="website" className="input1" />
                    <ErrorMessage
                      name="website"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="div_50">
                    <span> {t("dashboard.reservation.paymentmethod")}*</span>
                    <Field as="select" name="cash" className="input1">
                      <option value="">
                        {" "}
                        {t("dashboard.modalmoney.pleaseselect")}
                      </option>
                      <option value="cash">Cash</option>
                      <option value="credit_card">Credit Card</option>
                    </Field>
                    <ErrorMessage
                      name="cash"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="div_50">
                    <span>{t("dashboard.Accountstatements.date")}*</span>
                    <Field type="date" name="date" className="input1" />
                    <ErrorMessage
                      name="date"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="div_50">
                    <span>{t("dashboard.modalmoney.requsetto")} *</span>
                    <Field as="select" name="requestTo" className="input1">
                      <option value="">
                        {" "}
                        {t("dashboard.modalmoney.pleaseselect")}
                      </option>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                    </Field>
                    <ErrorMessage
                      name="requestTo"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="div_100">
                    <span>{t("dashboard.modalmoney.notes")}</span>
                    <textarea rows={4} className="textarea1" />
                  </div>
                </form>
              </Box>
              <Box className="d_flex_spaceBetween">
                <button
                  className="cancelBtn"
                  onClick={handleClose}
                  sx={{ mt: 2 }}
                >
                  {t("cancel")}
                </button>
                <button
                  sx={{ mt: 2 }}
                  className="confirmBtn"
                  disabled={isSubmitting}
                >
                  {t("confirm")}
                </button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default ReserveMoneyModal;
