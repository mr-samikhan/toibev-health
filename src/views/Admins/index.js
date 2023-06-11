import { Grid, Button, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import AdminsTable from "./components/AdmimsTable";
import AlertDialog from "../../components/AlertDialog";
import AddAdminForm from "./components/Forms/AddAdminForm";
import { useGetAdmins } from "../../hooks/useGetAdmins";
import { CircularProgress } from "@mui/material";
import "./style.scss";

export function Admins() {
  const matches = useMediaQuery("(max-width: 600px)");
  const [open, setOpen] = useState(false);
  const { admins, isLoading, isFetching } = useGetAdmins({});

  return (
    <>
      {open && (
        <AlertDialog
          open={open}
          setOpen={setOpen}
          title="Add Admin"
          message={<AddAdminForm setOpen={setOpen} />}
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
      {isLoading || isFetching ? (
        <Grid container justifyContent="center">
          {" "}
          <CircularProgress />
        </Grid>
      ) : (
        <AdminsTable admins={admins} />
      )}
    </>
  );
}
