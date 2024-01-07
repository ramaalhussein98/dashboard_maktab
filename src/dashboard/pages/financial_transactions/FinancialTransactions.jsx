import React, { useEffect, useRef, useState } from "react";
import "../../../assets/dashboard/css/financialtransactions.css";
import { Calender, SearchGray2 } from "../../../assets/dashboard/icons";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Divider,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import TransctionsDetails from "./TransctionsDetails";
import DateRange from "../../../mainComponents/DateRange";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useTranslation } from "react-i18next";

const FinancialTransactions = () => {
  const { t, i18n } = useTranslation();
  const dateRangeRef = useRef(null);
  const excludedBoxRef = useRef(null);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
    color: "var(--main-color)",
  });
  const [selectedDates, setSelectedDates] = useState([]);
  const singleDate = false;
  const [showCalendar, setShowCalendar] = useState(false);
  const [showEntireBox, setShowEntireBox] = useState(false);
  const [displayStartDate, setDisplayStartDate] = useState("");
  const [displayEndDate, setDisplayEndDate] = useState("");
  const theme = useTheme();
  const isXS = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      setDisplayStartDate(dateRange.startDate.toLocaleDateString());
      setDisplayEndDate(dateRange.endDate.toLocaleDateString());
    }
  }, [dateRange]);
  const toggleMenu = () => {
    setShowEntireBox(true);
  };

  const toggleClose = () => {
    setShowEntireBox(false);
  };
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
    <>
      <div className="d_flex">
        {isXS ? (
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
        ) : null}
        {!isXS || showEntireBox ? (
          <Box
            className="calender"
            sx={{
              width: { xs: "50% !important", md: "25% !important" },
              position: isXS ? "fixed !important" : "",
            }}
          >
            <div className="insideCalender">
              <div className="selectTimeBox" style={{ position: "relative" }}>
                {/* <form> */}
                <div ref={excludedBoxRef}>
                  <p className="titleSelectPeriod">
                    {" "}
                    {t("dashboard.transactions.Specifyaperiod")}{" "}
                  </p>
                  <button className="selecttimebtn">
                    <img
                      src={Calender}
                      className="imgcalender"
                      onClick={toggleCalendar}
                    />
                    <input
                      value={showCalendar ? displayStartDate : ""}
                      placeholder={
                        showCalendar
                          ? ""
                          : t("dashboard.transactions.Beginningoftheperiod")
                      }
                      className="inputstyle"
                    />
                    <Divider sx={{ width: "100%" }} />
                    <input
                      value={showCalendar ? displayEndDate : ""}
                      placeholder={
                        showCalendar
                          ? ""
                          : t("dashboard.transactions.Endoftheperiod")
                      }
                      className="inputstyle"
                    />
                    {showCalendar && (
                      <CloseIcon
                        onClick={() => {
                          setDateRange({
                            startDate: new Date(),
                            endDate: new Date(),
                            key: "selection",
                            color: "var(--main-color)",
                          });
                          setShowCalendar(false);
                        }}
                      />
                    )}
                  </button>
                </div>
                {/* </form> */}
              </div>

              <Divider sx={{ width: "100%", marginY: "2rem" }} />
              <div>
                <p className="titleSelectPeriod">
                  {" "}
                  {t("dashboard.reservation.search")}{" "}
                </p>
                <div className="searchBoxCalender">
                  <img src={SearchGray2} />
                  <input
                    className="inputStyle"
                    placeholder={t(
                      "dashboard.transactions.Searchbyreservationnumber"
                    )}
                  />
                </div>
              </div>
              <Divider sx={{ width: "100%", marginY: "2rem" }} />
              <p className="titleSelectPeriod">
                {" "}
                {t("dashboard.transactions.Transferstatus")}{" "}
              </p>
              <FormGroup sx={{ width: "70% !important" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{
                        color: "black",
                        width: "40px",
                      }}
                    />
                  }
                  label={t("dashboard.transactions.coming")}
                />
              </FormGroup>
              <FormGroup sx={{ width: "50% !important", marginBottom: "3rem" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{
                        color: "black",
                        width: "40px",
                      }}
                    />
                  }
                  label={t("dashboard.transactions.outlet")}
                />
              </FormGroup>
            </div>
          </Box>
        ) : null}
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
        <Box
          className="transaction"
          sx={{ width: { xs: "100% !important", md: "75% !important" } }}
        >
          <Typography variant="h5" style={{ fontWeight: "700" }}>
            {t("dashboard.transactions.Moneytransfers")}
          </Typography>
          <Paper className="transictionPaper">
            <div className="transictionDiv">
              <TransctionsDetails />
            </div>

            <Divider orientation="vertical" flexItem sx={{ marginX: "15px" }} />
            <div className="transactionPayment">
              <div className="d_flex_spaceBetween">
                <span className="font_gray">
                  {" "}
                  {t("dashboard.transactions.Transferfees")}
                </span>
                <span className="font_bold">0.5%</span>
              </div>
              <div className="d_flex_spaceBetween">
                <span className="font_gray">
                  {" "}
                  {t("dashboard.transactions.Entitlementamount")}
                </span>
                <span className="font_bold">15000000 {t("currency")}</span>
              </div>
              <div className="d_flex_spaceBetween">
                <span className="font_gray">
                  {" "}
                  {t("dashboard.transactions.Netamounttransferred")}
                </span>
                <span className="font_bold color_Green">
                  {" "}
                  150.00000 {t("currency")}
                </span>
              </div>
              <div className="d_flex_spaceBetween">
                <span className="font_gray">
                  {" "}
                  {t("dashboard.InstantPayment.Remainingamount")}
                </span>
                <span className="font_bold color_Green">
                  {" "}
                  150.0 {t("currency")}
                </span>
              </div>
            </div>
          </Paper>
        </Box>
      </div>
    </>
  );
};

export default FinancialTransactions;
