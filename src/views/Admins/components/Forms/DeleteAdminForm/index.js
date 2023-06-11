import { Typography } from "@mui/material";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { Grid, Box } from "@mui/material";
import CustomButton from "../../../../../components/CustomButton";
import { deleteAdmin } from "../../../actions";
import useDeleteAdmin from "../../../hooks/useDeleteAdmin";

export default function DeleteAdminForm({ data }) {
  const { handleSubmit, onSubmit, isLoading } = useDeleteAdmin({ data });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12} mb={3}>
          <Typography>Are you sure you want to delete admin?</Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomButton variant="contained" type="submit">
            Delete
          </CustomButton>
        </Grid>
      </Grid>
    </Box>
  );
}
