import {
  Paper,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Divider,
  Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field } from "formik";
const UnitSettings = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <Paper
      className="paper_style"
      sx={{ padding: { xs: "5px !important", md: "20px !important" } }}
    >
      <Typography variant="h6" className="font_bold">
        {t("dashboard.unitsetting.Rentalterms")}
      </Typography>
      <Typography className="color_gray" sx={{ marginY: "1rem" }}>
        {" "}
        {t("dashboard.unitsetting.thereis")}
      </Typography>
      <Typography className="font_bold" sx={{ marginY: "1rem" }}>
        {t("dashboard.unitsetting.require")}
      </Typography>
      <Formik
        initialValues={{
          insuranceRequired: "no",
          insurancePrice: "",
          otherTerms: "",
        }}
        onSubmit={(values) => {
          console.log("Form values:", values);
          // You can perform additional actions here
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <FormControl sx={{ width: "100%", marginY: "20px" }}>
              <div>
                <Field type="radio" name="insuranceRequired" value="no" />
                <label className="mr-3">
                  {t("dashboard.unitsetting.nodontask")}
                </label>
              </div>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <div>
                  <Field type="radio" name="insuranceRequired" value="yes" />
                  <label className="mr-3">
                    {t("dashboard.unitsetting.YesAsk")}
                  </label>
                </div>
                {values.insuranceRequired === "yes" && (
                  <>
                    <span className="mr-5 font_bold">
                      {t("dashboard.unitsetting.ref")}
                    </span>
                    <div className=" position-relative searchBoxCalender w-[200px] mr-5 ">
                      <Field
                        type="text"
                        name="insurancePrice"
                        className="w-[100%]"
                      />
                      <span>{t("currency")}</span>
                    </div>
                  </>
                )}
              </Box>
            </FormControl>
            <Typography className="color_gray" sx={{ marginY: "1rem" }}>
              {t("dashboard.unitsetting.refundable")}
            </Typography>
            <Typography className="font_bold" sx={{ marginY: "1rem" }}>
              {t("dashboard.unitsetting.havecondition")}
            </Typography>
            <Field
              as="textarea"
              name="otherTerms"
              // className="w-[50%] "
              style={{
                border: "2px solid var(--green-color)",
                borderRadius: "10px",
                outline: "none",
                height: "150px",
                width: "50%",
              }}
            />

            <Divider sx={{ marginY: "2rem" }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <button className="save_btn">
                {t("dashboard.outgoing_requests.submit_btn")}
              </button>
              <button className="cancel_btn">
                {t("dashboard.outgoing_requests.cancel_btn")}
              </button>
            </Box>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default UnitSettings;
