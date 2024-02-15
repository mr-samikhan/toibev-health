import React from 'react'
import {
  Grid,
  Button,
  Typography,
  useMediaQuery,
  CircularProgress,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
//imports
import './style.scss'
import { useInformation } from './useInformation'
import CustomCard from '../../components/CustomCrad'
import CardListing from '../../components/CardListing'
import AlertDialog from '../../components/AlertDialog'
import ClinicForm from './components/Forms/ClinicForm'
import ServiceForm from './components/Forms/ServiceForm'
import CustomTextfield from '../../components/CustomTextfield'
import SocialMediaForm from './components/Forms/SocialMediaForm.js'
import CardActionButton, {
  ClinicCardActionButton,
} from './components/CardListActionButton'

export function Information() {
  const {
    urls,
    open,
    setOpen,
    clinics,
    services,
    description,
    handleChange,
    openClinicForm,
    isLoadingClinics,
    isFetchingClinics,
    isLoadingServices,
    isFetchingServices,
    setOpenClinicForm,
  } = useInformation()
  const mobile = useMediaQuery('(max-width:600px)')
  if (
    isLoadingClinics ||
    isFetchingClinics ||
    isLoadingServices ||
    isFetchingServices
  ) {
    return (
      <Grid container alignItems="center" justifyContent="center">
        <CircularProgress />
      </Grid>
    )
  }

  return (
    <>
      {open && (
        <AlertDialog
          open={open}
          title="Add Service"
          setOpen={setOpen}
          message={
            <ServiceForm
              setOpen={setOpen}
              clinics={clinics}
              services={services}
            />
          }
        />
      )}
      {openClinicForm && (
        <AlertDialog
          open={openClinicForm}
          title="Add Clinic"
          setOpen={setOpenClinicForm}
          message={<ClinicForm setOpen={setOpenClinicForm} clinics={clinics} />}
        />
      )}
      <Grid container justifyContent="space-between" alignItems="center" mb={3}>
        <Grid item>
          <Typography className="information-title">Services</Typography>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            startIcon={<AddIcon />}
            className="contained-button"
            onClick={() => {
              setOpen(true)
            }}
          >
            {!mobile && 'Add Service'}
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          {mobile ? (
            <CustomCard noSearch>
              <Grid px={2} pt={1}>
                <CustomTextfield
                  multiline
                  sx={{
                    '& .MuiInputBase-input': {
                      minHeight: '368px',
                      padding: '16px',
                    },
                  }}
                  label="Services Description"
                  value={description}
                />
              </Grid>
            </CustomCard>
          ) : (
            <CustomTextfield
              multiline
              sx={{
                '& .MuiInputBase-input': {
                  minHeight: '368px',
                  padding: '16px',
                },
              }}
              label="Services Description"
              value={description}
              onChange={handleChange}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CustomCard isLoading={isLoadingServices ?? isFetchingServices}>
            <CardListing
              list={services}
              CardActionButton={({ data }) => (
                <CardActionButton data={data} clinics={clinics} />
              )}
            />
          </CustomCard>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CustomCard
            heading="Clinics"
            isLoading={isLoadingClinics ?? isFetchingClinics}
            buttonText="Add Clinic"
            buttonAction={() => {
              setOpenClinicForm(true)
            }}
          >
            <CardListing
              list={clinics}
              CardActionButton={ClinicCardActionButton}
            />
          </CustomCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomCard heading="Toiyabe Social" noSearch>
            <SocialMediaForm urls={urls} />
          </CustomCard>
        </Grid>
      </Grid>
    </>
  )
}
