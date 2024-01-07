import React, { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import "../assets/dashboard/css/date_range.css";
import { ar, enUS } from "date-fns/locale";
import { Box, Button } from "@mui/material";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useMediaQuery, useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";

const DateRange = ({
  showCalendar,
  setShowCalendar,
  dateRange,
  setDateRange,
  singleDate,
  selectedDates,
  setSelectedDates,
}) => {
  const [hoveredDate, setHoveredDate] = useState(null); // Track the hovered date
  const { i18n, t } = useTranslation();
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const MonthNum = isMediumScreen ? 1 : 2;
  const locale = i18n.language === "ar" ? ar : enUS;
  const location = useLocation().pathname;
  const isTransactionPage = location.split("/").includes("transactions");
  const detailsPage = location.split("/").includes("details");
  const reservationPage = location.split("/").includes("reservations");
  const statementsPage = location.split("/").includes("statements");

  const handleSelect = (ranges) => {
    if (singleDate) {
      const formattedStartDate = moment(ranges.selection.startDate).format(
        "YYYY-MM-DD"
      );

      if (isDateDisabled(formattedStartDate)) {
        toast.error("تاريخ غير متاح");
      } else {
        setDateRange({
          startDate: ranges.selection.startDate,
          endDate: ranges.selection.startDate,
          key: "selection",
          color: "var(--main-color)",
        });
        setSelectedDates(formattedStartDate);
      }
    } else {
      const newSelectedDates = [];

      for (
        let currentDate = new Date(ranges.selection.startDate);
        currentDate <= ranges.selection.endDate;
        currentDate.setDate(currentDate.getDate() + 1)
      ) {
        const formattedDate = moment(currentDate).format("YYYY-MM-DD");

        if (isDateDisabled(formattedDate)) {
          toast.error("بعض التواريخ التي تم اختيارها غير متاحة");
          return;
        } else {
          newSelectedDates.push(formattedDate);
        }
      }

      setSelectedDates(newSelectedDates);
      setDateRange({
        startDate: ranges.selection.startDate,
        endDate: ranges.selection.endDate,
        key: "selection",
        color: "var(--main-color)",
      });
    }
  };

  console.log(selectedDates);

  const specialDates = ["2023-09-15", "2023-09-20", "2023-09-25", "2023-10-15"];
  const datePrice = [
    { date: "2023-10-04", price: "4" },
    { date: "2023-09-29", price: "29" },
    { date: "2023-09-22", price: "27" },
    { date: "2023-10-07", price: "7" },
  ];

  const customDayRenderer = (date) => {
    // Format the date to match the format of specialDates
    const formattedDate = moment(date).format("YYYY-MM-DD");

    // Check if the date is in the specialDates array
    const isSpecialDate = specialDates.includes(formattedDate);

    // Check if the date exists in datePrice
    const datePriceItem = datePrice.find((item) => item.date === formattedDate);

    // Get the price for the current date
    const price = datePriceItem ? datePriceItem.price : null;
    // Apply custom styles to the dates
    const customStyles = {
      backgroundColor: isSpecialDate ? "rgb(218, 189, 31)" : "transparent",
      color: isSpecialDate ? "white" : "inherit",
      width: "40px",
      // height: "26px",
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      borderRadius: "18px",
      position: "relative", // Position for tooltip
    };

    return (
      <div
        style={customStyles}
        onMouseEnter={() => setHoveredDate(formattedDate)}
        onMouseLeave={() => setHoveredDate(null)}
      >
        {date.getDate()}
        {price && hoveredDate === formattedDate && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              color: "white",
              padding: "4px 8px",
              borderRadius: "4px",
              zIndex: 1,
            }}
          >
            {price}ر.س
          </div>
        )}
      </div>
    );
  };
  const ReservedDates = ["2023-10-22", "2023-10-24"];
  const formattedReservedDates = ReservedDates.map((date) =>
    moment(date).format("YYYY-MM-DD")
  );
  const isDateDisabled = (date) => {
    // Convert the date to the format you want to compare (YYYY-MM-DD)
    const formattedDate = moment(date).format("YYYY-MM-DD");

    // Check if the formatted date exists in the reserved dates array
    // return formattedReservedDates.includes(formattedDate);
    return formattedReservedDates.includes(formattedDate);
  };

  return (
    <>
      <Box
        className={
          isTransactionPage
            ? "DateRangeContainerTransctionPage"
            : detailsPage
            ? "DateRangeContainerDetailsPage"
            : reservationPage
            ? "DateRangeContainerReservationPage"
            : statementsPage
            ? "DateRangeContainerstatementsPage"
            : "DateRangeContainer"
        }
      >
        {showCalendar && (
          <DateRangePicker
            ranges={[dateRange]}
            direction="horizontal"
            months={MonthNum}
            locale={locale}
            onChange={handleSelect}
            minDate={new Date()}
            dayContentRenderer={customDayRenderer}
            disabledDay={isDateDisabled}
            rangeColors={singleDate ? ["var(--main-color)"] : undefined}
          ></DateRangePicker>
        )}

        {/* this box onlu in small screen */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            flex: "0 0 auto",
            padding: "8px",
            alignItems: "center",
            justifyContent: "flex-end",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            width: "332px",
            backgroundColor: "white",
            zIndex: "10",
            height: "44px",
          }}
        >
          <Button
            sx={{ color: "var(--main-color)" }}
            onClick={() => setShowCalendar(false)}
          >
            {t("cancel")}
          </Button>
          <Button sx={{ color: "var(--main-color)" }}>{t("search")}</Button>
        </Box>
      </Box>
    </>
  );
};

export default DateRange;
