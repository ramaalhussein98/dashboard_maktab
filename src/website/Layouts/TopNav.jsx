import React, { useContext, useEffect, useState } from "react";
import "../../assets/dashboard/css/layout.css";
import { Box, Button, Container, Paper } from "@mui/material";
import { Link, useNavigate, NavLink } from "react-router-dom";

import { BlackRed } from "../../assets/dashboard/logos";

import "../../assets/dashboard/css/home.css";
import LoginButton from "../../ui/LoginButton";
import LanguageBtn from "../../ui/LanguageBtn";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import LogInModal from "../../authentication/LogInModal";
import AddIcon from "@mui/icons-material/Add";
import { Header } from "../../mainComponents/MainPageStyles";
import UserContext from "../../context/userContext";

import ChatRoundedIcon from "@mui/icons-material/ChatRounded";

import { myAxios } from "../../api/myAxios";
import useDataFetcher from "../../api/useDataFetcher ";
import { useOfficeHook } from "../../hooks/useOfficeHook";

const TopNav = ({ setIsUserSelected }) => {
  const isLoggedIn = localStorage.getItem("user_token") ? true : false;
  const user_type_bussines =
    localStorage.getItem("user_type") === "bussines" ? true : false;
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const nav = useNavigate();
  const [openFilterModal, setOpenFilterModal] = useState(false);

  const location = useLocation();
  const isPaymentPage = location.pathname.includes("payment");

  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        // Check if menuItems are available in localStorage
        const cachedMenuItems = localStorage.getItem("menuItems");
        if (cachedMenuItems) {
          // If available, parse and set them in state
          setMenuItems(JSON.parse(cachedMenuItems));
        } else {
          // If not available, make the API call
          const response = await myAxios.get("api/v1/user/menus/getHeader");
          const fetchedMenuItems = response?.data.data;

          // Set the menu items in state
          setMenuItems(fetchedMenuItems);

          // Cache the menu items in localStorage for future use
          localStorage.setItem("menuItems", JSON.stringify(fetchedMenuItems));
        }
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenuData();
  }, []);

  return (
    <>
      <Box
        sx={{ position: "sticky", top: "0px", right: "0px", zIndex: "1000" }}
      >
        {/* this for larger Screens */}
        <Box className="topNavContainer">
          <Container
            sx={{
              maxWidth: "1400px !important",
              padding: { xs: "0px", md: "0px" },
            }}
          >
            <Box className="topNavContainerBox">
              <Box className="logoBox">
                <Box className="logo">
                  <Link to="/">
                    <img src={BlackRed} alt="logo" />
                  </Link>
                </Box>
                <ul className="navLinks">
                  {menuItems?.links?.map((item, index) => (
                    <NavLink key={index} to={`/${item.link}`}>
                      <span>
                        {lang === "ar" ? item.title_ar : item.title_en}
                      </span>
                    </NavLink>
                    //    <Link  to={item.link} replace>

                    //  </Link>
                  ))}
                </ul>
              </Box>
              <Box className="loginBox">
                <Box className="profileSection">
                  <Box className="displayoffice">
                    {isLoggedIn && user_type_bussines && (
                      <Link to="/addoffice">
                        <span
                          className="displayOfficespan"
                          style={{
                            background:
                              "linear-gradient(25deg,#700707,#ff4646)",
                            color: "white",
                            padding: "9px 15px",
                            borderRadius: "20px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <AddIcon />

                          {t("topNav.Addyouroffice")}
                        </span>{" "}
                      </Link>
                    )}
                    {!user_type_bussines && (
                      <Link to="/business">
                        <span
                          className="displayOfficespan"
                          style={{
                            background:
                              "linear-gradient(25deg,#700707,#ff4646)",
                            color: "white",
                            padding: "9px 15px",
                            borderRadius: "20px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          مكتب أعمال
                        </span>
                      </Link>
                    )}
                  </Box>
                  <LoginButton isLoggedIn={isLoggedIn} />

                  <LanguageBtn />
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
        {/* this for small Screens */}
        {/* {!isPaymentPage && (
          <Box className="topSmallNavContainer">
            <Box className="smallBoxBorder" sx={{ minHeight: "47px" }}>
              <span className="span1">
                <div className="addvistor">
                  <input
                    type="text"
                    className="input1"
                    placeholder="أي مكان"
                    style={{ outline: "none", backgroundColor: "transparent" }}
                  />
                  <Box
                    className="searchIcon"
                    sx={{ position: "absolute", left: "0px" }}
                  >
                    <img src={Search} />
                  </Box>
                </div>
              </span>
            </Box>
            <Button
              className="FilterBtnSmall"
              onClick={handleFilerModalOpen}
              sx={{ top: "-3px" }}
            >
              <img src={FilterSmall} />
            </Button>
            <FilterModal
              openFilterModal={openFilterModal}
              setOpenFilterModal={setOpenFilterModal}
              setFilter={setFilter}
              refetch={refetch}
            />
          </Box>
        )} */}
      </Box>
    </>
  );
};

export default TopNav;
