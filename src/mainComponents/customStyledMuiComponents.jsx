import { Button } from "@mui/material";
import { styled } from "styled-components";

export const MuiButton = styled(Button)`
  && {
    padding: 0px;
    width: 100%;
    height: 100%;
    .MuiTouchRipple-root {
      color: red;
    }
  }
`;
