import React, { useContext, useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import Footer from "./Footer";
import { useMediaQuery } from "@mui/material";

import { useTranslation } from "react-i18next";
// import { useAxiosConfig } from "../../context/AxiosContext ";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { ChatDialogStyle } from "../../mainComponents/MainPageStyles";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { LogoBig } from "../../assets/dashboard/logos";
import myAxios from "../../api/myAxios";
const Layout = ({ children }) => {
  const location = useLocation();

  const isMapPage = location.pathname.includes("map");
  const HomePage = location.pathname === "/";
  const isMediumScreen = useMediaQuery("(max-width:900px)") && !HomePage;
  return (
    <div>
      {/* <TopNav setIsUserSelected={setIsUserSelected} /> */}
      <main>{children}</main>
      {!isMapPage && !HomePage && !isMediumScreen ? <Footer /> : ""}
    </div>
  );
};

export default Layout;
