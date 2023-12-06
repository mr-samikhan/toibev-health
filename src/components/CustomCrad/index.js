import React from "react";
import {
  Grid,
  InputAdornment,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { ReactComponent as SearchIcon } from "../../assets/icons/search-normal.svg";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";
import "./style.scss";

export default function CustomCard({
  children,
  heading,
  noSearch,
  isLoading,
  buttonText,
  buttonAction,
}) {
  return (
    <Grid container flexDirection="column" className="card" mb={3}>
      {(heading || buttonText) && (
        <Grid
          container
          mb={1}
          justifyContent="space-between"
          alignItems="center"
        >
          {heading && (
            <Grid item>
              <Typography className="card-heading">{heading}</Typography>
            </Grid>
          )}
          {buttonText && (
            <Grid item>
              <Button
                variant="text"
                onClick={buttonAction}
                startIcon={<AddIcon />}
              >
                {buttonText}
              </Button>
            </Grid>
          )}
        </Grid>
      )}
      <Grid item className="card-container">
        {" "}
        <Grid container className="card-wrapper">
          {/* {!noSearch && (
            <Grid
              item
              xs={12}
              sx={{ mb: { xs: 3, sm: 2 } }}
              className="search-field"
            >
              {" "}
              <TextField
                fullWidth
                placeholder="Search"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ pl: 2 }}>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              ></TextField>
            </Grid>
          )} */}
          {!!isLoading ? (
            <Grid container alignItems="center" justifyContent="center">
              <CircularProgress />
            </Grid>
          ) : (
            children
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
