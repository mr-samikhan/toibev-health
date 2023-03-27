import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledButton = styled((props) => <Button {...props} />)(({ theme }) => ({
  "&.MuiButtonBase-root": {
    borderRadius: "16px",
    padding: "14px 0px",
    fontSize: "16px",
    lineHeight: "21px",
    textTransform: "none",
    fontWeight: 700,
  },
}));

export default function CustomButton({ children, fullWidth = true, ...rest }) {
  return (
    <StyledButton fullWidth {...rest}>
      {children}
    </StyledButton>
  );
}
