import { Box, Button, Paper } from "@mui/material";
import { useContext, useState, useRef, useEffect } from "react";

import { Menu, User } from "../assets/dashboard/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LogInModal from "../authentication/LogInModal";
import UserContext from "../context/userContext";
import useDataFetcher from "../api/useDataFetcher ";

import { toast } from "react-toastify";
import LogInModalOrdinar from "../authentication/LogInModalOrdinar";
import myAxios from "../api/myAxios";
import { useStateContext } from "../context/userContext";
const LoginButton = ({ isLoggedIn }) => {
  const { t, i18n } = useTranslation();
  const { setUser, setToken } = useStateContext();
  const lang = i18n.language;
  const LoginRef = useRef();
  const [showloginBox, setShowLoginBox] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalOrdinary, setOpenModalOrdinary] = useState(false);
  const { userData } = useContext(UserContext);
  const { data, isLoading, error, get, post } = useDataFetcher();
  const token = localStorage.getItem("user_token");
  const user_type_bussines =
    localStorage.getItem("user_type") === "bussines" ? true : false;
  console.log(user_type_bussines);
  const handleOpenModal = () => {
    // if (isLoggedIn) {
    //   setShowLogout((prev) => !prev);
    // } else {
    //   setOpenModal(true);
    // }
    setOpenModal(true);
  };
  const handleOpenModalOrdinary = () => {
    setOpenModalOrdinary(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleCloseModalOrdinary = () => {
    setOpenModalOrdinary(false);
  };
  const handleShowloginBox = () => {
    setShowLoginBox(!showloginBox);
  };

  const handleLogOut = async () => {
    let response;

    const token = localStorage.getItem("user_token");

    if (!token) {
      toast.error("User is not authenticated");
      return;
    }

    if (user_type_bussines) {
      response = await myAxios.post(
        "https://dashboard.maktab.sa/api/v1/user/logout"
      );
    } else {
      response = await myAxios.post(
        "https://dashboard.maktab.sa/api/v1/ordinaries/logout"
      );
    }
    console.log(response);
    if (response?.data?.status === true) {
      localStorage.removeItem("user_token");
      localStorage.removeItem("user_type");
      localStorage.removeItem("userData");
      setUser(null);
      setToken(null);
      toast.success(
        i18n.language === "ar"
          ? "تم تسجيل الخروج بنجاح"
          : "Signed out successfully"
      );
    } else {
      toast.error("Logout failed");
    }
    // } catch (error) {
    //   console.error("Logout error:", error);
    //   toast.error("An error occurred during logout");
    // }
  };
  const handleClickOutside = (event) => {
    if (LoginRef.current && !LoginRef.current.contains(event.target)) {
      // Clicked outside the login box, close it
      setShowLoginBox(false);
    }
  };

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <Box className="profileBox" ref={LoginRef} onClick={handleShowloginBox}>
        <Button className="btn_profile">
          <img src={Menu} style={{ width: "16px" }} />
          <img
            src={User}
            style={{
              width: "30px",
              marginRight: lang === "ar" ? "16px" : "auto",
              marginLeft: lang === "en" ? "16px" : "auto",
            }}
          />
        </Button>
        {showloginBox && (
          <Paper className="loginPaperBox">
            <ul className="ul1">
              {isLoggedIn && (
                <li className="li1">
                  <Link
                    to="/dashboard/home"
                    style={{ width: "100%", display: "flex" }}
                  >
                    {t("topNav.controlPanel")}
                  </Link>
                </li>
              )}
              {!isLoggedIn && (
                <>
                  <li className="li1" onClick={handleOpenModal}>
                    {t("topNav.Login")}
                  </li>
                  <li className="li1" onClick={handleOpenModalOrdinary}>
                    {t("topNav.Login2")}
                  </li>
                </>
              )}
              {isLoggedIn && (
                <li className="li1" onClick={handleLogOut}>
                  تسجيل الخروج
                </li>
              )}
            </ul>
          </Paper>
        )}
      </Box>
      {/* LoginModal */}
      <LogInModal open={openModal} onClose={handleCloseModal} />
      <LogInModalOrdinar
        open={openModalOrdinary}
        onClose={handleCloseModalOrdinary}
      />
    </>
  );
};

export default LoginButton;
