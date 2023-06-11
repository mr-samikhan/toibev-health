import React from "react";
import { Grid, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

export default function MultipleAnswers({ data }) {
  console.log(data);
  return (
    <Grid container>
      {data?.map((answer) => (
        <Grid item mr={2}>
          <Grid container alignItems="center">
            <FiberManualRecordIcon sx={{ color: "#474747", width: "8px" }} />

            <Typography
              ml={1}
              sx={{
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "18px",

                color: "#474747",
              }}
            >
              {answer.description}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}
