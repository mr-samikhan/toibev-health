import React from "react";
import { Button, Grid, CircularProgress } from "@mui/material";
import { CustomList } from "../../components/List";
import { CustomTabs } from "../../components/Tabs";
import AddIcon from "@mui/icons-material/Add";
import icons from "../../assets/index";
import { ListItem } from "../../components/ListItem";
import { ListTitle } from "../../components/ListTitile";
import { CultureActions, LanguageActions } from "./components/ActionButtons";
import TribeForm from "./components/TribeForm";
import CustomMenu from "../../components/CustomMenu";
import { useLearn } from "./useLearn";
import LangugaeForm from "./components/Forms/LanguageForm";
import HistoryForm from "./components/Forms/HistoryForm";
import AlertDialog from "../../components/AlertDialog";

export function Learn() {
  const {
    tab,
    setTab,
    open,
    setOpen,
    anchorEl,
    cultures,
    languages,
    handleClick,
    handleClose,
    isLoadingCultures,
    isFetchingCultures,
    isLoadingLanguages,
    isFetchingLanguages,
  } = useLearn();

  return (
    <>
      {tab === 0 && open && (
        <CustomMenu
          open={open}
          setOpen={setOpen}
          title="Add Tribe"
          anchorEl={anchorEl}
          handleClose={handleClose}
          sx={{ marginTop: 2 }}
        >
          <TribeForm setOpen={setOpen} />
        </CustomMenu>
      )}
      {tab === 1 && open && (
        <CustomMenu
          open={open}
          setOpen={setOpen}
          title="Add Language"
          anchorEl={anchorEl}
          handleClose={handleClose}
          sx={{ marginTop: 2 }}
        >
          <LangugaeForm setOpen={setOpen} />
        </CustomMenu>
      )}
      {tab === 2 && open && (
        // <CustomMenu
        //   open={open}
        //   setOpen={setOpen}
        //   title="Add Language"
        //   anchorEl={anchorEl}
        //   handleClose={handleClose}
        //   sx={{ marginTop: 2 }}
        // >
        //   <LangugaeForm setOpen={setOpen} />
        // </CustomMenu>
        <AlertDialog
          open={open}
          setOpen={setOpen}
          title="Add History"
          message={<HistoryForm setOpen={setOpen} />}
        />
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

      {isLoadingCultures ||
      isFetchingCultures ||
      isFetchingLanguages ||
      isLoadingLanguages ? (
        <Grid container justifyContent="center">
          {" "}
          <CircularProgress />
        </Grid>
      ) : (
        <>
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
              Actions={LanguageActions}
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
      )}
    </>
  );
}
