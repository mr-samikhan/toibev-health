import React from "react";
import { Grid } from "@mui/material";
import LoginForm from "./components/LoginForm";
import logo from "../../assets/icons/ToiyabeLogo.png";
import backgroundImage from "../../assets/icons/background.png";
import image1 from "../../assets/images/login1.png";
import image2 from "../../assets/images/login2.png";
import "./style.scss";

export default function Login() {
  return (
    <Grid
      container
      xs={12}
      flexWrap="nowrap"
      sx={{
        height: "100vh",
      }}
    >
      <Grid item md={5}>
        <Grid container className="sections">
          <Grid item className="section">
            <Grid container sx={{ gap: "14px" }}>
              <Grid item xs={3}>
                <Grid>
                  <img src={image1} />
                </Grid>
                <Grid>
                  <img src={image2} />
                </Grid>
              </Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={3}></Grid>
            </Grid>
          </Grid>
          <Grid item className="section" sx={{ position: "relative" }}>
            <Grid className="top-background">
              <img src={backgroundImage} className="image" />
            </Grid>
            <Grid
              container
              justifyContent="center"
              sx={{ marginLeft: "-50px" }}
            >
              <img src={logo} />
            </Grid>
            <Grid className="bottom-background">
              <img src={backgroundImage} className="image" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className="form-section">
        <Grid container alignItems="center" sx={{ height: "100%" }}>
          {" "}
          <LoginForm />
        </Grid>
      </Grid>
    </Grid>
  );
}
