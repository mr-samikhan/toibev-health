import React from "react";
import { Button, Grid } from "@mui/material";
import { CustomList } from "../../../../components/List";
import AddIcon from "@mui/icons-material/Add";
import icons from "../../../../assets/index";
import { ListItem } from "../../../../components/ListItem";
import { ListTitle } from "../../../../components/ListTitile";
import AlertDialog from "../../../../components/AlertDialog";
import { useResiliencyCatrgory } from "../../hook/useResiliencyCatrgory";
import ResiliencySubCatForm from "../Forms/ResiliencySubCatForm";
import { ResilienceySubCatActions } from "../ActionButtons";

export default function ResiliencyItem({ data }) {
  const {
    open,
    setOpen,
    data: subCats,
    isFetching,
    isLoading,
  } = useResiliencyCatrgory({ cat: data?.value });

  return (
    <>
      <AlertDialog
        open={open}
        setOpen={setOpen}
        title="Add Sub-Category"
        message={<ResiliencySubCatForm setOpen={setOpen} cat={data?.value} />}
      />
      <Grid container>
        <Grid item sm={12} sx={{ margin: "40px 0px" }}>
          <ListItem
            title={data?.title}
            startIcon={icons.clockIcon}
            endIcon={icons.editIcon}
          />
        </Grid>
        <Grid item sm={12} sx={{ marginBottom: "24px" }}>
          {" "}
          <Grid container justifyContent="space-between">
            <Grid item>
              {" "}
              <ListTitle
                title={`${data?.title} Sub-Categories`}
                icon={icons.documentIcon}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                className="contained-button"
                startIcon={<AddIcon />}
                onClick={() => setOpen(true)}
              >
                Add Additional Resources
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {isFetching || isLoading ? (
          "Loading..."
        ) : (
          <Grid item sm={12}>
            <CustomList
              icon={icons.clipboardIcon}
              noData="No History Sub-Categories Added"
              Actions={ResilienceySubCatActions}
              list={subCats}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
}
