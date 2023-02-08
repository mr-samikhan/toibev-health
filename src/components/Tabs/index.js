import * as React from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "start",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    width: "15px",
    height: "2.54px",
    backgroundColor: "#468D8D",
    borderRadius: "100px",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: "500",
    fontSize: "18px",
    marginRight: theme.spacing(2),
    padding: 0,
    color: "rgba(0, 0, 0, 0.5)",
    fontStyle: "normal",
    lineHeight: "23px",
    alignItems: "start",
    "&.Mui-selected": {
      color: theme.palette.primary.main,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

export function CustomTabs({ options }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <StyledTabs
        value={value}
        onChange={handleChange}
        aria-label="styled tabs example"
      >
        {options.map((tab) => (
          <StyledTab label={tab} />
        ))}
      </StyledTabs>
      <Box sx={{ p: 3 }} />
    </Box>
  );
}
