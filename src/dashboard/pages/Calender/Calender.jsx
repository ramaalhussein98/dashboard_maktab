import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import allLocales from "@fullcalendar/core/locales-all";
import { useTranslation } from "react-i18next";
import "../../../assets/dashboard/css/calender.css";
import { Skeleton } from "@mui/material";

// i will send to backend choseDates
// and i will take the dates
const Calender = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const [showBoxDays, setShowBoxDays] = useState(false); //this for box to show busy tou want or available
  const [selectedDates, setSelectedDates] = useState([]);
  const [chosenDates, setChosenDates] = useState([]); //this array i haved
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDateSelect = (info) => {
    const start = info.start;
    const currentDate = new Date();
    const end = info.end;
    if (start >= currentDate) {
      // Calculate the number of selected days
      const diffInDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      console.log(info);
      // Create an array of selected dates
      for (let i = 0; i < diffInDays; i++) {
        const selectedDate = new Date(start);
        selectedDate.setDate(start.getDate() + i);
        const isoDateString = selectedDate.toISOString().split("T")[0];
        // Check if the selected date is not already in the selectedDates array
        if (!selectedDates.includes(isoDateString)) {
          // selectedDates.push(isoDateString);
          setSelectedDates((prev) => [...prev, isoDateString]);
        }
      }

      setShowBoxDays(true);
    }
  };
  console.log("selected:", selectedDates);
  console.log("chosen:", chosenDates);
  const handleSaveChanges = () => {
    const result = new Set([...selectedDates, ...chosenDates]);
    console.log("res", result);
    setShowBoxDays(false);
    const updatedEvents = Array.from(result).map((date) => ({
      date,
      title: i18n.language === "ar" ? "مشغول" : "busy",
      className: "busy-day ",
      // display: "background",
    }));
    setEvents(updatedEvents);
    setChosenDates(Array.from(result));
    setSelectedDates([]);
  };

  const handleToggleAvailability = () => {
    const commonItems = selectedDates.filter((item) =>
      chosenDates.includes(item)
    );
    setShowBoxDays(
      selectedDates.filter((item) => !commonItems.includes(item)).length === 0
        ? false
        : true
    );

    const result = [
      // ...selectedDates.filter((item) => !commonItems.includes(item)),
      ...chosenDates.filter((item) => !commonItems.includes(item)),
    ];
    setChosenDates(result);
    console.log("result", result);
    const updatedEvents = result.map((date) => ({
      date,
      title: "مشغول",
      className: "busy-day selected",
    }));
    setEvents(updatedEvents);
    setSelectedDates(
      selectedDates.filter((item) => !commonItems.includes(item))
    );
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  const getPriceForDate = (date) => {
    // You can implement your logic here to fetch the price for the given date.

    const Prices = [
      { date: "2023-09-28", price: "28" },
      { date: "2023-09-30", price: "30" },
      { date: "2023-09-21", price: "21" },
      { date: "2023-11-05", price: "113" },
      { date: "2023-11-11", price: "8" },
      { date: "2023-11-13", price: "13" },
      { date: "2023-11-15", price: "15" },
    ];

    const foundPrice = Prices.find((item) => item.date === date);
    return foundPrice ? foundPrice.price : null;
  };

  const handleDayCellContent = (arg) => {
    const isoDateString = arg.date.toISOString().split("T")[0];
    const price = getPriceForDate(isoDateString);

    return (
      <>
        <div className="cell-content">
          <span className="cell-date">{arg.dayNumberText}</span>
          {loading ? (
            <Skeleton
              variant="text"
              height={20}
              animation="wave"
              sx={{ width: { xs: "40px", md: "60px" } }}
              className={
                i18n.language === "ar" ? "left-cell-price" : "right-cell-price"
              }
            />
          ) : (
            price && (
              <span
                className={
                  i18n.language === "ar"
                    ? "left-cell-price"
                    : "right-cell-price"
                }
              >
                {price}{" "}
                <span style={{ fontSize: "12px" }}>
                  {t("dashboard.calender.price_unit")}
                </span>
              </span>
            )
          )}
        </div>
      </>
    );
  };
  const handleCancel = () => {
    setShowBoxDays(false);
    setSelectedDates([]);
  };
  return (
    <div className="fullCalenderParent">
      <FullCalendar
        className="calendar-container"
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        select={handleDateSelect}
        events={[
          ...events,
          ...selectedDates.map((item, index) => ({
            start: item,
            end: item,
            display: "background",
          })),
        ]}
        eventClassNames={(arg) => arg.event.extendedProps.className}
        locales={allLocales}
        locale={i18n.language === "ar" ? "ar" : "en"}
        headerToolbar={{
          start: "prev",
          center: "title",
          end: " next",
        }}
        timeZone="locale"
        unselectCancel=".calendar-container"
        dayCellContent={handleDayCellContent}
        stickyHeaderDates={true}
        // height= "800px"
        longPressDelay={1} // Set the longPressDelay property to 500 milliseconds
        eventLongPressDelay={1} // Set the eventLongPressDelay property to 500 milliseconds
        selectLongPressDelay={1}
      />
      {showBoxDays && (
        <div className="NumbersOfDaysBox">
          <p className="p1">
            {" "}
            {t("dashboard.calender.Ithasbeendetermined")} {selectedDates.length}{" "}
            {t("dashboard.calender.Nights")}
          </p>
          <div className="btns_Box">
            {chosenDates.length > 0 && (
              <button
                className="available_btn"
                onClick={handleToggleAvailability}
              >
                {t("dashboard.calender.Availability")}
              </button>
            )}
            {!selectedDates.every((item) => chosenDates.includes(item)) && (
              <button className="busy_btn" onClick={handleSaveChanges}>
                {t("dashboard.calender.repair")}
              </button>
            )}
            <button className="cancel_btn1" onClick={handleCancel}>
              {t("cancel")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Calender;
