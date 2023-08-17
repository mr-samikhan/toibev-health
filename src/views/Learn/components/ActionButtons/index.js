import { Grid, IconButton } from "@mui/material";
import icons from "../../../../assets";
import React, { useState } from "react";
import TribeForm from "../TribeForm";
import LangugaeForm from "../Forms/LanguageForm";
import AlertDialog from "../../../../components/AlertDialog";
import ResiliencySubCatForm from "../Forms/ResiliencySubCatForm";

export function CultureActions({ data }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <AlertDialog
          title="Edit Culture"
          open={open}
          setOpen={setOpen}
          message={<TribeForm setOpen={setOpen} isEdit initialState={data} />}
        />
      )}
      <Grid container>
        <Grid item>
          {" "}
          <IconButton
            edge="end"
            onClick={(event) => {
              setOpen(true);
            }}
          >
            <img src={icons.editIcon} />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}
export function LanguageActions({ data }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && (
        <AlertDialog
          title="Edit Language"
          open={open}
          setOpen={setOpen}
          message={
            <LangugaeForm initialState={data} isEdit setOpen={setOpen} />
          }
        />
      )}
      <Grid container>
        <Grid item>
          {" "}
          <IconButton
            edge="end"
            onClick={(event) => {
              setOpen(true);
            }}
          >
            <img src={icons.editIcon} />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}
export function ResilienceySubCatActions({ data }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && (
        <AlertDialog
          title="Edit Language"
          open={open}
          setOpen={setOpen}
          message={
            <ResiliencySubCatForm
              initialState={data}
              isEdit
              setOpen={setOpen}
            />
          }
        />
      )}
      <Grid container>
        <Grid item>
          {" "}
          <IconButton
            edge="end"
            onClick={(event) => {
              setOpen(true);
            }}
          >
            <img src={icons.editIcon} />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}
