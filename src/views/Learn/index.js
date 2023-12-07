import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import { Button, Grid, CircularProgress } from '@mui/material'

//imports
import { useLearn } from './useLearn'
import icons from '../../assets/index'
import TribeForm from './components/TribeForm'
import { CustomList } from '../../components/List'
import { CustomTabs } from '../../components/Tabs'
import AlertDialog from '../../components/AlertDialog'
import ResiliencyItem from './components/ResiliencyItem'
import LangugaeForm from './components/Forms/LanguageForm'
import CustomTextfield from '../../components/CustomTextfield'
import ResilienceForm from './components/Forms/ResilienceForm'
import { CultureActions, LanguageActions } from './components/ActionButtons'

export function Learn() {
  const {
    tab,
    open,
    setTab,
    setOpen,
    cultures,
    languages,
    reseliency,
    mobileMode,
    onRowClick,
    handleClick,
    handleChange,
    isLoadingCultures,
    isFetchingCultures,
    isLoadingLanguages,
    isFetchingLanguages,
    isLoadingReseliency,
    isFetchingReseliency,
  } = useLearn()

  const [openTitleModal, setOpenTitleModal] = React.useState(false)
  const [isEdit, setIsEdit] = React.useState(false)
  const [title, setTitle] = React.useState(null)

  const onOpenMainModal = (title) => {
    setTitle(title)
    setOpenTitleModal(true)
    setIsEdit(true)
  }

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
      {openTitleModal && (
        <AlertDialog
          title="Update Resilience"
          open={openTitleModal}
          setOpen={setOpenTitleModal}
          message={
            <ResilienceForm
              setOpen={setOpen}
              isEdit={isEdit}
              title={title}
              initialState={reseliency[0]}
              setOpenTitleModal={setOpenTitleModal}
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
            options={['Culture', 'Language', 'Resiliency']}
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
            sx={{ position: 'relative' }}
            onClick={handleClick}
          >
            {mobileMode ? '' : 'Add'}
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
          <CircularProgress />
        </Grid>
      ) : (
        <>
          {tab === 0 && (
            <CustomList
              list={cultures}
              Actions={CultureActions}
              onRowClick={onRowClick}
            />
          )}
          {tab === 1 && (
            <CustomList
              list={languages}
              icon={icons.languageIcon}
              Actions={LanguageActions}
              onRowClick={onRowClick}
            />
          )}

          {tab === 2 && (
            <>
              <CustomTextfield
                multiline
                rows={3}
                onChange={handleChange}
                label="Resiliency Description"
                defaultValue={reseliency[0]?.description}
              />
              {reseliency[0]?.menu?.map((item) => (
                <ResiliencyItem
                  data={item}
                  onOpenMainModal={onOpenMainModal}
                  mobileMode={mobileMode}
                />
              ))}
            </>
          )}
        </>
      )}
    </>
  )
}
