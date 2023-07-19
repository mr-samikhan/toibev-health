import React from "react";
import { Box } from "@mui/material";
import { useProviderAvailabilityForm } from "../../../hooks/useProviderAvailabilityForm";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "@hassanmojab/react-modern-calendar-datepicker";

export const ProviderAvailabilityForm = (props) => {
  const { handleSubmit, onSubmit, selectedDays, setSelectedDays, open } =
    useProviderAvailabilityForm(props);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {open && <Calendar value={selectedDays} onChange={setSelectedDays} />}
    </Box>
  );
};
