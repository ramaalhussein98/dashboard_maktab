import React, { useState } from "react";
import {
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SettingsIcon from "@mui/icons-material/Settings";

const billsContent = [
  {
    id: 1,
    column1: "#22222222",
    column2: "31-07-2023",
    column3: " 12030 ",
    column4: "  مسددة",
    column5: <VisibilityIcon />,
    column6: <SettingsIcon />,
  },
  {
    id: 2,
    column1: "#476474674",
    column2: "31-07-2023",
    column3: " 2000",
    column4: "مسددة",
    column5: <VisibilityIcon />,
    column6: <SettingsIcon />,
  },
  {
    id: 3,
    column1: "#476474674",
    column2: "31-07-2023",
    column3: " 2000",
    column4: " مسددة ",
    column5: <VisibilityIcon />,
  },
];

const BillingRow = ({ data }) => {
  const { t, i18n } = useTranslation();
  const [contractDetails, setContractDetails] = useState(false);

  const handleToggleShowContactBox = () => {
    setContractDetails(!contractDetails);
  };

  return (
    <TableRow key={data.id} style={{ backgroundColor: "white" }}>
      <TableCell
        sx={{ textAlign: "right", color: "#0f5eb3", fontWeight: "700" }}
      >
        {data.column1}
      </TableCell>
      <TableCell sx={{ textAlign: "right" }}>
        {/* <CalendarTodayIcon className="calenderIcon" /> */}
        {data.column2}
      </TableCell>
      <TableCell sx={{ textAlign: "right" }}>
        {/* <CalendarTodayIcon className="calenderIcon" /> */}
        {data.column3}
      </TableCell>
      <TableCell
        sx={{
          textAlign: "right",
          color: "var(--green-color)",
          fontWeight: "600",
        }}
      >
        {data.column4}
      </TableCell>
      <TableCell
        sx={{ textAlign: "right", color: "#0f5eb3", cursor: "pointer" }}
      >
        <Link to="/dashboard/acc/contact_details">{data.column5}</Link>
      </TableCell>
      {contractDetails && (
        <Paper
          sx={{
            position: "absolute",
            backgroundColor: "var(--green-color)",
            color: "white",
            width: "6rem",
            textAlign: "center",
            zIndex: "111",
          }}
        >
          <Link to="/dashboard/acc/contact_details">
            {" "}
            {t("dashboard.Invoices.Viewdetails")}
          </Link>
        </Paper>
      )}
      {/* <TableCell
        sx={{
          textAlign: "center",
          color: "var(--green-color)",
          cursor: "pointer",
          position: "relative",
        }}
        onClick={handleToggleShowContactBox}
      >
        <MoreVertIcon />
        {contractDetails && (
          <Paper
            sx={{
              position: "absolute",
              backgroundColor: "var(--green-color)",
              color: "white",
              width: "6rem",
              textAlign: "center",
              zIndex: "111",
            }}
          >
            <Link to="/dashboard/acc/contact_details">
              {" "}
              {t("dashboard.Invoices.Viewdetails")}
            </Link>
          </Paper>
        )}
      </TableCell> */}
    </TableRow>
  );
};

const BillingTable = () => {
  const { t, i18n } = useTranslation();
  const columns = [
    { id: "column1", label: t("dashboard.sub_page.label1") },
    { id: "column2", label: t("dashboard.Invoices.ReleaseDate") },
    { id: "column3", label: t("dashboard.Invoices.theamount") },
    { id: "column4", label: t("dashboard.incoming_orders.card3.label1") },
    { id: "column5", label: " مشاهدة" },
  ];
  return (
    <div className="mt-5">
      <TableContainer
        component={Paper}
        sx={{
          width: { xs: "600px", md: "100%" },
          margin: "auto",
          borderRadius: "1rem",
        }}
      >
        <Table aria-label="simple table">
          <TableRow sx={{ color: "gray" }}>
            {columns.map((column) => (
              <TableCell key={column.id} sx={{ textAlign: "right" }}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
          {billsContent.map((data) => (
            <BillingRow key={data.id} data={data} />
          ))}
        </Table>
      </TableContainer>
    </div>
  );
};

export default BillingTable;
