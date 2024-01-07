import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation } from "react-router-dom";
import NavNavLink from "./NavNavLink";
import SideBar from "./SideBar";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageBtn from "../../ui/LanguageBtn";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import UserName from "./UserName";
const DashLayout = () => {
  const { t } = useTranslation();
  const location = useLocation().pathname;
  const isTransactionPage =
    location.includes("statements") || location.includes("transactions");
  const [isSidebarShown, setIsSidebarShown] = useState(true);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const user_type_bussines = true;
  let paddingClass = "";
  if (isTransactionPage) {
    paddingClass = "p-0";
  } else {
    paddingClass = isXs ? "p-2" : isMd ? "p-10" : "p-2";
  }
  const navArray = [
    {
      id: 1,
      title: t("dashboard.navLinks.link1"),
      url: "home",
    },
    {
      id: 2,
      title: t("dashboard.navLinks.link2"),
      url: "calendar",
    },
    {
      id: 3,
      title: t("dashboard.navLinks.link3"),
      url: "reservations",
    },
    {
      id: 4,
      title: t("dashboard.navLinks.link4"),
      url: "properties",
    },
    {
      id: 5,
      title: t("dashboard.navLinks.link5"),
      url: "transactions",
    },
    {
      id: 6,
      title: t("dashboard.navLinks.link6"),
      url: "prices/main",
    },
    {
      id: 7,
      title: t("dashboard.sideContent.link7"),
      url: "acc/contracts",
    },
    {
      id: 8,
      title: t("dashboard.sideContent.link9"),
      url: "my_info",
    },
  ];
  // const hideSideBar = location.pathname.includes("properties");
  const filteredNavArray = navArray.filter((item) => {
    // Check if user_type_bussines is false and the link should be hidden
    return (
      user_type_bussines ||
      !["properties", "transactions", "prices/main"].includes(item.url)
    );
  });

  return (
    <div className="flex flex-row items-start min-h-[100vh] min-w-[300px]">
      <aside
        className={`${
          isSidebarShown
            ? "max-w-fit flex-1 sm:w-fit"
            : "w-0 sm:w-[0px] overflow-hidden"
        }  min-h-[100vh] sticky sm:fixed  z-20 bg-white top-0`}
      >
        <SideBar setIsSidebarShown={setIsSidebarShown} />
      </aside>
      <main className="flex-1 bg-dashPageColor min-h-[100vh] ">
        <nav className="bg-white sticky top-0 flex z-10 items-center gap-8 sm:px-2">
          <Box
            onClick={() => setIsSidebarShown(true)}
            sx={{
              position: "absolute",
              top: "0px",
              backgroundColor: "white",
              zIndex: "2",
              height: { xs: "100px !important", md: "auto !important" },
              display: { xs: "flex !important", md: "none !important" },
              cursor: "pointer",
              alignItems: "center",
            }}
          >
            <MenuIcon fontSize="medium" />
          </Box>
          <div className="flex flex-row flex-nowrap flex-1 sm:max-w-[320px] overflow-y-auto">
            {filteredNavArray.map((ele, i) => (
              <div key={i}>
                <NavNavLink title={ele.title} to={ele.url} />
              </div>
            ))}
          </div>
          <UserName />
          {/* <LanguageBtn /> */}
        </nav>
        <section className={paddingClass}>
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default DashLayout;
