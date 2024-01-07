import { useState } from "react";
import { useTranslation } from "react-i18next";
import OfficeBoxNumbers from "./OfficeBoxNumbers";
import "../../../../assets/dashboard/css/office_details.css";
import { Switch, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "var(--green-color)",
    "&:hover": {
      backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "var(--green-color)",
  },
}));

const OfficeDetailsNumbers = ({ dispatch, state }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [showFloors, setShowFloors] = useState(true);
  const [showAge, setShowAge] = useState(true);
  const [showOffices, setShowOffices] = useState(true);
  const [showMeetingRooms, setShowMeetingRooms] = useState(true);

  // Toggle functions to control the switches
  const handleOfficesToggle = (en_name) => {
    if (showOffices) {
      dispatch({
        type: "details",
        data: {
          type: "remove",
          object: {
            en_name: en_name,
          },
        },
      });
    }
    setShowOffices(!showOffices);
  };

  const handleMeetingRoomsToggle = (en_name) => {
    if (showMeetingRooms) {
      dispatch({
        type: "details",
        data: {
          type: "remove",
          object: {
            en_name: en_name,
          },
        },
      });
    }
    setShowMeetingRooms(!showMeetingRooms);
  };

  return (
    <div>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "600",
          marginBottom: "16px",
          marginTop: "8px",
          fontSize: { xs: "1.2rem", md: "1.5rem" },
        }}
      >
        {lang === "ar" ? " تفاصيل المكتب" : "Office Details"}
      </Typography>
      <OfficeBoxNumbers
        title={lang === "ar" ? "الدور" : "Floors"}
        dispatch={dispatch}
        state={state}
        status={showFloors}
        ar_name="الدور"
        en_name="floors"
        numbers={[
          t("dashboard.contract.groundfloor"),
          t("dashboard.contract.Peaks"),
          3,
          4,
        ]}
      />
      <OfficeBoxNumbers
        dispatch={dispatch}
        state={state}
        ar_name="عمر العقار"
        status={showAge}
        en_name="office Age"
        title={lang === "ar" ? "عمر العقار" : "office Age"}
        numbers={[1, 2, 3, 4]}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontWeight: "500" }}>
          {lang === "ar" ? " عدد المكاتب" : "offices numbers"}
        </span>
        <GreenSwitch
          className="Switch1"
          checked={showOffices} // set the value of the switch
          onChange={() => handleOfficesToggle("offices numbers")} // handle the change of the switch
        />
      </div>

      {showOffices && (
        <OfficeBoxNumbers
          dispatch={dispatch}
          ar_name="عدد المكاتب"
          status={showOffices}
          en_name="offices numbers"
          state={state}
          title={""}
          numbers={[1, 2, 3, 4]}
        />
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontWeight: "500" }}>
          {lang === "ar" ? " غرف اجتماعات" : "Meeting Rooms"}
        </span>
        <GreenSwitch
          className="Switch1"
          checked={showMeetingRooms} // set the value of the switch
          onChange={() => handleMeetingRoomsToggle("Meeting Rooms")} // handle the change of the switch
        />
      </div>
      {showMeetingRooms && (
        <OfficeBoxNumbers
          dispatch={dispatch}
          state={state}
          status={showMeetingRooms}
          ar_name="غرف اجتماعات"
          en_name="Meeting Rooms"
          title={""}
          numbers={[1, 2, 3, 4]}
        />
      )}
    </div>
  );
};

export default OfficeDetailsNumbers;
