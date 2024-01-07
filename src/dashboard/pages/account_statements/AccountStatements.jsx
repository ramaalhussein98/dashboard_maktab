import React, { useState, useRef, useEffect } from "react";
import { Box, Divider, Paper, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useTranslation } from "react-i18next";
import DateRange from "../../../mainComponents/DateRange";
const AccountStatements = () => {
  const { t, i18n } = useTranslation();
  const singleDate = false;
  const [showEntireBox, setShowEntireBox] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const dateRangeRef = useRef(null);
  const excludedBoxRef = useRef(null);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
    color: "var(--main-color)",
  });
  const theme = useTheme();
  const isXS = useMediaQuery(theme.breakpoints.down("md"));
  const rowTitles = [
    { width: "15%", label: t("dashboard.contract.Tenantname") },
    { width: "10%", label: t("dashboard.Accountstatements.date") },
    { width: "30%", label: t("dashboard.Accountstatements.Statement") },
    { width: "15%", label: "المبلغ المدفوع" },
    { width: "15%", label: t("dashboard.Accountstatements.Balance") },
    { width: "20%", label: "المبلغ الإجمالي بعد خصم العمولة" },
  ];
  const rowsdata = [
    {
      name: { width: "15%", label: "nama1" },
      date: { width: "10%", label: "12-11-2022" },
      statement: {
        width: "30%",
        label:
          "12-11-2022 إضافة مبلغ مدفوع لحجز مؤكد رقم 12345 - حديقة الفن -  قاعة مناسبات صغيرة",
      },
      balance: { width: "15%", label: "698.00" },
      amount: { width: "15%", label: "44666 " },
      remain: { width: "20%", label: "9876 " },
    },
    {
      name: { width: "15%", label: "nama122" },
      date: { width: "10%", label: "12-11-2022" },
      statement: {
        width: "30%",
        label:
          "12-11-2022 إضافة مبلغ مدفوع لحجز مؤكد رقم 12345 - حrrrrdsadcsديقة الفن -  قاعة مناسبات صغيرة",
      },
      amount: { width: "15%", label: "44666 " },
      balance: { width: "15%", label: "698.00" },
      remain: { width: "20%", label: "9876 " },
    },

    // Add more rows as needed
  ];
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  const handleOutsideClick = (event) => {
    if (
      showCalendar &&
      !dateRangeRef.current.contains(event.target) &&
      !excludedBoxRef.current.contains(event.target)
    ) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showCalendar]);
  return (
    <div className="d_flex">
      {/* {isXS ? (
        <div
          style={{
            position: "absolute",
            padding: "1rem",
            zIndex: "1",
            cursor: "pointer",
            right: "1rem",
            zIndex: "2",
          }}
        >
          {!showEntireBox && <FilterListIcon onClick={toggleMenu} />}
          {showEntireBox && <CloseIcon onClick={toggleClose} />}
        </div>
      ) : null} */}
      {/* {!isXS || showEntireBox ? (
        <Box
          className="calender"
          sx={{
            width: { xs: "50% !important", md: "25% !important" },
            position: isXS ? "fixed !important" : "",
          }}
        >
          <p className="titleSelectPeriod" style={{ marginTop: "1rem" }}>
            {t("dashboard.Accountstatements.Latestaccountstatements")}
          </p>
          <select className="calenderSelect">
            <option>شهر نوفمبر 2022</option>
            <option>شهر اكتوبر 2022</option>
          </select>
        </Box>
      ) : null} */}
      <div style={{ width: "100%" }}>
        <Paper
          className="paperSatement"
          onClick={toggleCalendar}
          onChange={toggleCalendar}
        >
          <div className="serach-bills-container">
            <p className="p1">حدد تاريخ البحث</p>
            <div className="d-flex">
              <span className="spanfrom"> من </span>
              <input
                type="text"
                placeholder="Select date range"
                onClick={toggleCalendar}
                onChange={toggleCalendar}
                value={`${dateRange.startDate.toLocaleDateString()} `}
                style={{ width: "100%", cursor: "pointer" }}
              />

              <span className="spanfrom">إلى </span>
              <input
                type="text"
                placeholder="Select date range"
                onClick={toggleCalendar}
                onChange={toggleCalendar}
                value={` ${dateRange.endDate.toLocaleDateString()}`}
                style={{ width: "100%", cursor: "pointer" }}
              />
            </div>

            <div ref={dateRangeRef}>
              {showCalendar && (
                <DateRange
                  showCalendar={showCalendar}
                  setShowCalendar={setShowCalendar}
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                  singleDate={singleDate}
                  selectedDates={selectedDates}
                  setSelectedDates={setSelectedDates}
                />
              )}
            </div>
          </div>

          <Typography variant="h6" sx={{ marginY: "1rem" }}>
            {t("dashboard.Accountstatements.Monthly")} نوفمبر 2022
          </Typography>
          <div style={{ textAlign: "center" }}>
            <span className="font_gray">
              {" "}
              {t("from")} 01 نوفيلا {t("to")} 01 ديسمير
            </span>
            <div>
              <span>
                {" "}
                {t("dashboard.Accountstatements.balancefirstduration")}
              </span>
              <span className="font_bold">1500 {t("Rial")} </span>
              <span style={{ marginRight: "10px" }}>
                {" "}
                {t("dashboard.Accountstatements.balancelastduration")}
              </span>
              <span className="font_bold">1500 {t("Rial")} </span>
            </div>
          </div>
        </Paper>
        <Paper sx={{ width: { xs: "800px", md: "100%" } }}>
          <div
            style={{
              display: "flex",
              textAlign: "center",
            }}
          >
            {rowTitles.map((data, index) => (
              <div
                key={index}
                className="font_bold"
                style={{
                  width: data.width,
                  position: "relative",
                  padding: "1rem 10px",
                }}
              >
                {data.label}
                <span
                  style={{
                    content: '""',
                    position: "absolute",
                    width: "1px",
                    height: "100%",
                    backgroundColor: "#eee",
                    left: 0,
                    top: 0,
                  }}
                />
              </div>
            ))}
          </div>
          <Divider />
          <div
            style={{
              display: "flex",
              textAlign: "center",
              flexDirection: "column",
            }}
          >
            {rowsdata.map((data, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                }}
              >
                <div
                  style={{
                    width: data.name.width,
                    position: "relative",
                    padding: "1rem 10px ",
                  }}
                >
                  {data.name.label}
                  <span
                    style={{
                      content: '""',
                      position: "absolute",
                      width: "1px",
                      height: "100%",
                      backgroundColor: "#eee",
                      left: 0,
                      top: 0,
                    }}
                  />
                </div>
                <div
                  style={{
                    width: data.date.width,
                    position: "relative",
                    padding: "1rem 10px ",
                  }}
                >
                  {data.date.label}
                  <span
                    style={{
                      content: '""',
                      position: "absolute",
                      width: "1px",
                      height: "100%",
                      backgroundColor: "#eee",
                      left: 0,
                      top: 0,
                    }}
                  />
                </div>
                <div
                  style={{
                    width: data.statement.width,
                    position: "relative",
                    padding: "1rem 10px ",
                  }}
                >
                  {data.statement.label}
                  <span
                    style={{
                      content: '""',
                      position: "absolute",
                      width: "1px",
                      height: "100%",
                      backgroundColor: "#eee",
                      left: 0,
                      top: 0,
                    }}
                  />
                </div>
                <div
                  style={{
                    width: data.amount.width,
                    position: "relative",
                    padding: "1rem 10px ",
                    fontWeight: "600",
                    color: "var(--green-color)",
                  }}
                >
                  {data.amount.label} +
                  <span
                    style={{
                      content: '""',
                      position: "absolute",
                      width: "1px",
                      height: "100%",
                      backgroundColor: "#eee",
                      left: 0,
                      top: 0,
                    }}
                  />
                </div>
                <div
                  style={{
                    width: data.balance.width,
                    position: "relative",
                    padding: "1rem 10px ",
                  }}
                >
                  {data.balance.label}
                  <span
                    style={{
                      content: '""',
                      position: "absolute",
                      width: "1px",
                      height: "100%",
                      backgroundColor: "#eee",
                      left: 0,
                      top: 0,
                    }}
                  />
                </div>

                <div
                  style={{
                    width: data.remain.width,
                    position: "relative",
                    padding: "1rem 10px ",
                    fontWeight: "600",
                    color: "var(--green-color)",
                  }}
                >
                  {data.remain.label}
                  <span
                    style={{
                      content: '""',
                      position: "absolute",
                      width: "1px",
                      height: "100%",
                      backgroundColor: "#eee",
                      left: 0,
                      top: 0,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Paper>
        <Paper className="paperTotalPrice">
          <span className="font_bold" style={{ marginRight: "13rem" }}>
            {t("dashboard.Accountstatements.Totalaccountstatement")}
          </span>
          <span
            className="color_Green font_bold"
            style={{ marginRight: "13rem" }}
          >
            15000 {t("Rial")}
          </span>
        </Paper>
      </div>
    </div>
  );
};

export default AccountStatements;
