import React from "react";
import "../../../../assets/dashboard/css/prices.css";
import { Box, Divider, Paper, Typography } from "@mui/material";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import ElevatorIcon from "@mui/icons-material/Elevator";
import PersonIcon from "@mui/icons-material/Person";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

const ContractDetails = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const handleCancelBills = () => {
    Swal.fire({
      title: "تم  إلغاء العقد",

      icon: "success",
    });
  };
  const activeStatus = 0;
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Typography variant="h6" gutterBottom style={{ fontWeight: "700" }}>
          {t("dashboard.contarctDetails.Residentialcontract")} #576788655
        </Typography>
        <div style={{ display: "flex" }}>
          <Box
            sx={{
              backgroundColor: "var(--green-color)",
              color: "white",
              cursor: "pointer",
              padding: "5px 10px",
              border: "1px solid transparent",
              borderRadius: "5px",
              marginX: "0.5rem",
            }}
          >
            {t("dashboard.contarctDetails.downalconpy")}
          </Box>
          <Box
            sx={{
              backgroundColor: "red",
              color: "white",
              cursor: "pointer",
              padding: "5px 10px",
              border: "1px solid transparent",
              borderRadius: "5px",
            }}
            onClick={handleCancelBills}
          >
            {t("cancel")}
          </Box>
        </div>
      </Box>
      <Box className="d_flex_space_between">
        <Paper
          className="paper_style"
          sx={{ width: { xs: "90%", lg: "49%" }, marginX: "auto" }}
        >
          <Typography variant="h6" className="font_bold">
            {t("dashboard.contarctDetails.Contractinformation")}
          </Typography>
          <p className="font_gray">
            {t("dashboard.contarctDetails.generalinfo")}
          </p>
          <Divider sx={{ marginY: "1rem" }} />
          <div className="marginBetweenBoxes">
            <div style={{ display: "flex", gap: "60px" }}>
              <div style={{ marginBottom: "1rem" }}>
                <p className="font_gray  ">
                  {t("dashboard.contarctDetails.TypeofContract")}
                </p>
                <p className="font_bold">سكني</p>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <p className="font_gray ">
                  {" "}
                  {t("dashboard.incoming_orders.card3.label1")}
                </p>
                {activeStatus === 0 ? (
                  // <ToggleOffIcon
                  //   sx={{ color: "var(--main-color)", fontSize: "2rem" }}
                  // />
                  <div
                    style={{
                      backgroundColor: "#d1fcd1",
                      display: "flex",
                      padding: "2px 1rem",
                      borderRadius: "20px",
                      alignItems: "center",
                      marginTop: "0px",
                    }}
                  >
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        backgroundColor: "#10b610",
                        borderRadius: "50%",
                        marginRight: lang === "ar" ? "-7px" : "8px",
                        marginLeft: lang === "ar" ? "8px" : "-7px",
                        marginTop: "0px",
                      }}
                    ></div>
                    {lang === "ar" ? "نشط" : "active"}
                  </div>
                ) : (
                  <div
                    style={{
                      backgroundColor: "rgb(192, 192, 192)",
                      display: "flex",
                      padding: "2px 1rem",
                      borderRadius: "20px",
                      alignItems: "center",
                      marginTop: "0px",
                    }}
                  >
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        backgroundColor: "gray",
                        borderRadius: "50%",
                        marginRight: "-7px",
                        marginLeft: "8px",
                        marginTop: "0px",
                      }}
                    ></div>
                    {lang === "ar" ? "غير نشط" : "Inactive"}
                  </div>
                )}
              </div>
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <p className="font_gray  ">
                {" "}
                {t("dashboard.contarcts.startdate")} /{" "}
                {t("dashboard.contarcts.enddate")}
              </p>
              <p className="font_bold">01-01-2023 - 31-12-2023</p>
            </div>
            <div style={{ display: "flex", gap: "60px" }}>
              <div style={{ marginBottom: "1rem" }}>
                <p className="font_gray  ">
                  {" "}
                  {t("dashboard.contarctDetails.Rentalperiod")}
                </p>
                <p className="font_bold">1 سنة</p>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <p className="font_gray ">
                  {t("dashboard.contarctDetails.Theremainingperiod")}
                </p>
                <p className="font_bold">2 شهور - 14 يوم </p>
              </div>
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <p className="font_gray  ">
                {t("dashboard.contarctDetails.Totalcontractvalue")}
              </p>
              <p className="font_bold">37000 {t("Rial")}</p>
            </div>
          </div>
        </Paper>

        <Paper
          className="paper_style"
          sx={{ width: { xs: "90%", lg: "49%" }, marginX: "auto" }}
        >
          <Typography variant="h6" className="font_bold">
            {" "}
            {t("dashboard.contarctDetails.Officedetails")}
          </Typography>
          <p className="font_gray">
            {t("dashboard.contarctDetails.infoOddices")}
          </p>
          <Divider sx={{ marginY: "1rem" }} />
          <Box className="office_details">
            <p className="font_bold"> 7408 - مكتب اليرموك</p>
            <div
              style={{
                display: "flex",
                gap: "60px",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              <div style={{ marginBottom: "1rem" }}>
                <p className="font_gray  ">
                  {t("home.FilterModal.office_type")}
                </p>
                <p className="font_bold">مشترك</p>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <p className="font_gray ">
                  {t("dashboard.contarctDetails.Officeconstructiondate")}
                </p>
                <p className="font_bold">01-05-2020</p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "60px",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              <div style={{ backgroundColor: "white", padding: "5px" }}>
                <ElevatorIcon />4 مصاعد
              </div>
              <div style={{ backgroundColor: "white", padding: "5px" }}>
                <LocalParkingIcon />
                كراج مستقل
              </div>
            </div>
          </Box>
        </Paper>
      </Box>
      <Paper
        className="paper_style"
        sx={{ width: { xs: "90%", lg: "49%" }, marginX: "auto" }}
      >
        <Typography variant="h6" className="font_bold">
          {t("dashboard.contarctDetails.Partiescontract")}
        </Typography>
        <p className="font_gray"> {t("dashboard.contarctDetails.info")}</p>
        <Divider sx={{ marginY: "1rem" }} />
        <Box className="d_flex_space_between" sx={{ marginY: "1rem" }}>
          <Box sx={{ width: { xs: "100%", md: "49%" }, marginY: "1rem" }}>
            <Box>
              <PersonIcon />
              <span> {t("dashboard.reservation.Lessorinformation")}:</span>
              <span>وائل الديري</span>
            </Box>
            <Box className="office_details" sx={{ marginTop: "1rem" }}>
              <p className="font-bold">يحيى يحيى</p>
              <div>
                <span className="font_gray">هوية وطنية</span>
                <span
                  className="font_bold"
                  style={{ color: "var(--main-color)", marginRight: "10px" }}
                >
                  #0000000000
                </span>
              </div>
            </Box>
          </Box>
          <Box sx={{ width: { xs: "100%", md: "49%" }, marginY: "1rem" }}>
            <Box>
              <PersonIcon />
              <span>{t("dashboard.reservation.Tenantinformation")}:</span>
              <span>وائل الديري</span>
            </Box>
            <Box className="office_details" sx={{ marginTop: "1rem" }}>
              <p className="font-bold">وائل وائل</p>
              <div>
                <span className="font_gray">هوية وطنية</span>
                <span
                  className="font_bold"
                  style={{ color: "var(--main-color)", marginRight: "10px" }}
                >
                  #0000000000
                </span>
              </div>
            </Box>
          </Box>
        </Box>
      </Paper>
    </div>
  );
};

export default ContractDetails;
