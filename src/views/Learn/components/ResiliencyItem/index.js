import React from 'react'
import { Button, Grid } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

//imports
import icons from '../../../../assets/index'
import { CustomList } from '../../../../components/List'
import { ListItem } from '../../../../components/ListItem'
import { ResilienceySubCatActions } from '../ActionButtons'
import AlertDialog from '../../../../components/AlertDialog'
import { ListTitle } from '../../../../components/ListTitile'
import ResiliencySubCatForm from '../Forms/ResiliencySubCatForm'
import { useResiliencyCatrgory } from '../../hook/useResiliencyCatrgory'

export default function ResiliencyItem({ data, mobileMode, onOpenMainModal }) {
  const {
    open,
    setOpen,
    data: subCats,
    isFetching,
    isLoading,
  } = useResiliencyCatrgory({ cat: data?.value })
  return (
    <>
      <AlertDialog
        open={open}
        setOpen={setOpen}
        title="Add Sub-Category"
        message={<ResiliencySubCatForm setOpen={setOpen} cat={data?.value} />}
      />
      <Grid container>
        <Grid item xs={12} sx={{ margin: '40px 0px' }}>
          <ListItem
            title={data?.title}
            startIcon={icons.clockIcon}
            endIcon={icons.editIcon}
            onOpenMainModal={onOpenMainModal}
          />
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: '24px' }}>
          <Grid container justifyContent="space-between" flexWrap={'nowrap'}>
            <Grid item flexGrow={1} xs={10}>
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
                {mobileMode ? '' : 'Add Additional Resources'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {isFetching || isLoading ? (
          'Loading...'
        ) : (
          <Grid item xs={12}>
            <CustomList
              icon={icons.clipboardIcon}
              noData="No History Sub-Categories Added"
              Actions={ResilienceySubCatActions}
              list={subCats}
              cat={data?.value}
            />
          </Grid>
        )}
      </Grid>
    </>
  )
}
