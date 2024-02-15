import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import { Grid, Button, CircularProgress, Typography } from '@mui/material'

//imports
import icons from '../../assets'
import { useHealth } from './useHealth'
import { CustomTabs } from '../../components/Tabs'
import { CustomList } from '../../components/List'
import CustomCard from '../../components/CustomCrad'
import AlertDialog from '../../components/AlertDialog'
import CardListing from '../../components/CardListing'
import { TreatmentList } from './components/TreatmentList'
import { ProviderForm } from './components/Forms/ProviderForm'
import CustomTextfield from '../../components/CustomTextfield'
import { TreatmentResourceActions } from './components/Actions'
import { TreatmentForm } from './components/Forms/TreatmentForm'
import { Actions, TreatmentActions } from './components/Actions'
import { MedicationForm } from './components/Forms/MedicationForm'
import { GroupSessionForm } from './components/Forms/GroupSessionForm'
import GroupSessionCardActionButton, {
  MedicationCardActionButton,
} from './components/CardListActionButton'

export function Health() {
  const {
    tab,
    setTab,
    providers,
    medication,
    treatments,
    mobileMode,
    handleClick,
    groupSessions,
    openAddProvider,
    isLoadingProviders,
    isFetchingProviders,
    openMedicationForm,
    openTreatmentForm,
    treatDescription,
    isLoadingMedication,
    setOpenAddProvider,
    isLoadingTreatment,
    onDescripitonChange,
    openGroupSessionForm,
    setOpenTreatmentForm,
    isFetchingTreatment,
    setOpenMedicationForm,
    isFetchingMedication,
    isLoadingGroupSessions,
    isFetchingGroupSessions,
    setOpenGroupSessionForm,
    treatmentOptions,
  } = useHealth({})

  if (
    isLoadingProviders ||
    isFetchingProviders ||
    isFetchingGroupSessions ||
    isFetchingMedication ||
    isFetchingTreatment ||
    isLoadingGroupSessions ||
    isLoadingMedication ||
    isLoadingTreatment
  ) {
    return (
      <Grid container alignItems="center" justifyContent="center">
        <CircularProgress />
      </Grid>
    )
  }

  return (
    <>
      {openAddProvider && (
        <AlertDialog
          open={openAddProvider}
          setOpen={setOpenAddProvider}
          title={'Add Provider'}
          message={
            <ProviderForm setOpen={setOpenAddProvider} providers={providers} />
          }
        />
      )}
      {openGroupSessionForm && (
        <AlertDialog
          open={openGroupSessionForm}
          setOpen={setOpenGroupSessionForm}
          title={'Add Group Session'}
          message={
            <GroupSessionForm
              groupSessions={groupSessions}
              setOpen={setOpenGroupSessionForm}
            />
          }
        />
      )}
      {openMedicationForm && (
        <AlertDialog
          open={openMedicationForm}
          setOpen={setOpenMedicationForm}
          title={'Add Medication'}
          message={
            <MedicationForm
              medications={medication}
              setOpen={setOpenMedicationForm}
            />
          }
        />
      )}
      {openTreatmentForm && (
        <AlertDialog
          open={openTreatmentForm}
          setOpen={setOpenTreatmentForm}
          title={'Add Treatment'}
          message={
            <TreatmentForm
              data={treatments}
              setOpen={setOpenTreatmentForm}
              treatmentOptions={treatmentOptions}
            />
          }
        />
      )}

      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBottom: '16px' }}
      >
        <Grid item>
          <CustomTabs
            options={['Recovery', 'Providers']}
            setTab={setTab}
            tab={tab}
          />
        </Grid>
        {tab === 1 && (
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              startIcon={<AddIcon />}
              className="contained-button"
              onClick={handleClick}
            >
              {mobileMode ? '' : 'Add'}
            </Button>
          </Grid>
        )}
      </Grid>
      {tab === 0 && (
        <Grid container>
          <Grid item container columnSpacing={2}>
            <Grid item xs={12} sm={6}>
              <Grid
                container
                justifyContent={'space-between'}
                alignItems="center"
                mb={1}
              >
                <Typography className="recovery_title">
                  Group Sessions
                </Typography>
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<AddIcon />}
                  className="contained-button"
                  onClick={() => setOpenGroupSessionForm(true)}
                >
                  {mobileMode ? '' : 'Add Group Sessions'}
                </Button>
              </Grid>
              <Grid container>
                {/* <CustomCard isLoading={isLoadingServices ?? isFetchingServices}> */}
                <CustomCard>
                  <CardListing
                    list={groupSessions}
                    CardActionButton={({ data }) => (
                      <GroupSessionCardActionButton data={data} />
                    )}
                  />
                </CustomCard>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid
                container
                justifyContent={'space-between'}
                alignItems="center"
                mb={1}
              >
                <Typography className="recovery_title">Medication</Typography>
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<AddIcon />}
                  className="contained-button"
                  onClick={() => setOpenMedicationForm(true)}
                >
                  {mobileMode ? '' : 'Add Medication'}
                </Button>
              </Grid>
              <Grid container>
                <CustomCard>
                  <CardListing
                    list={medication}
                    CardActionButton={({ data }) => (
                      <MedicationCardActionButton data={data} />
                    )}
                  />
                </CustomCard>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            container
            justifyContent={'space-between'}
            alignItems="center"
            mb={1.5}
          >
            <Typography className="recovery_title">Treatment</Typography>
            <Button
              color="primary"
              variant="contained"
              startIcon={<AddIcon />}
              className="contained-button"
              onClick={() => setOpenTreatmentForm(true)}
            >
              {mobileMode ? '' : 'Add Treatment'}
            </Button>
          </Grid>
          <Grid item container>
            <CustomTextfield
              multiline
              rows={3}
              label="Treatment Description"
              defaultValue={treatDescription}
              onChange={onDescripitonChange}
            />
          </Grid>
          <TreatmentList
            list={treatments}
            icon={icons.peopleIcon}
            Actions={TreatmentActions}
            treatmentOptions={treatmentOptions}
            ResourceActions={TreatmentResourceActions}
          />
        </Grid>
      )}
      {tab === 1 && (
        <CustomList
          Actions={Actions}
          list={providers}
          icon={icons.peopleIcon}
        />
      )}
    </>
  )
}
