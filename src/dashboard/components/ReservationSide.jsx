import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CloseOutlined, SearchOutlined } from "@mui/icons-material";
import { Checkbox, FormControlLabel } from "@mui/material";
import { MuiButton } from "../../mainComponents/CustomStyledMuiComponents";
import { useTranslation } from "react-i18next";
import DateRange from "../../mainComponents/DateRange";
import { useRef, useState, useEffect } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const reserveState = [
  { id: 1, title_en: "New", title_ar: "جديد" },
  { id: 2, title_en: "Pending Approval", title_ar: "انتظار الموافقة" },
  { id: 3, title_en: "Cancelled", title_ar: "ملغي" },
  { id: 4, title_en: "Completed", title_ar: "منتهي" },
];
const ReservationSide = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const [selectedDays, setSelectedDays] = useState([]);
  const dateRangeRef = useRef(null);
  const excludedBoxRef = useRef(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [displayStartDate, setDisplayStartDate] = useState("");
  const [displayEndDate, setDisplayEndDate] = useState("");
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
    color: "var(--main-color)",
  });
  const singleDate = false;
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
    if (dateRange.startDate && dateRange.endDate) {
      setDisplayStartDate(dateRange.startDate.toLocaleDateString());
      setDisplayEndDate(dateRange.endDate.toLocaleDateString());
    }
  }, [dateRange]);
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showCalendar]);

  return (
    <div className="flex flex-col w-[300px] gap-5 max-h-[calc(100vh-80px)] overflow-y-auto py-4">
      <div className="px-7 flex flex-col gap-2" ref={dateRangeRef}>
        <h2 className="text-xl font-bold">
          {t("dashboard.reservation.Specifyaperiod")}
        </h2>
        <div style={{ position: "relative" }} ref={excludedBoxRef}>
          <div className="dateBtnStyle" onClick={toggleCalendar}>
            <span id="dateBtnText">
              {displayStartDate} - {displayEndDate}
            </span>
            <CalendarTodayIcon />
          </div>
        </div>
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

      <hr />

      <div className="px-7 flex flex-col gap-2">
        <label className="text-xl font-bold">
          {" "}
          {t("dashboard.reservation.search")}
        </label>
        <div className="relative">
          <div className="absolute right-2 top-[50%] translate-y-[-50%]">
            <SearchOutlined sx={{ fontSize: "26px" }} />
          </div>
          <input
            className="block w-full border-custom shadow-custom p-3 rounded-xl pr-10 outline-primary"
            type="text"
            placeholder={
              language === "en"
                ? "Search by customer name or reservation number"
                : "ابحث بحسب اسم العميل او رقم الحجز"
            }
          />
        </div>
      </div>

      <div className="px-7 flex flex-col gap-2">
        <label className="text-xl font-bold">
          {" "}
          {t("dashboard.reservation.Reservationstatus")}{" "}
        </label>

        <div className="flex flex-col">
          {reserveState.map((ele, i) => (
            <FormControlLabel
              key={i}
              label={language === "en" ? ele.title_en : ele.title_ar}
              control={
                <Checkbox
                  sx={{
                    "&.Mui-checked": {
                      color: "#5a409b",
                    },
                  }}
                />
              }
            />
          ))}
        </div>
        {/* 
        <hr />

        <label className="text-xl font-bold">مصدر الحجز</label>
        <div className="flex flex-col">
          <FormControlLabel
            label={"الاستقبال"}
            control={
              <Checkbox
                sx={{
                  "&.Mui-checked": {
                    color: "#5a409b",
                  },
                }}
              />
            }
          />
          <FormControlLabel
            label={"مكتب"}
            control={
              <Checkbox
                sx={{
                  "&.Mui-checked": {
                    color: "#5a409b",
                  },
                }}
              />
            }
          />
        </div>

        <div className="w-[100px] rounded-xl self-end">
          <MuiButton>
            <span className="flex gap-2 justify-center items-center w-[100px] py-2 border text-primary border-primary rounded-xl">
              <CloseOutlined fontSize="small" />
              مسح
            </span>
          </MuiButton>
        </div> */}
      </div>
    </div>
  );
};

export default ReservationSide;
