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
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SettingsIcon from "@mui/icons-material/Settings";
const FinanceTable = ({ selectContract }) => {
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [isModalMoneyOpen, setIsModalMoneyOpen] = useState(false);
  const [showAllBills, setShowAllBills] = useState(false);
  const [showSettingDetails, setShowSettingDetails] = useState(false);
  const [selectedRowIdMap, setSelectedRowIdMap] = useState({});
  const { t, i18n } = useTranslation();
  const toggleShowAllBills = () => {
    setShowAllBills(!showAllBills);
  };

  const handleOpenMoneyModal = (rowId) => {
    setSelectedRowId(rowId);
    setIsModalMoneyOpen(true);
  };
  const handleToggleSettingDetails = (rowId) => {
    const updatedRowIdMap = { ...selectedRowIdMap };
    updatedRowIdMap[rowId] = !selectedRowIdMap[rowId];
    setSelectedRowIdMap(updatedRowIdMap);
    console.log(rowId);
  };
  const rows = [
    {
      id: 1,
      column1: selectContract,
      column2: " 2",
      column3: "3",
      column4: "#23455666777",
      column5: <AccountBalanceIcon />,
    },
  ];

  const columns = [
    { id: "column1", label: t("dashboard.sub_page.label1") },
    { id: "column2", label: t("dashboard.Invoices.ReleaseDate") },
    { id: "column3", label: t("dashboard.finnace.specificdate") },
    { id: "column4", label: t("dashboard.Invoices.theamount") },
    { id: "column5", label: t("dashboard.incoming_orders.card3.label1") },
    { id: "column6", label: "مشاهدة " },
    { id: "column7", label: "الإجرائيات " },
  ];
  const billsContent = [
    {
      id: 1,
      column1: "#22222222",
      column2: "31-07-2023",
      column3: "31-07-2024",
      column4: " 12030",
      column5: "لم يتم الدفع",
      column6: <VisibilityIcon />,
      column7: <SettingsIcon />,
    },
    {
      id: 2,
      column1: "#476474674",
      column2: "31-07-2023",
      column3: "31-07-2024",
      column4: " 2000",
      column5: "لم يتم الدفع",
      column6: <VisibilityIcon />,
      column7: <SettingsIcon />,
    },
    {
      id: 3,
      column1: "#476474674",
      column2: "31-07-2023",
      column3: "31-07-2024",
      column4: " 2000",
      column5: "لم يتم الدفع",
      column6: <VisibilityIcon />,
      column7: <SettingsIcon />,
    },
  ];
  const displayedBillsContent = showAllBills
    ? billsContent
    : billsContent.slice(0, 2);
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
            قائمة الفواتير ومعلومات الأقساط
          </Typography>
          <p className="color_gray">
            قائمة بجميع فواتير العقود ومعلومات الأقساط للفواتير
          </p>
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
                  <TableCell sx={{ textAlign: "right", color: "gray" }}>
                    {row.column5}
                  </TableCell>
                  <TableCell sx={{ textAlign: "right" }}>
                    <p>{t("dashboard.contarcts.residential")} </p>
                    <span style={{ color: "var(--main-color)" }}>
                      {row.column1}
                    </span>
                  </TableCell>
                  <TableCell sx={{ textAlign: "right" }}>
                    <p> {t("dashboard.finnace.Totalbills")}</p>
                    <span>{row.column2}</span>
                  </TableCell>
                  <TableCell sx={{ textAlign: "right" }}>
                    <p>{t("dashboard.sub_page.label1")}</p>
                    <span>{row.column3}</span>
                  </TableCell>
                  <TableCell sx={{ textAlign: "right" }}>
                    <p>{t("dashboard.finnace.Dueinvoices")}</p>
                    <span>{row.column4}</span>
                  </TableCell>

                  <TableCell sx={{ textAlign: "right" }} colSpan={2}>
                    <Box className="BoxBtnCashAndReserve">
                      <Link
                        to="/dashboard/acc/InstantPayment"
                        className="button1"
                      >
                        {t("dashboard.finnace.makepayment")}
                      </Link>
                      <button
                        className="button1"
                        onClick={() => handleOpenMoneyModal(row.id)}
                      >
                        {t("dashboard.finnace.requestrecipt")}
                      </button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>

          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                sx={{ textAlign: "right", fontWeight: "700" }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
          {displayedBillsContent.map((column) => (
            <TableRow key={column.id} style={{ backgroundColor: "white" }}>
              <TableCell
                sx={{ textAlign: "right", color: "#0f5eb3", fontWeight: "700" }}
              >
                {column.column1}
              </TableCell>
              <TableCell sx={{ textAlign: "right" }}>
                {/* <CalendarTodayIcon className="calenderIcon" /> */}
                {column.column2}
              </TableCell>
              <TableCell sx={{ textAlign: "right" }}>
                {/* <CalendarTodayIcon className="calenderIcon" /> */}
                {column.column3}
              </TableCell>
              <TableCell sx={{ textAlign: "right" }}>
                {column.column4}
              </TableCell>
              <TableCell sx={{ textAlign: "right", color: "red" }}>
                {column.column5}
              </TableCell>
              <TableCell sx={{ textAlign: "center", color: "#0f5eb3" }}>
                <Link to="/dashboard/acc/contact_details">
                  {column.column6}
                </Link>
              </TableCell>

              <TableCell
                sx={{ textAlign: "center", cursor: "pointer" }}
                onClick={() => handleToggleSettingDetails(column.id)}
              >
                {column.column7}
              </TableCell>
              {selectedRowIdMap[column.id] && (
                <Paper
                  sx={{
                    position: "fixed",
                    left: "37px",
                    marginTop: "3rem",

                    backgroundColor: "white",
                    width: "7rem",
                    textAlign: "center",
                    zIndex: "111",
                  }}
                >
                  <ul>
                    <li
                      style={{
                        borderBottom: "1px solid #eee",
                        padding: "5px",
                      }}
                    >
                      إلغاء الفاتورة
                    </li>
                    <li style={{ color: "red" }}>حذف</li>
                  </ul>
                </Paper>
              )}
            </TableRow>
          ))}
        </Table>
        <p
          className="showAllBills"
          onClick={toggleShowAllBills}
          style={{ cursor: "pointer" }}
        >
          {showAllBills
            ? t("dashboard.finnace.Hidepremiums")
            : t("dashboard.finnace.showall")}
        </p>
      </TableContainer>
      <ReserveMoneyModal
        selectedRowId={selectedRowId}
        open={isModalMoneyOpen}
        onClose={handleClose}
      />
    </div>
  );
};

export default FinanceTable;
