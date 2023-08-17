import React, { useState } from "react";
import { useGetResiliencyCategory } from "../../../hooks/useGetResiliencyCategory";

export const useResiliencyCatrgory = ({ cat }) => {
  const [open, setOpen] = useState(false);

  const { data } = useGetResiliencyCategory({ cat });

  return { open, setOpen, data };
};
