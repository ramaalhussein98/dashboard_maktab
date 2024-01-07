import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TablePagination from "@mui/material/TablePagination";
import { Box } from "@mui/material";
import "../../../../assets/dashboard/css/Bills.css";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ReserveMoneyModal from "../../Bills/components/ReserveMoneyModal";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ActiveOrNot = ({ activeStatus }) => {
  const { t } = useTranslation();
  if (activeStatus === 0) {
    return (
      <div
        style={{
          backgroundColor: "#d1fcd1",
          display: "flex",
          padding: "2px 1rem",
          borderRadius: "20px",
          alignItems: "center",
          marginTop: "0px",
          width: "5rem",
        }}
      >
        <div
          style={{
            width: "10px",
            height: "10px",
            backgroundColor: "#10b610",
            borderRadius: "50%",
            marginRight: "-7px",
            marginLeft: "8px",
            marginTop: "0px",
          }}
        ></div>
        نشط
      </div>
    );
  } else if (activeStatus === 1) {
    return (
      <div
        style={{
          width: "6rem",
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
        غير نشط
      </div>
    );
  } else if (activeStatus === 2) {
    // if there  is no contract i want status
    return (
      <div
        style={{
          width: "6rem",
          backgroundColor: "var(--green-color)",
          color: "white",
          cursor: "pointer",
          display: "flex",
          padding: "2px 1rem",
          borderRadius: "20px",
          alignItems: "center",
          marginTop: "0px",
        }}
      >
        {t("dashboard.contract.Createacontract")}
      </div>
    );
  } else {
    return null; // or handle the default case as required
  }
};

const ContractTable = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [isModalMoneyOpen, setIsModalMoneyOpen] = useState(false);
  const [contractDetails, setContractDetails] = useState(false);
  const handleOpenMoneyModal = (rowId) => {
    setSelectedRowId(rowId);
    setIsModalMoneyOpen(true);
  };
  const handleToggleShowContactBox = () => {
    setContractDetails(!contractDetails);
  };
  const rows = [
    // Add your data rows here
    {
      id: 1,
      column1: "#22222222",
      column2: " وائل الديري",
      column3: "31-07-2023",
      column4: "31-07-2024",
      column5: "عبد المجيد",
      column6: <ActiveOrNot activeStatus={2} />,
      column7: <MoreVertIcon />,
    },

    // Add more data rows as needed
  ];

  const columns = [
    { id: "column1", label: "سكني" },
    { id: "column2", label: " اسم الموقع " },
    { id: "column3", label: "  تاريخ البدء " },
    { id: "column4", label: "  تاريخ الانتهاء " },
    { id: "column5", label: "   اسم المستلم " },
    {
      id: "column6",
      label: t("dashboard.incoming_orders.dashboard.card3.label1"),
    },
    { id: "column7", label: t("dashboard.contarcts.options") },
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleClose = () => {
    setIsModalMoneyOpen(false);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  return (
    <div>
      <Box className="d_flex_spaceBetween">
        <div>
          <Typography variant="h6" gutterBottom>
            {t("dashboard.finnace.dispaly")} 1{" "}
            {t("dashboard.finnace.availablecontracts")}
          </Typography>
        </div>
        <TablePagination
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell
                    sx={{ textAlign: lang === "en" ? "left" : "right" }}
                  >
                    <p>{t("dashboard.contarcts.residential")} </p>
                    <span style={{ color: "var(--green-color)" }}>
                      {row.column1}
                    </span>
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: lang === "en" ? "left" : "right" }}
                  >
                    <p> اسم الموقع</p>
                    <span>{row.column2}</span>
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: lang === "en" ? "left" : "right" }}
                  >
                    <p> {t("dashboard.contarcts.startdate")}</p>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <CalendarTodayIcon className="calenderIcon" />
                      <span>{row.column3}</span>
                    </div>
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: lang === "en" ? "left" : "right" }}
                  >
                    <p> {t("dashboard.contarcts.enddate")} </p>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <CalendarTodayIcon className="calenderIcon" />
                      <span>{row.column4}</span>
                    </div>
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: lang === "en" ? "left" : "right" }}
                  >
                    <p> {t("dashboard.contarcts.recname")}</p>
                    <span>{row.column5}</span>
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: lang === "en" ? "left" : "right" }}
                  >
                    <p> {t("dashboard.incoming_orders.card3.label1")}</p>

                    {row.column6}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: lang === "en" ? "left" : "right",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{ color: "var(--green-color)", cursor: "pointer" }}
                      onClick={handleToggleShowContactBox}
                    >
                      {row.column7}
                    </span>
                    {contractDetails && (
                      <Paper
                        sx={{
                          position: "absolute",
                          right: "-16px",
                          backgroundColor: "var(--green-color)",
                          color: "white",
                          width: "6rem",
                          textAlign: "center",
                        }}
                      >
                        <Link to="/dashboard/acc/contact_details">
                          {t("dashboard.Invoices.Viewdetails")}
                        </Link>
                      </Paper>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ReserveMoneyModal
        selectedRowId={selectedRowId}
        open={isModalMoneyOpen}
        onClose={handleClose}
      />
    </div>
  );
};

export default ContractTable;
