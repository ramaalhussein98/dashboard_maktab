import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Box, Divider } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTranslation } from "react-i18next";

const FinanceSelect = ({ selectContract, setSelectedContract, contracts }) => {
  const { t, i18n } = useTranslation();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  const handleContractSelection = (contractId) => {
    const selectedContractIndex = contracts.findIndex(
      (contract) => contract.id === contractId
    );
    if (selectedContractIndex !== -1) {
      setSelectedContract(contracts[selectedContractIndex].number);
    }
    console.log(contractId);
  };
  const contractsPerPage = contracts.slice(
    (page - 1) * rowsPerPage,
    (page - 1) * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Paper className="paperContractSelect">
        <Box sx={{ paddingX: "1rem" }}>
          <Typography variant="h6" gutterBottom>
            {t("dashboard.finnace.Contractinvoices")}
          </Typography>
          <p className="color_gray"> {t("dashboard.finnace.AllContarcts")}</p>

          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Box>
              {`${page} ${t("from")} ${Math.ceil(
                contracts.length / rowsPerPage
              )}`}
            </Box>
            <Box sx={{ display: "flex" }}>
              <ChevronRightIcon
                className="leftIcon"
                onClick={() => {
                  if (page > 1) handleChangePage(page - 1);
                }}
              />
              <div>{page}</div>
              <ChevronLeftIcon
                className="rightIcon"
                onClick={() => {
                  if (page < Math.ceil(contracts.length / rowsPerPage))
                    handleChangePage(page + 1);
                }}
              />
            </Box>
          </Box>
          <Divider sx={{ marginY: "1rem" }} />
        </Box>

        {contractsPerPage.map((contract) => (
          <Box
            key={contract.id}
            className={`contactNumberBox ${
              selectContract === contract.number ? "selectContarct" : ""
            }`}
            onClick={() => handleContractSelection(contract.id)}
          >
            <p>{t("dashboard.finnace.contractsNumber")}</p>
            <p style={{ fontWeight: "700" }}>{contract.number}</p>
          </Box>
        ))}
      </Paper>
    </>
  );
};

export default FinanceSelect;
