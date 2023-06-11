import React, { useState } from "react";

export default function useActions() {
  const [open, setOpen] = useState(false);

  return { open, setOpen };
}
