import React from "react";
import { Button, Grid, CircularProgress } from "@mui/material";
import { CustomList } from "../../components/List";
import { CustomTabs } from "../../components/Tabs";
import AddIcon from "@mui/icons-material/Add";
import icons from "../../assets/index";
import { CultureActions, LanguageActions } from "./components/ActionButtons";
import TribeForm from "./components/TribeForm";
import { useLearn } from "./useLearn";
import LangugaeForm from "./components/Forms/LanguageForm";
import AlertDialog from "../../components/AlertDialog";
import ResilienceForm from "./components/Forms/ResilienceForm";
import ResiliencyItem from "./components/ResiliencyItem";
import CustomTextfield from "../../components/CustomTextfield";

export function Learn() {
  const {
    tab,
    setTab,
    open,
    setOpen,
    cultures,
    languages,
    handleClick,
    isLoadingCultures,
    isFetchingCultures,
    isLoadingLanguages,
    isFetchingLanguages,
    reseliency,
    isLoadingReseliency,
    isFetchingReseliency,
    mutate,
  } = useLearn();

  return (
    <>
      {tab === 0 && open && (
        <AlertDialog
          title="Add Culture"
          open={open}
          setOpen={setOpen}
          message={<TribeForm setOpen={setOpen} />}
        />
      )}

      {tab === 1 && open && (
        <AlertDialog
          title="Add Language"
          open={open}
          setOpen={setOpen}
          message={<LangugaeForm setOpen={setOpen} />}
        />
      )}
      {tab === 2 && open && (
        <AlertDialog
          title="Add Resilience"
          open={open}
          setOpen={setOpen}
          message={
            <ResilienceForm setOpen={setOpen} initialState={reseliency[0]} />
          }
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
      isLoadingLanguages ||
      isLoadingReseliency ||
      isFetchingReseliency ? (
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
              <CustomTextfield
                multiline
                rows={3}
                label="Resiliency Description"
                // value={reseliency[0]?.description}
                onChange={(e) => {
                  mutate({
                    description: e.target.value,
                  });
                }}
              />
              {reseliency[0]?.menu?.map((item) => (
                <ResiliencyItem data={item} />
              ))}
            </>
          )}
        </>
      )}
    </>
  );
}
