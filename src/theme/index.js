import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      light:'#fff',
      main: '#468D8D',
      dark:'#000'
    },
    secondary: {
      light:'gba(242, 106, 71, 0.08)',
      main: '#F26A47',
    },
  },
  typography: {
    allVariants: {
      fontFamily: "DM Sans",
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#468D8D',
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root : {
          borderRadius: '15px'
        }
      }
    }
  }
});