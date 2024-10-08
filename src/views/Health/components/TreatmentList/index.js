import React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Grid from '@mui/material/Grid'
import { Alert, Chip, CircularProgress } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
import Accordion from '@mui/material/Accordion'
import Typography from '@mui/material/Typography'

//imports
import './list.scss'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import CustomTextfield from '../../../../components/CustomTextfield'
import useTreatmentResourceForm from '../../hooks/useTreatmentResourceForm'
import { useGetTreatmentOptions } from '../../../../hooks/useGetTreatmentOptions'

const Paper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}))

export function TreatmentList({
  list = [],
  icon,
  Actions,
  ResourceActions,
  treatmentOptions,
}) {
  const [expanded, setExpanded] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState(null)

  const {
    updateIt,
    treatDescription,
    setTreatDescription,
    updateTreatLoading,
  } = useTreatmentResourceForm({})

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={12}>
          <Paper>
            {list?.length === 0 ? (
              <Alert sx={{ mt: 2 }} severity="error">
                No data found!
              </Alert>
            ) : (
              <List dense={false} className="listing">
                {list?.map((item, index) => (
                  <Accordion
                    expanded={expanded === `panel${index + 1}`}
                    onChange={handleChange(`panel${index + 1}`)}
                    className="listing-item"
                    sx={{
                      '&.MuiAccordion-root:before': {
                        display: 'none',
                      },
                    }}
                  >
                    <AccordionSummary
                      sx={{
                        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded':
                          {
                            transform: 'rotate(0deg)',
                          },
                      }}
                      expandIcon={
                        <Actions
                          data={item}
                          setSelectedId={setSelectedId}
                          treatmentOptions={treatmentOptions}
                          setTreatDescription={setTreatDescription}
                          expanded={expanded === `panel${index + 1}`}
                        />
                      }
                    >
                      <Grid container alignItems="center" columnSpacing={2}>
                        <Grid item>
                          <Avatar className={'avatar'}>
                            <img src={icon ?? item.icon} alt="icon" />
                          </Avatar>
                        </Grid>
                        <Grid item>
                          <Typography className="primary-text">
                            {item?.title}
                          </Typography>
                        </Grid>
                      </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container>
                        <Grid item xs={12} mb={2.5}>
                          {selectedId === item.id && (
                            <>
                              <CustomTextfield
                                multiline
                                rows={3}
                                label="Description"
                                value={treatDescription}
                                onChange={(e) => {
                                  setTreatDescription(e.target.value)
                                }}
                              />
                              <Box
                                textAlign="center"
                                mt={2}
                                onClick={() =>
                                  updateIt(treatDescription, item.id)
                                }
                              >
                                <Chip
                                  label={
                                    updateTreatLoading ? 'Loading...' : 'Update'
                                  }
                                  sx={{ cursor: 'pointer' }}
                                  disabled={
                                    updateTreatLoading ||
                                    treatDescription?.length === 0 ||
                                    ''
                                  }
                                />
                              </Box>
                            </>
                          )}
                        </Grid>
                        <Grid item container columnSpacing={6} rowSpacing={2}>
                          {selectedId === item.id && (
                            <TreatmentResource
                              index={index}
                              treatment={item}
                              icon={item?.cover_img || icon}
                              ResourceActions={ResourceActions}
                              treatmentOptions={treatmentOptions}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export const TreatmentResource = ({
  icon,
  treatment,
  ResourceActions,
  treatmentOptions,
}) => {
  const { data, isLoading } = useGetTreatmentOptions({
    id: treatment?.id,
  })

  if (isLoading) {
    return (
      <Grid container alignItems="center" justifyContent="center">
        <CircularProgress />
      </Grid>
    )
  }

  return (
    <>
      {isLoading ? (
        'Loading...'
      ) : !data?.length ? (
        <Typography textAlign="center" width="100%">
          No data found!
        </Typography>
      ) : (
        data?.map((resource, index) => (
          <Grid item xs={6}>
            {index !== 0 && index !== 1 && (
              <div
                className="itemDivider"
                style={{ marginBottom: '16px' }}
              ></div>
            )}

            <Grid
              container
              justifyContent={'space-between'}
              alignItems="center"
            >
              <Grid item>
                <Grid container columnSpacing={1.5} alignItems="center">
                  <Grid item>
                    <Avatar className={'avatar-small'}>
                      <img src={resource?.cover_img || icon} alt="treat-icon" />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Typography className="primary-text">
                      {resource?.title}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className="list-action">
                <ResourceActions
                  data={resource}
                  allData={data}
                  resource={resource}
                  treatment={treatment}
                  treatmentOptions={treatmentOptions}
                />
              </Grid>
            </Grid>
          </Grid>
        ))
      )}
    </>
  )
}
