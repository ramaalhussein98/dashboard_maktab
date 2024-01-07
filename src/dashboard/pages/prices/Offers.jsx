import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
  Switch,
  FormControlLabel,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LeftDrawer from "./LeftDrawer";
import { alpha, styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: green[600],
    "&:hover": {
      backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: green[600],
  },
}));

const Offers = () => {
  const [office, setOffice] = useState("");
  const [switchState, setSwitchState] = useState(true);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const toggleDrawer = (isOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(isOpen);
  };

  const handleOfficeChange = (event) => {
    setOffice(event.target.value);
  };
  const handleSwitchChange = (event) => {
    setSwitchState(event.target.checked);
  };
  const handleDeleteOffer = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this offer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      customClass: {
        confirmButton: "swal-confirm-button",
        cancelButton: "swal-cancel-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked "Yes, delete it!"
        onRemove(); // Call the onRemove function to delete the box
      }
    });
  };

  return (
    <>
      <Box sx={{ padding: { xs: "0px", md: "20px" } }}>
        <span className="title_price"> {t("dashboard.pricesNav.link2")} </span>
        <Box
          className="d_flex_wrap"
          sx={{ marginY: "1rem", alignItems: "center" }}
        >
          <span className="font_bold">
            {t("dashboard.prices.chooseOffice")}
          </span>
          <FormControl
            sx={{ minWidth: 120, width: "250px", backgroundColor: "white" }}
          >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={office}
              onChange={handleOfficeChange}
              MenuProps={{
                getContentAnchorEl: null,
              }}
              IconComponent={ExpandMoreIcon}
            >
              <MenuItem value={10}>maktab</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Paper className="paper_style">
          <Box className="d_flex_space_between">
            <Typography className="title_price">maktab</Typography>
            <button className="edit_btn" onClick={toggleDrawer(true)}>
              {t("dashboard.prices.add_new_offer")}
            </button>
          </Box>
          <Paper className="paper_style">
            <Box className="d_flex_space_between">
              <Typography className="font_bold">Stars Tech</Typography>
              <Box className="box_switch">
                <div className="div1">
                  <span> {t("dashboard.prices.activation_status")}</span>
                  <FormControlLabel
                    control={
                      <GreenSwitch
                        dir="rtl"
                        checked={switchState}
                        onChange={handleSwitchChange}
                      />
                    }
                    sx={{
                      transform: "rotate(180deg) !important",
                      // "& .MuiSwitch-thumb": {
                      //   backgroundColor: "#4caf50",
                      // },
                    }}
                  />
                  {switchState ? (
                    <span style={{ color: "green" }}>
                      {t("dashboard.prices.active")}
                    </span>
                  ) : (
                    <span style={{ color: "gray" }}>
                      {" "}
                      {t("dashboard.prices.not_enabled")}
                    </span>
                  )}
                </div>
              </Box>
            </Box>
            <p className="font_gray">
              من الاثنين, 16 أكتوبر 2023 الى الأربعاء, 18 أكتوبر 2023
            </p>
            <Box className="d_flex_wrap_details_offer">
              <Box className="div1">
                <p className="p1">
                  {" "}
                  {t("dashboard.prices.discount_percentage")}
                </p>
                <div className="div11">10%</div>
              </Box>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ marginX: "1rem" }}
              />
              <Box className="div1">
                <p className="p1"> {t("dashboard.prices.applied_to")} </p>
                <div className="div11">rama</div>
              </Box>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ marginX: "1rem" }}
              />
              <Box className="div1">
                <p className="p1"> {t("dashboard.prices.offer_days")} </p>
                <div className="div11">
                  لكل أيام الإسبوع ما عدا (الثلاثاء و الاربعاء و الخميس و
                  الجمعة)
                </div>
              </Box>
            </Box>
            <Divider />

            <div className="div_edit_delete">
              <button className="edit" onClick={toggleDrawer(true)}>
                {t("dashboard.outgoing_requests.edit_btn")}
              </button>
              <button className="delete" onClick={handleDeleteOffer}>
                {t("dashboard.users_manage.delete_btn")}
              </button>
            </div>
          </Paper>
        </Paper>
      </Box>
      <LeftDrawer open={open} toggleDrawer={toggleDrawer} />
    </>
  );
};

export default Offers;
