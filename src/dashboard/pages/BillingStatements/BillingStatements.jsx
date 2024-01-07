import { Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import BillingTable from "./components/BillingTable";

import { useTranslation } from "react-i18next";
const BillingStatements = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="p-10">
      <Typography variant="h5" style={{ fontWeight: "700" }}>
        {t("dashboard.Invoices.Billingstatement")}
      </Typography>
      <div className="searchBoxCalender m-auto w-[250px]">
        <input
          placeholder={t("search")}
          style={{ width: "100%", outline: "none" }}
        />
        <CloseIcon sx={{ cursor: "pointer", color: "red" }} />
      </div>
      <BillingTable />
    </div>
  );
};

export default BillingStatements;
