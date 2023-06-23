import React, { useState } from "react";
import { IconButton } from "@mui/material";
import AlertDialog from "../../../../components/AlertDialog";
import ServiceForm from "../Forms/ServiceForm";
import icons from "../../../../assets";
import ClinicForm from "../Forms/ClinicForm";

export default function CardActionButton({ data, clinics }) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  return (
    <>
      {open && (
        <AlertDialog
          open={open}
          title="Edit Service"
          setOpen={setOpen}
          message={
            <ServiceForm
              setOpen={setOpen}
              initialState={data}
              isEdit
              clinics={clinics}
            />
          }
        />
      )}
      <IconButton onClick={handleClick}>
        <img src={icons.editIcon} />
      </IconButton>
    </>
  );
}
export function ClinicCardActionButton({ data }) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  return (
    <>
      {open && (
        <AlertDialog
          open={open}
          title="Edit Clinic"
          setOpen={setOpen}
          message={<ClinicForm setOpen={setOpen} initialState={data} isEdit />}
        />
      )}
      <IconButton onClick={handleClick}>
        <img src={icons.editIcon} />
      </IconButton>
    </>
  );
}
