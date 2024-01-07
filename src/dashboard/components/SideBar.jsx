import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { blackLogo } from "../../assets/dashboard";
import HomepageSide from "./HomepageSide";
import ReservationSide from "./ReservationSide";
import { Link } from "react-router-dom";
import CalenderSide from "./CalenderSide";
const SideBar = ({ setIsSidebarShown }) => {
  const [type, setType] = useState();
  const location = useLocation().pathname;

  useEffect(() => {
    const pathArray = location.split("/");
    if (pathArray.includes("home")) {
      setType(0);
    } else if (pathArray.includes("reservations")) {
      setType(1);
    } else if (pathArray.includes("calendar")) {
      setType(2);
    } else {
      setType(0);
    }
  }, [location]);
  return (
    <div className="flex flex-col gap-4">
      <div
        className="mt-5 mx-3 w-fit hidden lg:block"
        onClick={() => setIsSidebarShown(false)}
      >
        <CloseIcon sx={{ cursor: "pointer" }} />
      </div>
      <div className="p-4">
        <Link to="/">
          <img src={blackLogo} alt="" style={{ width: "150px" }} />
        </Link>
      </div>
      {type === 0 ? (
        <HomepageSide />
      ) : type === 1 ? (
        <ReservationSide />
      ) : type === 2 ? (
        <CalenderSide />
      ) : (
        ""
      )}
    </div>
  );
};

export default SideBar;
