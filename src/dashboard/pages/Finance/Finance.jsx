import React, { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import FinanceTable from "./components/FinanceTable";
import FinanceSelect from "./components/FinanceSelect";
import { useTranslation } from "react-i18next";
const contracts = [
  { id: 1, number: "#0203040404" },
  { id: 2, number: "#495968809" },
  { id: 3, number: "#4959688044" },
  { id: 4, number: "#495968804" },
];
const Finance = () => {
  const { t, i18n } = useTranslation();
  const [selectContract, setSelectedContract] = useState(contracts[0].number);
  return (
    <Box>
      <Typography variant="h6" gutterBottom style={{ fontWeight: "700" }}>
        {t("dashboard.finnace.dispaly")} 1{" "}
        {t("dashboard.finnace.availablecontracts")}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ width: "25%" }}>
          <FinanceSelect
            selectContract={selectContract}
            setSelectedContract={setSelectedContract}
            contracts={contracts}
          />
        </Box>
        <Box sx={{ width: "75%" }}>
          <FinanceTable selectContract={selectContract} />
        </Box>
      </Box>
    </Box>
  );
};

export default Finance;
