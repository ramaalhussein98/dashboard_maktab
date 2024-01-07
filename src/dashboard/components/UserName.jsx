import React, { useRef, useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useStateContext } from "../../context/userContext";
import { Link, useNavigate } from "react-router-dom";

const UserName = () => {
  const { user, setToken, setUser } = useStateContext();
  const userName = user?.username;
  const nav = useNavigate();

  const userNameContext = "rama";
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const loginListRef = useRef(null);
  const [showLoginList, setShowLoginList] = useState(false);
  const handleSignOut = () => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_type");
    localStorage.removeItem("userData");
    setUser(null);
    setToken(null);
    toast.success(
      i18n.language === "ar"
        ? "تم تسجيل الخروج بنجاح"
        : "signed out successfully"
    );
    nav("/");
  };
  const toggleShowLoginList = (event) => {
    event.stopPropagation();
    setShowLoginList(!showLoginList);
  };
  return (
    <Box sx={{ display: { xs: "none", md: "block" }, position: "relative" }}>
      <Button
        sx={{ color: "var(--green-color)" }}
        onClick={toggleShowLoginList}
      >
        <Avatar
          sx={{
            width: "20px",
            height: "20px",
            marginLeft: lang === "ar" ? "10px" : "0px",
            marginRight: lang === "ar" ? "0px" : "10px",
            backgroundColor: "var(--green-color)",
          }}
        />
        <Typography sx={{ fontWeight: "700" }}>
          {userName && userName !== "null" ? userName : ""}
        </Typography>
        <KeyboardArrowDownIcon sx={{ marginRight: "10px" }} />
      </Button>
      {showLoginList && (
        <Paper
          ref={loginListRef}
          sx={{
            position: "absolute",
            top: "73px",
            borderRadius: "12px",
            left: lang === "en" ? "auto" : "1rem",
            right: lang === "ar" ? "auto" : "1rem",
            filter: "drop-shadow(rgba(0, 0, 0, 0.32) 0px 2px 8px)",
            "&:before": {
              content: "''",
              display: "block",
              position: "absolute",
              top: "0px",
              left: lang === "ar" && "14px",
              right: lang === "en" && "14px",
              width: "10px",
              height: "10px",
              backgroundColor: "rgb(255, 255, 255)",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
            "& li": {
              borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
              padding: "0rem 1rem 0.3rem 0rem",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            },
            transition: "opacity 0.5s ease-in-out",
            opacity: 1,
          }}
        >
          <ul
            style={{
              listStyle: "none",
              minWidth: "200px",
              margin: "0",
              padding: "1rem .5rem",
              cursor: "pointer",
            }}
          >
            <li
              style={{
                borderBottom: "1px solid #eee",

                padding: "0.3rem 1rem 0.5rem 0rem",
              }}
            >
              <Link to="/term-of-service-agreement">اتفاقية الاستخدام</Link>
            </li>
            <li
              onClick={handleSignOut}
              style={{
                borderBottom: "none",
                padding: "0.5rem 1rem 0rem 0rem",
              }}
            >
              {t("dashboard.top_nav.title2")}
            </li>
          </ul>
        </Paper>
      )}
    </Box>
  );
};

export default UserName;
