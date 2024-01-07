import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import ContractTable from "./components/ContractTable";
import { Box, Paper, Typography } from "@mui/material";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DescriptionIcon from "@mui/icons-material/Description";

const Contracts = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const getAnimatedProps = (tabName) => {
    return {
      boxShadow:
        activeTab === tabName
          ? "0px 0px 10px 0px rgba(165, 163, 163, 0.75)"
          : "none",
      config: { tension: 180, friction: 12 },
      opacity: activeTab === tabName ? 1 : 0.8,
    };
  };

  const tabs = [
    {
      name: "tab1",
      text: t("dashboard.contarcts.numbercontracts"),
      icon: <FileCopyIcon />,
    },
    {
      name: "tab2",
      text: " العقود المقبولة",
      icon: <DescriptionIcon sx={{color:"var(--green-color)"}}/>,
    },
    {
      name: "tab4",
      text: "قيد الانتظار ",
      icon: <DescriptionIcon sx={{color:"#fa870d"}}/>,
    },
    {
      name: "tab3",
      text: "العقود المنتهية",
      icon: <DescriptionIcon sx={{color:"red"}}/>,
    },
  ];

  return (
    <Box>
      <Box className="d_flex_spaceBetween ">
        <Typography variant="h6" gutterBottom style={{ fontWeight: "700" }}>
          {t("dashboard.BillsNav.link2")}
        </Typography>
        <Link
          to="/dashboard/acc/create_type_contract"
          className="createContact"
        >
          إنشاء نماذج العقود
        </Link>
      </Box>
      <Box className="d_flex_spaceBetween contarctBoxes">
        {tabs.map((tab) => {
          const animatedProps = getAnimatedProps(tab.name);
          const AnimatedPaper = animated(Paper);

          return (
            <AnimatedPaper
              key={tab.name}
              className="divContract"
              onClick={() => handleTabChange(tab.name)}
              style={{
                boxShadow: animatedProps.boxShadow,
                opacity: animatedProps.opacity,
              }}
            >
              <p className="p1">{tab.text}</p>
              <b>1</b>
              <div className="svg1">{tab.icon}</div>
              {/* <FileCopyIcon /> */}
            </AnimatedPaper>
          );
        })}
      </Box>

      {activeTab === "tab1" && <ContractTable />}
      {activeTab === "tab2" && "2"}
      {activeTab === "tab3" && "3"}
      {activeTab === "tab4" && "4"}
    </Box>
  );
};

export default Contracts;
