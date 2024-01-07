import React, { useState } from "react";
import { Box, Paper } from "@mui/material";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import CreditCard from "../mainComponents/CreditCard";

const InstantPayment = () => {
  const { t, i18n } = useTranslation();
  const invoiceSummary = [
    { label: t("dashboard.finnace.contractsNumber"), value: "#222222" },
    { label: t("dashboard.sub_page.label1"), value: "2333444" },
    { label: t("dashboard.InstantPayment.Postpaid"), value: "نجيب نجيب" },
    { label: t("dashboard.InstantPayment.Client"), value: "نجيب نجيب" },
    { label: t("dashboard.Invoices.ReleaseDate"), value: " 03-01-2023" },
    { label: t("dashboard.InstantPayment.totalamount"), value: " 37,000 ريال" },
    {
      label: t("dashboard.InstantPayment.Remainingamount"),
      value: " 37,000 ريال",
    },
    { label: t("dashboard.InstantPayment.amountpaid"), value: " 0,0 ريال" },
  ];

  const [isEditable, setIsEditable] = useState(false);
  const [editedValue, setEditedValue] = useState("27,0000000");

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleConfirmClick = () => {
    // You can handle the logic to confirm the new value here.
    setIsEditable(false);
    Swal.fire({
      title: "تم   تعديل السعر",

      icon: "success",
    });
  };
  return (
    <Box>
      <span className="title_price">
        {" "}
        {t("dashboard.InstantPayment.Instantpayment")}{" "}
      </span>
      <Paper
        sx={{
          padding: "1rem",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          marginY: "1rem",
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "48%" } }}>
          <span style={{ fontWeight: "600" }}>
            {" "}
            {t("dashboard.InstantPayment.Invoicesummary")}{" "}
          </span>
          <Paper sx={{ width: "100%", padding: "1rem", marginY: "1rem" }}>
            {invoiceSummary.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginY: "10px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>{item.label}</span>
                <span>{item.value}</span>
              </Box>
            ))}
            <Box sx={{ backgroundColor: "#89ecce" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginY: "10px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>
                  {" "}
                  {t("dashboard.InstantPayment.deservedamount")}
                </span>
                <div>
                  <span style={{ fontWeight: "bold" }}>3400 {t("Rial")}</span>
                </div>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginY: "10px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>
                  {" "}
                  {t("dashboard.InstantPayment.duedate")}
                </span>
                <span>10-10-2023</span>
              </Box>
            </Box>
            {/* Editable box section */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginY: "10px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>
                {t("dashboard.InstantPayment.amountpaid")}
              </span>
              {isEditable ? (
                <Box
                  sx={{
                    backgroundColor: "#eee",
                    boxShadow: "1",
                    display: "flex",
                    width: "50%",
                    justifyContent: "left",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="text"
                    value={editedValue}
                    onChange={(e) => setEditedValue(e.target.value)}
                    style={{ width: "100%", textAlign: "left" }}
                  />
                  <Box
                    sx={{
                      backgroundColor: "#eee",
                      borderRight: "1px solid #e1d4d4",
                      padding: "10px",
                      marginRight: "5px",
                      color: "gray",
                      fontWeight: "bold",
                    }}
                  >
                    {t("Rial")}
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    backgroundColor: "#eee",
                    boxShadow: "1",
                    display: "flex",
                    width: "50%",
                    justifyContent: "left",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ color: "gray", fontWeight: "bold" }}>
                    {editedValue}
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "#eee",
                      borderRight: "1px solid #e1d4d4",
                      padding: "10px",
                      marginRight: "5px",
                      color: "gray",
                      fontWeight: "bold",
                    }}
                  >
                    {t("Rial")}
                  </Box>
                </Box>
              )}
            </Box>
            {/* Button section */}
            {isEditable ? (
              <button
                style={{
                  backgroundColor: "var(--green-color)",
                  color: "white",
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                }}
                onClick={handleConfirmClick}
              >
                {t("confirm")}
              </button>
            ) : (
              <button
                style={{
                  backgroundColor: "var(--green-color)",
                  color: "white",
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                }}
                onClick={handleEditClick}
              >
                {t("dashboard.InstantPayment.editvalue")}
              </button>
            )}
          </Paper>
        </Box>
        <Box sx={{ width: { xs: "100%", md: "48%" } }}>
          <span style={{ fontWeight: "600" }}>
            {" "}
            {t("dashboard.reservation.paymentmethod")}
          </span>

          <CreditCard />
        </Box>
      </Paper>
    </Box>
  );
};

export default InstantPayment;
