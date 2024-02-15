import React from 'react'
import { Controller } from 'react-hook-form'
import { Box, Grid, Typography } from '@mui/material'

//imports
import './style.scss'
import useClinicForm from '../../../hooks/useClinicForm'
import ImageUploader from '../../../../../components/MediaUpload'
import CustomButton from '../../../../../components/CustomButton'
import CustomTextfield from '../../../../../components/CustomTextfield'
import { ReactComponent as SMSIcon } from '../../../../../assets/icons/sms.svg'
import { ReactComponent as PhoneIcon } from '../../../../../assets/icons/phone.svg'
import { ReactComponent as LocationIcon } from '../../../../../assets/icons/location.svg'
import { ReactComponent as ButterflyIcon } from '../../../../../assets/icons/butterfly.svg'
import { ReactComponent as DepartmentIcon } from '../../../../../assets/icons/tag-user.svg'

export default function ClinicForm({ initialState, isEdit, setOpen, clinics }) {
  const {
    errors,
    control,
    onSubmit,
    isLoading,
    departments,
    handleChange,
    mutateDelete,
    handleSubmit,
    addDepartment,
    isLoadingDelete,
    selectedImageOne,
    selectedImageTwo,
    setSelectedImageOne,
    setSelectedImageTwo,
  } = useClinicForm({ setOpen, initialState, isEdit, clinics })
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className="clinic-form"
    >
      <Grid container>
        <Grid item xs={12} mb={3}>
          <Controller
            name="title"
            control={control}
            rules={{ required: 'Clinic name is required' }}
            render={({ field }) => (
              <CustomTextfield
                {...field}
                label="Clinic Name"
                error={errors.title}
                EndIcon={ButterflyIcon}
                placeholder="Enter clinic name"
                errorMessage={errors?.title?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          <Controller
            name="address"
            control={control}
            rules={{ required: 'Clinic Address is required' }}
            render={({ field }) => (
              <CustomTextfield
                {...field}
                label="Clinic Address"
                EndIcon={LocationIcon}
                error={errors.address}
                placeholder="Enter clinic's address"
                errorMessage={errors?.address?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          <Controller
            name="email"
            control={control}
            rules={{ required: 'Clinic Email is required' }}
            render={({ field }) => (
              <CustomTextfield
                {...field}
                EndIcon={SMSIcon}
                error={errors.email}
                label="Clinic Email Address"
                errorMessage={errors?.email?.message}
                placeholder="Enter clinic’s email address"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container className="departments-container">
            <Typography className="title" mb={2}>
              Departments
            </Typography>
            {departments.map((department, index) => (
              <Grid
                container
                item
                xs={12}
                className="departments-wrapper"
                p={2}
                mb={3}
              >
                <Grid item xs={12} mt={2}>
                  <CustomTextfield
                    label="Department Name"
                    placeholder="Enter department name"
                    value={department.name}
                    onChange={(e) => {
                      handleChange(e, index, 'name')
                    }}
                    EndIcon={DepartmentIcon}
                  />
                </Grid>
                <Grid container item xs={12} mt={2} spacing={2}>
                  <Grid item xs={6}>
                    <CustomTextfield
                      label="Phone 1"
                      placeholder="Enter phone"
                      value={department.phone1}
                      onChange={(e) => {
                        handleChange(e, index, 'phone1')
                      }}
                      EndIcon={PhoneIcon}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextfield
                      label="Phone 2 (optional)"
                      placeholder="Enter phone"
                      value={department.phone2}
                      onChange={(e) => {
                        handleChange(e, index, 'phone2')
                      }}
                      EndIcon={PhoneIcon}
                    />
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} mb={3}>
          <CustomButton variant="outlined" onClick={addDepartment}>
            Add Department
          </CustomButton>
        </Grid>

        <Grid item xs={12} mb={3}>
          <Typography variant="h6" mb={2}>
            Add Photos
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ImageUploader
                fileType="image"
                selectedFile={selectedImageOne}
                setSelectedFile={setSelectedImageOne}
              />
            </Grid>
            <Grid item xs={6}>
              <ImageUploader
                fileType="image"
                selectedFile={selectedImageTwo}
                setSelectedFile={setSelectedImageTwo}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <CustomButton variant="contained" type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : isEdit ? 'Edit Clinic' : 'Add Clinic'}
          </CustomButton>
        </Grid>
        {isEdit && (
          <Grid item xs={12} mt={2}>
            <CustomButton
              variant="outlined"
              disabled={isLoadingDelete}
              onClick={() => mutateDelete(initialState?.id)}
            >
              {isLoadingDelete ? 'Loading...' : 'Delete Clinic'}
            </CustomButton>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
