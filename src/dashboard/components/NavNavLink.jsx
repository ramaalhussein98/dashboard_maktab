import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MuiButton } from "../../mainComponents/CustomStyledMuiComponents";

const NavNavLink = ({ title, to }) => {
  const [isHomeOpen, setIsHomeOpen] = useState(false);

  const url = useLocation().pathname;

  useEffect(() => {
    if (url.split("/").includes(to)) {
      setIsHomeOpen(true);
    } else {
      setIsHomeOpen(false);
    }
  }, [url]);

  return (
    <MuiButton>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "p-6 text-primary font-semibold text-[16px] relative block  w-full"
            : "p-6 text-primary font-semibold text-[16px] relative block hover:bg-slate-100 w-full"
        }
        to={to}
      >
        {title}
        {isHomeOpen && (
          <div
            className={`w-full absolute h-[4px] bottom-0 left-0 bg-primary rounded-md`}
          ></div>
        )}
      </NavLink>
    </MuiButton>
  );
};

export default NavNavLink;
