import { Box, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../../assets/dashboard/css/Bills.css";
import RichTextEditor from "./components/RichTextEditor";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import QuillEditor from "./components/TinyEditor";
import TinyEditor from "./components/TinyEditor";

const CreateContract = () => {
  const { t } = useTranslation();
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedContractType, setSelectedContractType] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  const initialValues = {
    place: "",
    city: "",
    street: "",
    buildingnum: "",
    addionatlnum: "",
    mailcode: "",
    contractNumber: "",
    contractStatus: "",
    contractType: "",
    renderIdNumber: "",
    renderName: "",
    tenantIdNumber: "",
    tenantName: "",
    workDocumentNumber: "",
    contractNumberType: "",
  };
  const validationSchema = Yup.object().shape({
    place: Yup.string().required("المنطقة مطلوبة"),
    city: Yup.string().required("المدينة مطلوبة"),
    street: Yup.string().required(" الشارع مطلوب"),
    buildingnum: Yup.string().required(" رقم المبنى مطلوب"),
    addionatlnum: Yup.string().required("رقم إضافي "),
    mailcode: Yup.string().required(" الرمز البريدي مطلوب "),
    contractNumber: Yup.string().required("  رقم العقد مطلوب"),
    contractStatus: Yup.string().required("  حالة العقد مطلوبة"),
    contractType: Yup.string().required(" نوع العقد مطلوب"),
    renderIdNumber: Yup.string().required("  رقم هوية المأجر"),
    renderName: Yup.string().required("  اسم المؤجر مطلوب"),
    tenantIdNumber: Yup.string().required("رقم هوية المستأجر"),
    tenantName: Yup.string().required("اسم المستأجر مطلوب"),
    workDocumentNumber: Yup.string().required("رقم وثيقة الملكية"),
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
  const handleSave = () => {
    if (file) {
      // Perform the necessary file upload operation here
      console.log("Uploading file: ", file);
    }
    Swal.fire({
      title: "تم حفظ معلومات العقد",

      icon: "success",
    });
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom style={{ fontWeight: "700" }}>
        {t("dashboard.contract.Createacontract")}
      </Typography>
      <Paper sx={{ padding: "1rem" }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <div className="ModalInputsBox2" style={{ gap: "15px" }}>
            <div className="div_33">
              <span> المنطقة:</span>
              <Field as="select" name="place" className="input1">
                <option value="">{t("dashboard.contract.Pleasechoose")}</option>
                <option value="cash">Cash</option>
                <option value="credit_card">Credit Card</option>
              </Field>
              <ErrorMessage name="place" component="div" className="error" />
            </div>
            <div className="div_33">
              <span> المدينة:</span>
              <Field type="text" name="city" className="input1" />
              <ErrorMessage name="city" component="div" className="error" />
            </div>
            <div className="div_33">
              <span> اسم الشارع:</span>
              <Field type="text" name="street" className="input1" />
              <ErrorMessage name="street" component="div" className="error" />
            </div>
            <div className="div_33">
              <span> رقم المبنى :</span>
              <Field type="text" name="buildingnum" className="input1" />
              <ErrorMessage
                name="buildingnum"
                component="div"
                className="error"
              />
            </div>
            <div className="div_33">
              <span> رقم إضافي :</span>
              <Field type="text" name="addionatlnum" className="input1" />
              <ErrorMessage
                name="addionatlnum"
                component="div"
                className="error"
              />
            </div>
            <div className="div_33">
              <span> الرمز البريدي :</span>
              <Field type="text" name="mailcode" className="input1" />
              <ErrorMessage name="mailcode" component="div" className="error" />
            </div>
            <div className="div_33">
              <span> {t("dashboard.finnace.contractsNumber")}:</span>
              <Field type="text" name="contractNumber" className="input1" />
              <ErrorMessage
                name="contractNumber"
                component="div"
                className="error"
              />
            </div>
            <div className="div_33">
              <span> {t("dashboard.contract.contractStatus")}:</span>
              <Field as="select" name="contractStatus" className="input1">
                <option value="">{t("dashboard.contract.Pleasechoose")}</option>
                <option value="cash">Cash</option>
                <option value="credit_card">Credit Card</option>
              </Field>

              <ErrorMessage
                name="contractStatus"
                component="div"
                className="error"
              />
            </div>
            <div className="div_33">
              <span> {t("dashboard.contarctDetails.TypeofContract")}:</span>
              <Field as="select" name="contractType" className="select1">
                <option value="">
                  {" "}
                  {t("dashboard.contract.Pleasechoose")}
                </option>
                <option value="cash">Cash</option>
                <option value="credit_card">Credit Card</option>
              </Field>

              <ErrorMessage
                name="contractType"
                component="div"
                className="error"
              />
            </div>
            <div className="div_33">
              <span>{t("dashboard.contract.LessorIDnumber")}:</span>
              <Field type="text" name="renderIdNumber" className="input1" />
              <ErrorMessage
                name="renderIdNumber"
                component="div"
                className="error"
              />
            </div>
            <div className="div_33">
              <span>{t("dashboard.contract.Lessorname")}:</span>
              <Field type="text" name="renderName" className="input1" />
              <ErrorMessage
                name="renderName"
                component="div"
                className="error"
              />
            </div>
            <div className="div_33">
              <span>{t("dashboard.contract.TenantIDnumber")}:</span>
              <Field type="text" name="tenantIdNumber" className="input1" />
              <ErrorMessage
                name="tenantIdNumber"
                component="div"
                className="error"
              />
            </div>
            <div className="div_33">
              <span>{t("dashboard.contract.Tenantname")}</span>
              <Field type="text" name="tenantName" className="input1" />
              <ErrorMessage
                name="tenantName"
                component="div"
                className="error"
              />
            </div>
            <div className="div_33">
              <span> {t("dashboard.contract.Ownershipdocumentnumber")}:</span>
              <Field type="text" name="workDocumentNumber" className="input1" />
              <ErrorMessage
                name="workDocumentNumber"
                component="div"
                className="error"
              />
            </div>
            <div className="div_33">
              <span>{t("dashboard.contract.Chooseamodel")}:</span>
              <Field
                as="select"
                name="Type"
                className="select1"
                onChange={(e) => {
                  setSelectedContractType(e.target.value);
                }}
              >
                <option value="">
                  {" "}
                  {t("dashboard.contract.Pleasechoose")}
                </option>
                <option value="hour">ساعات</option>
                <option value="daily"> يومي</option>
                <option value="weekely"> أسبوعي</option>
                <option value="monthly"> شهري</option>
                <option value="year"> سنوي</option>
              </Field>

              <ErrorMessage name="Type" component="div" className="error" />
            </div>
          </div>
        </Formik>
        <TinyEditor />
        {/* <RichTextEditor contractType={selectedContractType} /> */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box className="uploadBtn" sx={{ marginX: "10px" }}>
            <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
              {t("dashboard.contract.Attachthebasiccontract")}
            </label>
          </Box>

          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          {loading ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CircularProgress size={20} style={{ marginRight: "10px" }} />
              <Typography variant="body1">Uploading file...</Typography>
            </Box>
          ) : null}

          {file && !loading && (
            <Typography variant="body1" style={{ marginTop: "10px" }}>
              {file.name}
            </Typography>
          )}
          <DeleteIcon onClick={() => setFile("")} />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginY: "2rem",
          }}
        >
          <button className="cancel_btn">
            {t("dashboard.outgoing_requests.cancel_btn")}
          </button>
          <button className="save_btn" onClick={handleSave}>
            {t("dashboard.outgoing_requests.submit_btn")}
          </button>
        </Box>
      </Paper>
    </div>
  );
};

export default CreateContract;
