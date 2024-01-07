import {
  Box,
  Paper,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Checkbox,
} from "@mui/material";
import React, { useState } from "react";
import { StcPay } from "../../../assets/dashboard/icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const StcPayInstructions = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const stcPayInstructions = [
    t("dashboard.howReaviceMoney.downaladStc"),
    t("dashboard.howReaviceMoney.reagister"),
    t("dashboard.howReaviceMoney.active"),
  ];

  return (
    <ol className="olStc">
      {stcPayInstructions.map((instruction, index) => (
        <li key={index} className="liStc">
          <span className="num">{index + 1}</span>
          {instruction}
        </li>
      ))}
    </ol>
  );
};

const PaymentReceiption = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [showCashSide, setShowCashSide] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(/^5\d{8}$/, "Invalid Saudi phone number")
      .required("رقم الجوال مطلوب"),
  });
  const handleOverlayClick = () => {
    setShowCashSide(false);
  };
  const handleBoxClick = (e) => {
    e.stopPropagation();
  };
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <>
      <div>
        <Typography variant="h5" style={{ fontWeight: "700" }}>
          {t("dashboard.howReaviceMoney.timerevive")}
        </Typography>
        <Paper className="PaymentReceiptionPaper">
          <div className="d_flex">
            <p className="wayCash">
              {" "}
              {t("dashboard.howReaviceMoney.receivefunds")}
            </p>
            <button className="addBtn" onClick={() => setShowCashSide(true)}>
              {t("dashboard.howReaviceMoney.add")}
            </button>
          </div>
          <p className="span1">
            {" "}
            {t("dashboard.howReaviceMoney.receivingnotadd")}
          </p>
        </Paper>
      </div>

      {/* this section for side cash Box */}
      {showCashSide && (
        <div className="overlay" onClick={handleOverlayClick}>
          <Box className="sideBoxCash" onClick={(e) => handleBoxClick(e)}>
            <p className="wayCash">
              {" "}
              {t("dashboard.howReaviceMoney.addmethod")}
            </p>
            <p className="P_chooseWay">
              {t("dashboard.howReaviceMoney.Chooseyour")}
            </p>
            <FormControl sx={{ width: "100%", marginY: "20px" }}>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label1"
                value={selectedValue}
                onChange={handleRadioChange}
              >
                <div className="radio_label">
                  <FormControlLabel
                    value="stcPay"
                    control={
                      <Radio
                        sx={{
                          "&.Mui-checked": {
                            color: "black",
                          },
                        }}
                      />
                    }
                    sx={{
                      marginRight: lang === "ar" ? "-2rem" : "0px",
                      marginLeft: lang === "en" ? "-2rem" : "0px",
                    }}
                  />
                  <img src={StcPay} alt="STC Pay" className="imgStcPay" />
                </div>
              </RadioGroup>
              <Formik
                initialValues={{ phoneNumber: "" }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  // Handle form submission logic here
                  console.log(values);
                  setSubmitting(false);
                }}
              >
                {({ values, handleChange, handleBlur, touched, errors }) => (
                  <Form>
                    {selectedValue === "stcPay" && (
                      <Box>
                        {/* Your content for STC Pay */}
                        <StcPayInstructions />
                        {/* phone number */}
                        <div className="divPhoneNumberBox">
                          <Field
                            type="text"
                            name="phoneNumber"
                            placeholder="5XXXXXXXX"
                            className="phoneNumber"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phoneNumber}
                          />
                          <span className="spanPhoneNumber">966+</span>
                        </div>
                        {touched.phoneNumber && errors.phoneNumber ? (
                          <div style={{ color: "red" }}>
                            {errors.phoneNumber}
                          </div>
                        ) : null}
                        <p
                          className="font_bold"
                          style={{ marginBottom: "1rem" }}
                        >
                          {t("dashboard.howReaviceMoney.STCPayfunds")}
                        </p>
                        <p
                          className="font_gray"
                          style={{ fontSize: "15px", marginBottom: "1rem" }}
                        >
                          ابتداءً من تاريخ 28 مايو 2023 سوف يتم تطبيق رسوم %0.5
                          (غير شامل ضريبة القيمة المضافة) من مبلغ الحوالة على
                          الحوالات عند اختيار طريقة الدفع STC Pay وستطبق على
                          الحوالات القادمة بعد هذا التاريخ
                        </p>
                        <FormControlLabel
                          label={t("dashboard.howReaviceMoney.read")}
                          control={
                            <Checkbox
                              checked={values.checkboxChecked}
                              onChange={(e) =>
                                handleChange({
                                  target: {
                                    name: "checkboxChecked",
                                    value: e.target.checked,
                                  },
                                })
                              }
                              style={{
                                color: "black",
                                width: "40px",
                              }}
                            />
                          }
                          sx={{
                            marginRight:
                              lang === "ar"
                                ? "-2rem !important"
                                : "0px !important",
                            marginLeft:
                              lang === "en"
                                ? "-2rem !important"
                                : "0px !important",
                          }}
                        />
                        <button
                          type="submit"
                          className={
                            touched.phoneNumber &&
                            !errors.phoneNumber &&
                            values.checkboxChecked
                              ? "activePhoneNumber"
                              : "activePhoneNumber disabled"
                          }
                        >
                          {t("dashboard.howReaviceMoney.Activatethemobile")}
                        </button>
                      </Box>
                    )}
                  </Form>
                )}
              </Formik>
              <Divider sx={{ marginY: "2rem" }} />
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label2"
                value={selectedValue}
                onChange={handleRadioChange}
              >
                <div className="radio_label">
                  <FormControlLabel
                    value="bankTransfer"
                    control={
                      <Radio
                        sx={{
                          "&.Mui-checked": {
                            color: "black",
                          },
                        }}
                      />
                    }
                    sx={{
                      marginRight:
                        lang === "ar" ? "-2rem !important" : "0px !important",
                      marginLeft:
                        lang === "en" ? "-2rem !important" : "0px !important",
                    }}
                  />
                  <span className="span1">
                    {t("dashboard.howReaviceMoney.Banktransfer")}
                  </span>
                </div>
              </RadioGroup>
              {selectedValue === "bankTransfer" && (
                <Box>
                  {/* Your content for Bank Transfer */}
                  <Formik
                    initialValues={{
                      accountName: "",
                      ibanNumber: "",
                      bank: "",
                    }}
                    validationSchema={Yup.object().shape({
                      accountName: Yup.string().required(
                        "اسم صاحب الحساب مطلوب"
                      ),
                      ibanNumber: Yup.string().required("رقم الآيبان مطلوب"),
                      bank: Yup.string().required("اسم البنك مطلوب"),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                      // Handle form submission logic here
                      console.log(values);
                      setSubmitting(false);
                    }}
                  >
                    {({
                      values,
                      handleChange,
                      handleBlur,
                      touched,
                      errors,
                      handleSubmit,
                    }) => (
                      <Form onSubmit={handleSubmit}>
                        <div className="d_flex_spaceBetween bankSelect">
                          <span className="bankTitle">
                            {" "}
                            {t("dashboard.howReaviceMoney.Bankname")}
                          </span>{" "}
                          <span>*</span>
                        </div>
                        <Field as="select" name="bank" className="BankSelect">
                          <option disabled selected value="">
                            {t("dashboard.howReaviceMoney.chooseBank")}
                          </option>
                          <option>1</option>
                          <option>2</option>
                        </Field>
                        {touched.bank && errors.bank ? (
                          <div style={{ color: "red" }}>{errors.bank}</div>
                        ) : null}

                        <div className="d_flex_spaceBetween ">
                          <span className="bankTitle">
                            {" "}
                            {t(
                              "dashboard.howReaviceMoney.AccountHoldersName"
                            )}{" "}
                          </span>
                          <span>*</span>
                        </div>
                        <Field
                          type="text"
                          name="accountName"
                          placeholder={t(
                            "dashboard.howReaviceMoney.writeAccountHoldersName"
                          )}
                          className="inputFiled"
                        />
                        {touched.accountName && errors.accountName ? (
                          <div style={{ color: "red" }}>
                            {errors.accountName}
                          </div>
                        ) : null}

                        <div className="d_flex_spaceBetween ">
                          <span className="bankTitle">
                            {t("dashboard.howReaviceMoney.IBANnumber")}
                          </span>
                          <span>*</span>
                        </div>
                        <div style={{ position: "relative" }}>
                          <Field
                            type="text"
                            name="ibanNumber"
                            placeholder={t(
                              "dashboard.howReaviceMoney.writeIBANnumber"
                            )}
                            className="inputFiled"
                          />
                          <span
                            className="font_bold"
                            style={{
                              position: "absolute",
                              left: lang === "ar" ? "15px" : "auto",
                              right: lang === "en" ? "15px" : "auto",

                              top: "10px",
                            }}
                          >
                            SA
                          </span>
                        </div>
                        {touched.ibanNumber && errors.ibanNumber ? (
                          <div style={{ color: "red" }}>
                            {errors.ibanNumber}
                          </div>
                        ) : null}
                        <button type="submit" className="bankSubmit">
                          {t("save")}
                        </button>
                      </Form>
                    )}
                  </Formik>
                </Box>
              )}
            </FormControl>
          </Box>
        </div>
      )}
    </>
  );
};

export default PaymentReceiption;
