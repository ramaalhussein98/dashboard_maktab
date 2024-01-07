import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import { MuiButton } from "../../mainComponents/CustomStyledMuiComponents";

const SideNavLink = ({ title, to }) => {
  const [isHomeOpen, setIsHomeOpen] = useState();
  const { i18n } = useTranslation();
  const url = useLocation().pathname.split("/");

  useEffect(() => {
    let goTo;
    if (to.includes("/")) {
      const parts = to.split("/");
      goTo = parts[parts.length - 1];
    } else {
      goTo = to;
    }
    const lastValue = url[url.length - 1];
    if (lastValue === goTo) {
      setIsHomeOpen(true);
    } else {
      setIsHomeOpen(false);
    }
  }, [url]);

  return (
    <MuiButton
      sx={{
        padding: "0px",
        ".MuiTouchRipple-root": {
          color: "red",
        },
      }}
    >
      <NavLink
        className={({ isActive }) =>
          isHomeOpen
            ? `p-[17px] px-8 ${
                i18n.language === "ar" ? "text-right" : "text-left"
              }  text-primary font-bold text-lg relative block bg-primaryBackgroundOpacity w-full`
            : `p-[17px] px-8 ${
                i18n.language === "ar" ? "text-right" : "text-left"
              } text-primary font-bold text-lg relative block hover:bg-slate-100 w-full`
        }
        to={to}
      >
        {title}
        {isHomeOpen && (
          <div
            className={`w-[4px] absolute h-full top-0 ${
              i18n.language === "ar" ? "right-0" : "left-0"
            }  bg-primary rounded-md`}
          ></div>
        )}
      </NavLink>
    </MuiButton>
  );
};

export default SideNavLink;
