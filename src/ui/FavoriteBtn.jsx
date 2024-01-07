import { Button } from "@mui/material";
import { useState } from "react";

const FavoriteBtn = () => {
  const [isClicked, setIsClicked] = useState(false);
  const iconStyle = {
    display: "block",
    fill: isClicked ? "red" : "rgba(0, 0, 0, 0.5)",
    height: "24px",
    width: "24px",
    stroke: "#fff",
    strokeWidth: "2px",
    overflow: "visible",
  };
  const handleClick = (e) => {
    e.preventDefault(); // Prevent the default behavior of the button click
    setIsClicked(!isClicked);
  };
  return (
    <Button
      sx={{
        position: "absolute",
        top: "1rem",
        left: "0px",
        minWidth: "0px",
        zIndex: "1",
      }}
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        style={iconStyle} // Use the object notation for the style prop
        aria-hidden="true"
        role="presentation"
        focusable="false"
      >
        <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
      </svg>
    </Button>
  );
};

export default FavoriteBtn;
