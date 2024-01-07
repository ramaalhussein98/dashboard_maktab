import React, { useEffect, useRef, useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import "../../../assets/dashboard/css/LeftDrawer.css";
import CloseIcon from "@mui/icons-material/Close";
import { Divider, MenuItem, Select } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DateRange from "../../../mainComponents/DateRange";
import { useTranslation } from "react-i18next";

const LeftDrawer = ({ open, toggleDrawer }) => {
  const { t, i18n } = useTranslation();
  const [selectedPriceValue, setSelectedPriceValue] = useState("نسبة");
  const [selectedDays, setSelectedDays] = useState([]);
  const dateRangeRef = useRef(null);
  const excludedBoxRef = useRef(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
    color: "var(--main-color)",
  });
  const singleDate = false;

  const handleDayClick = (day) => {
    if (day === "الكل") {
      setSelectedDays(["الكل"]);
    } else {
      if (selectedDays.includes(day)) {
        setSelectedDays(selectedDays.filter((d) => d !== day && d !== "الكل"));
      } else {
        if (selectedDays.includes("الكل")) {
          setSelectedDays([day]);
        } else {
          setSelectedDays([...selectedDays, day]);
        }
      }
    }
  };

  const handleSelectPriceChange = (event) => {
    setSelectedPriceValue(event.target.value);
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
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  useEffect(() => {
    const startDateText = dateRange.startDate.toLocaleDateString();
    const endDateText = dateRange.endDate.toLocaleDateString();
    const newText = ` من ${startDateText} إلى ${endDateText}`;
    const element = document.getElementById("dateBtnText");
    if (element) {
      element.innerHTML = newText;
    }
  }, [dateRange.startDate]);
  return (
    <>
      <div>
        <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
          <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            className="DrawerWidth"
          >
            <div className="DrawerTitleDiv">
              <span>{t("dashboard.prices.addneoffer")}</span>
              <button onClick={toggleDrawer(false)}>
                <CloseIcon />
              </button>
            </div>
          </div>
          <Divider />

          {/* this for offer name  */}
          <div style={{ padding: "24px 24px 0px" }}>
            <p className="font_18_700">{t("dashboard.prices.offername")} </p>
            <p className="p_gray_18">{t("dashboard.prices.notbevisible")}</p>
            <input
              type="text"
              placeholder={t("dashboard.prices.writeoffername")}
              className="input_style"
            />
            <Divider />
          </div>
          {/* this for select unit */}
          <div style={{ padding: "24px 24px 0px" }}>
            <p className="font_18_700">{t("dashboard.prices.unitoffer")}</p>
            <select id="unit" name="unit" className="select_style">
              <option value="volvo">Volvo</option>
            </select>

            <Divider />
          </div>
          {/* this for قيمة الخصم unit */}
          <div style={{ padding: "24px 24px 0px" }}>
            <p className="font_18_700">
              {" "}
              {t("dashboard.prices.discountvalue")}
            </p>
            <div style={{ display: "flex", gap: "13px" }}>
              <select
                id="discount"
                name="discount"
                className="select_style"
                value={selectedPriceValue}
                onChange={handleSelectPriceChange}
                style={{ width: "60%" }}
              >
                <option value="نسبة">{t("dashboard.prices.percent")}</option>
                <option value="سعر">{t("dashboard.prices.price")}</option>
              </select>
              <div style={{ position: "relative", width: "100%" }}>
                <input
                  type="number"
                  placeholder={t("dashboard.prices.discountvalue")}
                  className="input_style"
                  style={{
                    appearance: "none",
                    WebkitAppearance: "none",
                    MozAppearance: "textfield",
                  }}
                />
                {selectedPriceValue === "نسبة" ? (
                  <span className="percentSpan">%</span>
                ) : (
                  <span className="percentSpan">{t("Rial")}</span>
                )}
              </div>
            </div>

            <Divider />
          </div>
          {/* this for date   */}
          <div style={{ padding: "24px 24px 0px" }}>
            <p className="font_18_700"> {t("dashboard.prices.offerdate")}</p>
            <p className="p_gray_18">{t("dashboard.prices.offerapply")}</p>
            <div style={{ position: "relative" }} ref={excludedBoxRef}>
              <div className="dateBtnStyle" onClick={toggleCalendar}>
                <span id="dateBtnText">
                  {t("dashboard.prices.selectdate")}{" "}
                </span>
                <CalendarTodayIcon />
              </div>
              <p
                className="p_gray_18"
                style={{
                  fontSize: "12px",
                  marginTop: "10px",
                  marginBottom: "25px",
                }}
              >
                {t("dashboard.prices.selectunitirst")}
              </p>
            </div>
            <div
              ref={dateRangeRef}
              style={{
                position: "fixed",
                left: "0px",
                zIndex: "1",
                top: "60%",
              }}
            >
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
            <Divider />
          </div>
          {/* this for days   */}
          <div style={{ padding: "24px 24px 0px" }}>
            <p className="font_18_700">{t("dashboard.prices.offerdays")}</p>
            <div className="div_btns_days">
              <div className="div_btns_days">
                <button
                  className={
                    selectedDays.includes("الكل")
                      ? "selectedDay button1"
                      : "button1"
                  }
                  onClick={() => handleDayClick("الكل")}
                >
                  {t("dashboard.prices.all")}
                </button>
                <button
                  className={
                    selectedDays.includes("ساعة")
                      ? "selectedDay button1"
                      : "button1"
                  }
                  onClick={() => handleDayClick("ساعة")}
                >
                  {t("dashboard.prices.hour")}
                </button>
                <button
                  className={
                    selectedDays.includes("يومي")
                      ? "selectedDay button1"
                      : "button1"
                  }
                  onClick={() => handleDayClick("يومي")}
                >
                  {t("dashboard.prices.daily")}
                </button>
                <button
                  className={
                    selectedDays.includes("شهري")
                      ? "selectedDay button1"
                      : "button1"
                  }
                  onClick={() => handleDayClick("شهري")}
                >
                  {t("dashboard.prices.Monthly")}
                </button>
                <button
                  className={
                    selectedDays.includes("سنوي")
                      ? "selectedDay button1"
                      : "button1"
                  }
                  onClick={() => handleDayClick("سنوي")}
                >
                  {t("dashboard.prices.annual")}
                </button>
              </div>
            </div>
          </div>
          {/* this button submit cancel */}
          <div className="BoxBtnSubmit">
            <button className="submit"> {t("save")}</button>
            <button className="cancel" onClick={toggleDrawer(false)}>
              {t("cancel")}
            </button>
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default LeftDrawer;
