import {
  Avatar,
  Grid,
  Typography,
  Button,
  useMediaQuery,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import { Actions } from "./components/Actions";
import AddIcon from "@mui/icons-material/Add";
import "./style.scss";
import AdminsTable from "./components/AdmimsTable";
import AlertDialog from "../../components/AlertDialog";
import AddAdminForm from "./components/AddAdminForm";

export function Admins() {
  const matches = useMediaQuery("(max-width: 600px)");
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && (
        <AlertDialog
          open={open}
          setOpen={setOpen}
          title="Add Admin"
          message={<AddAdminForm />}
        />
      )}
      <Grid
        container
        justifyContent="flex-end"
        alignItems="center"
        sx={{ marginBottom: "16px" }}
      >
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            startIcon={<AddIcon />}
            className={matches ? "contained-icon-button" : "contained-button"}
            onClick={() => setOpen(true)}
          >
            {" "}
            {!matches && "Add"}
          </Button>
        </Grid>
      </Grid>
      <AdminsTable />
    </>
  );
}
