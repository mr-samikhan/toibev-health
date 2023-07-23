import React, { useState } from "react";
import { IconButton } from "@mui/material";
import AlertDialog from "../../../../components/AlertDialog";
import icons from "../../../../assets";
import { GroupSessionForm } from "../Forms/GroupSessionForm";
import { MedicationForm } from "../Forms/MedicationForm";

export default function GroupSessionCardActionButton({ data }) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  return (
    <>
      {open && (
        <AlertDialog
          open={open}
          title="Edit Group Session"
          setOpen={setOpen}
          message={
            <GroupSessionForm setOpen={setOpen} initialState={data} isEdit />
          }
        />
      )}
      <IconButton onClick={handleClick}>
        <img src={icons.editIcon} />
      </IconButton>
    </>
  );
}
export function MedicationCardActionButton({ data }) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  return (
    <>
      {open && (
        <AlertDialog
          open={open}
          title="Edit Medication"
          setOpen={setOpen}
          message={
            <MedicationForm setOpen={setOpen} initialState={data} isEdit />
          }
        />
      )}
      <IconButton onClick={handleClick}>
        <img src={icons.editIcon} />
      </IconButton>
    </>
  );
}
