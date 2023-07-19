import { useState } from "react";

export const useActions = () => {
  const [open, setOpen] = useState(false);
  const [openAvalability, setOpenAvailability] = useState(false);
  return { open, setOpen, setOpenAvailability, openAvalability };
};
