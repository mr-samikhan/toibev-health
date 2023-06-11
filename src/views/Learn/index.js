import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import { CustomList } from "../../components/List";
import { CustomTabs } from "../../components/Tabs";
import AddIcon from "@mui/icons-material/Add";
import icons from "../../assets/index";
import { ListItem } from "../../components/ListItem";
import { ListTitle } from "../../components/ListTitile";
import { CultureActions } from "./components/ActionButtons";
import TribeForm from "./components/TribeForm";
import CustomMenu from "../../components/CustomMenu";
import { useGetCultures } from "../../hooks/useGetCultures";
import { useGetLanguages } from "../../hooks/useGetLanguages";

export function Learn() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { cultures } = useGetCultures({});
  const { languages } = useGetLanguages({});
  const handleClick = (event) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  return (
    <>
      {open && (
        <CustomMenu
          open={open}
          setOpen={setOpen}
          title="Add Tribe"
          anchorEl={anchorEl}
          handleClose={handleClose}
          sx={{ marginTop: 2 }}
        >
          <TribeForm />
        </CustomMenu>
      )}
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBottom: "16px" }}
      >
        <Grid item>
          {" "}
          <CustomTabs
            options={["Culture", "Language", "Resiliency"]}
            setTab={setTab}
            tab={tab}
          />
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            startIcon={<AddIcon />}
            className="contained-button"
            sx={{ position: "relative" }}
            onClick={handleClick}
          >
            {" "}
            Add
          </Button>
        </Grid>
      </Grid>
      {tab === 0 && (
        <CustomList
          list={cultures}
          icon={icons.peopleIcon}
          Actions={CultureActions}
        />
      )}
      {tab === 1 && (
        <CustomList
          list={languages}
          icon={icons.languageIcon}
          // Actions={Actions}
        />
      )}
      {tab === 2 && (
        <>
          {[1, 2, 3].map((i) => (
            <Grid container>
              <Grid item sm={12} sx={{ margin: "40px 0px" }}>
                <ListItem
                  title={"History Sub-Categories"}
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
                      title="History Sub-Categories"
                      icon={icons.documentIcon}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      className="contained-button"
                      startIcon={<AddIcon />}
                    >
                      Add Additional Resources
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={12}>
                <CustomList
                  icon={icons.clipboardIcon}
                  // Actions={Actions}
                  // list={list}
                />
              </Grid>
            </Grid>
          ))}
        </>
      )}
    </>
  );
}
