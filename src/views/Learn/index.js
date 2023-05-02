import React, { useState } from "react";
import { Button, Grid, Avatar, Typography, IconButton } from "@mui/material";
import { CustomList } from "../../components/List";
import { CustomTabs } from "../../components/Tabs";
import AddIcon from "@mui/icons-material/Add";
import icons from "../../assets/index";
import { ListItem } from "../../components/ListItem";
import { ListTitle } from "../../components/ListTitile";
import { CultureActions } from "./components/ActionButtons";
import AlertDialog from "../../components/AlertDialog";
import TribeForm from "./components/TribeForm";

const cultureList = [
  {
    title: "ABC",
    subtitle: "Get out in front of this addiction",
    tribeName: "NAME OF TRIBE",
  },
  {
    title: "ABC",
    subtitle: "Get out in front of this addiction",
    tribeName: "NAME OF TRIBE",
  },
  {
    title: "ABC",
    subtitle: "Get out in front of this addiction",
    tribeName: "NAME OF TRIBE",
  },
  {
    title: "ABC",
    subtitle: "Get out in front of this addiction",
    tribeName: "NAME OF TRIBE",
  },
  {
    title: "ABC",
    subtitle: "Get out in front of this addiction",
    tribeName: "NAME OF TRIBE",
  },
  {
    title: "ABC",
    subtitle: "Get out in front of this addiction",
    tribeName: "NAME OF TRIBE",
  },
  {
    title: "ABC",
    subtitle: "Get out in front of this addiction",
    tribeName: "NAME OF TRIBE",
  },
  {
    title: "ABC",
    subtitle: "Get out in front of this addiction",
    tribeName: "NAME OF TRIBE",
  },
  {
    title: "ABC",
    subtitle: "Get out in front of this addiction",
    tribeName: "NAME OF TRIBE",
  },
  {
    title: "ABC",
    subtitle: "Get out in front of this addiction",
    tribeName: "NAME OF TRIBE",
  },
  {
    title: "ABC",
    subtitle: "Get out in front of this addiction",
    tribeName: "NAME OF TRIBE",
  },
  {
    title: "ABC",
    subtitle: "Get out in front of this addiction",
    tribeName: "NAME OF TRIBE",
  },
  {
    title: "ABC",
    subtitle: "Get out in front of this addiction",
    tribeName: "NAME OF TRIBE",
  },
  {
    title: "ABC",
    subtitle: "Get out in front of this addiction",
    tribeName: "NAME OF TRIBE",
  },
  {
    title: "ABC",
    subtitle: "Get out in front of this addiction",
    tribeName: "NAME OF TRIBE",
  },
  {
    title: "ABC",
    subtitle: "Get out in front of this addiction",
    tribeName: "NAME OF TRIBE",
  },
];

export function Learn() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
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
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {" "}
            Add
          </Button>
          {open && (
            <AlertDialog
              open={open}
              setOpen={setOpen}
              title="Add Tribe"
              message={<TribeForm />}
            />
          )}
        </Grid>
      </Grid>
      {tab === 0 && (
        <CustomList
          list={cultureList}
          icon={tab === 0 ? icons.peopleIcon : icons.languageIcon}
          Actions={CultureActions}
        />
      )}
      {tab === 1 && (
        <CustomList
          // list={list}
          icon={tab === 0 ? icons.peopleIcon : icons.languageIcon}
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
