import React, { useState } from "react";

export default function useActionButtons() {
  const [open, setOpen] = useState(false);
  return { open, setOpen };
}
