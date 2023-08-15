import { Grid, IconButton } from "@mui/material";
import icons from "../../../../assets";
import React, { useState } from "react";
import AlertDialog from "../../../../components/AlertDialog";
import { ProviderForm } from "../Forms/ProviderForm";
import { useActions } from "../../hooks/useActions";
import { ProviderAvailabilityForm } from "../Forms/ProviderAvailabilityForm";
import { TreatmentForm } from "../Forms/TreatmentForm";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import TreatmentResourceForm from "../Forms/TreatmentResourceForm";

export function Actions({ data }) {
  const { open, setOpen, setOpenAvailability, openAvalability } = useActions(
    {}
  );

  return (
    <>
      {open && (
        <AlertDialog
          open={open}
          setOpen={setOpen}
          title={"Add Medication"}
          message={
            <ProviderForm initialState={data} isEdit setOpen={setOpen} />
          }
        />
      )}
      {openAvalability && (
        <AlertDialog
          open={openAvalability}
          setOpen={setOpenAvailability}
          title={"Set Availability"}
          message={
            <ProviderAvailabilityForm
              open={openAvalability}
              initialState={data}
              setOpen={setOpenAvailability}
            />
          }
        />
      )}
      <Grid container>
        <Grid item sx={{ marginRight: "8px" }}>
          {" "}
          <IconButton edge="end" onClick={() => setOpenAvailability(true)}>
            <img src={icons.editCalendarIcon} />
          </IconButton>
        </Grid>
        <Grid item>
          {" "}
          <IconButton edge="end" onClick={() => setOpen(true)}>
            <img src={icons.editIcon} />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}
export function TreatmentActions({ data, expanded }) {
  const [open, setOpen] = useState(false);
  const [openResourceForm, setOpenResourceForm] = useState(false);

  return (
    <>
      {open && (
        <AlertDialog
          open={open}
          setOpen={setOpen}
          title={"Edit Treatment"}
          message={
            <TreatmentForm initialState={data} isEdit setOpen={setOpen} />
          }
        />
      )}
      {openResourceForm && (
        <AlertDialog
          open={openResourceForm}
          setOpen={setOpenResourceForm}
          title={"Add Treatment Resource"}
          message={
            <TreatmentResourceForm data={data} setOpen={setOpenResourceForm} />
          }
        />
      )}

      <Grid container alignItems="center" columnSpacing={2}>
        {!expanded ? (
          <Grid item>
            <IconButton edge="end">
              <img src={icons.editIcon} />
            </IconButton>
          </Grid>
        ) : (
          <>
            <Grid item>
              <IconButton edge="end" onClick={() => setOpen(true)}>
                <img src={icons.editIcon} />
              </IconButton>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setOpenResourceForm(true)}
                sx={{
                  p: 0,
                  minWidth: "0px",
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  background: "#468D8D",
                  "& span": {
                    m: 0,
                  },
                }}
              />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}

export function TreatmentResourceActions({ treatment, expanded, resource }) {
  const [openResourceForm, setOpenResourceForm] = useState(false);

  return (
    <>
      {openResourceForm && (
        <AlertDialog
          open={openResourceForm}
          setOpen={setOpenResourceForm}
          title={"Edit Treatment Resource"}
          message={
            <TreatmentResourceForm
              isEdit
              data={treatment}
              initialState={resource}
              setOpen={setOpenResourceForm}
            />
          }
        />
      )}

      <IconButton edge="end" onClick={() => setOpenResourceForm(true)}>
        <img src={icons.editIcon} />
      </IconButton>
    </>
  );
}
