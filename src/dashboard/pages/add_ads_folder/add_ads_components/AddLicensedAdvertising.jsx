import React, { useState } from "react";
import {
  Box,
  Divider,
  IconButton,
  Link,
  Switch,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { alpha, styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import HouseIcon from "@mui/icons-material/House";
import "./office_details.css";

import { useTranslation } from "react-i18next";
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

const AddLicensedAdvertising = ({
  selectedCheckLicense,
  setSelectedCheckLicense,
  state,
  dispatch,
}) => {
  const [checked, setChecked] = useState(false);
  const [checkedRequest, setCheckedRequest] = useState(false);
  const { t } = useTranslation();

  const handleLicesneNumbervaule = (event) => {
    // setLicenseNumber(event.target.value);
    dispatch({ type: "license_number", value: event.target.value });
  };
  const handleToggleSwitch = () => {
    setChecked(!checked);
    if (checkedRequest) {
      setCheckedRequest(false);
      setSelectedCheckLicense("licensed");
    } else {
      setSelectedCheckLicense();
    }
  };

  const handleToggleRequestSwitch = () => {
    setCheckedRequest(!checkedRequest);
    if (checked) {
      setChecked(false);
      setSelectedCheckLicense("request");
    } else {
      setSelectedCheckLicense();
    }
  };
  return (
    <Box sx={{ padding: { xs: "10px", md: "20px" } }}>
      <Typography className="font_bold" sx={{ marginBottom: "2rem" }}>
        {t("dashboard.contract.Pleaseselect")}
      </Typography>
      <div style={{ display: "flex" }} onClick={handleToggleSwitch}>
        <IconButton
          sx={{
            backgroundColor: "var(--green-color)",
            color: "white",
            width: "30px",
            height: "30px",
            marginY: "auto",
            "&:hover": {
              backgroundColor: "var(--green-color)",
              color: "white",
            },
          }}
        >
          <AddIcon />
        </IconButton>
        <Divider orientation="vertical" flexItem sx={{ margin: "0px 20px" }} />
        <div
          style={{
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            display: "flex",
          }}
        >
          <div>
            <p className="font_bold"> {t("dashboard.contract.addLicensed")}</p>
            <p className="color_gray">
              {t("dashboard.contract.licensenumber")}
            </p>
          </div>
          <GreenSwitch
            className="Switch1"
            checked={checked}
            onChange={handleToggleSwitch}
          />
        </div>
      </div>
      {checked && (
        <>
          <p
            className="font_bold"
            style={{ textAlign: "center", marginTop: "1rem" }}
          >
            {t("dashboard.contract.based")}
          </p>
          <Link
            href="#"
            sx={{
              textDecoration: "none",
              textAlign: "center",
              display: "block",
              margin: "auto",
              marginY: "1rem",
            }}
          >
            {t("dashboard.contract.addadverst")}
          </Link>
          <span className="color_gray ">
            {t("dashboard.contract.Advertnumber")}
          </span>
          <input
            value={state?.license_number}
            onChange={handleLicesneNumbervaule}
            placeholder={t("dashboard.contract.plzenter")}
            style={{
              width: "100%",
              border: "1px solid #ddd",
              borderRadius: "40px",
              boxShadow:
                " 0 1px 2px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05)",
              paddingInline: "7px",
              height: "45px",
              marginTop: "5px",
            }}
          />
        </>
      )}
      <Divider sx={{ marginY: "2rem" }} />

      <div style={{ display: "flex" }} onClick={handleToggleRequestSwitch}>
        {/* <IconButton
          sx={{
            backgroundColor: "var(--green-color)",
            color: "white",
            width: "30px",
            height: "30px",
            marginY: "auto",
            "&:hover": {
              backgroundColor: "var(--green-color)",
              color: "white",
            },
          }}
        >
          <AddIcon />
        </IconButton> */}
        <HouseIcon sx={{ fontSize: "2rem", color: "gray", margin: "auto" }} />
        <Divider orientation="vertical" flexItem sx={{ margin: "0px 20px" }} />
        <div
          style={{
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            display: "flex",
          }}
        >
          <div>
            <p className="font_bold">{t("dashboard.contract.addmarkting")}</p>
            <p className="color_gray"> {t("dashboard.contract.orderdata")}</p>
          </div>
          <GreenSwitch
            className="Switch1"
            checked={checkedRequest}
            onChange={handleToggleRequestSwitch}
          />
        </div>
      </div>
    </Box>
  );
};

export default AddLicensedAdvertising;
