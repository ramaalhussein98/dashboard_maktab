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
import ReserveMoneyModal from "./ReserveMoneyModal";

const BasicTable = () => {
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [isModalMoneyOpen, setIsModalMoneyOpen] = useState(false);
  const handleOpenMoneyModal = (rowId) => {
    setSelectedRowId(rowId);
    setIsModalMoneyOpen(true);
  };
  const rows = [
    // Add your data rows here
    {
      id: 1,
      column1: "#22222222",
      column2: " 2",
      column3: "3",
      column4: "#23455666777",
      column5: <AccountBalanceIcon />,
    },
    {
      id: 2,
      column1: "#34447575",
      column2: "3",
      column3: "6",
      column4: "#333334777",
      column5: <AccountBalanceIcon />,
    },
    {
      id: 3,
      column1: "#34447575",
      column2: "3",
      column3: "6",
      column4: "#333334777",
      column5: <AccountBalanceIcon />,
    },
    {
      id: 4,
      column1: "#34447575",
      column2: "3",
      column3: "6",
      column4: "#333334777",
      column5: <AccountBalanceIcon />,
    },
    {
      id: 5,
      column1: "#34447575",
      column2: "3",
      column3: "6",
      column4: "#333334777",
      column5: <AccountBalanceIcon />,
    },
    {
      id: 6,
      column1: "#34447575",
      column2: "3",
      column3: "6",
      column4: "#333334777",
      column5: <AccountBalanceIcon />,
    },
    {
      id: 7,
      column1: "#34447575",
      column2: "3",
      column3: "6",
      column4: "#333334777",
      column5: <AccountBalanceIcon />,
    },
    // Add more data rows as needed
  ];

  const columns = [
    { id: "column1", label: "سكني" },
    { id: "column2", label: " الفواتير المستحقة " },
    { id: "column3", label: " رقم الفاتورة " },
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
          {/* <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} sx={{ textAlign: "right" }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead> */}
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ textAlign: "right", color: "gray" }}>
                    {row.column5}
                  </TableCell>
                  <TableCell sx={{ textAlign: "right" }}>
                    <p>سكني </p>
                    <span style={{ color: "green" }}>{row.column1}</span>
                  </TableCell>
                  <TableCell sx={{ textAlign: "right" }}>
                    <p>إجمالي الفواتير</p>
                    <span>{row.column2}</span>
                  </TableCell>
                  <TableCell sx={{ textAlign: "right" }}>
                    <p> الفواتير</p>
                    <span>{row.column3}</span>
                  </TableCell>
                  <TableCell sx={{ textAlign: "right" }}>
                    <p>رقم الفواتير</p>
                    <span>{row.column4}</span>
                  </TableCell>
                  <TableCell sx={{ textAlign: "right" }}>
                    <Box className="BoxBtnCashAndReserve">
                      <button className="button1">إجراء دفعة</button>
                      <button
                        className="button1"
                        onClick={() => handleOpenMoneyModal(row.id)}
                      >
                        طلب سند قبض
                      </button>
                    </Box>
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

export default BasicTable;
