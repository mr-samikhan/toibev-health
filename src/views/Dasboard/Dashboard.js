import React from "react";
import { CircularProgress, Grid, Typography } from "@mui/material";

//imports
import icons from "../../assets/index";
import { useDashboard } from "./useDashboard";
import StatsCard from "./components/StatsCard";
import CustomCarousel from "../../components/Carousel";
import DashboardListing from "./components/DashboardListing";

export function Dashboard() {
  const {
    tab,
    users,
    setTab,
    events,
    reseliency,
    conditions,
    onTabClick,
    isLoadingUsers,
    isFetchingUsers,
    surveyConditions,
    assessmentOptions,
    isLoadingResources,
    isLoadingGeography,
    isFechingResources,
    isFechingConditions,
    isLoadingConditions,
    isFetchingGeography,
    isLoadingAssessments,
    isFetchingAssessments,
    isLoadingSurveyConditions,
    groupedProvidersByLocation,
    isFetchingSurveyConditions,
    totalScheduledAppointments,
  } = useDashboard({});

  if (
    isLoadingUsers ||
    isFetchingUsers ||
    isFetchingGeography ||
    isLoadingResources ||
    isFechingResources ||
    isLoadingAssessments ||
    isFetchingAssessments
  ) {
    return (
      <Grid container alignItems="center" justifyContent="center">
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Grid className="dashboard">
      <Grid container flexDirection="column" className="section" mb={3}>
        <Grid item mb={1}>
          <Typography className="heading">General</Typography>
        </Grid>

        <Grid item xs={12}>
          <CustomCarousel>
            <StatsCard
              count={totalScheduledAppointments || 0}
              title="Scheduled Appointments"
              icon={icons.statsAppointmentIcon}
            />

            <StatsCard
              count={events?.length}
              icon={icons.statsCalendarIcon}
              title="Scheduled Calendar Events"
            />

            <StatsCard
              count={users?.length}
              title="Registered Users"
              icon={icons.statsUsersIcon}
            />

            <StatsCard
              title="Views"
              count={"3,548"}
              icon={icons.statsViewsIcon}
            />
          </CustomCarousel>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Grid container flexDirection="column" className="section" mb={3}>
            <Grid item mb={1}>
              <Typography className="heading">Events</Typography>
            </Grid>
            <Grid item>
              <DashboardListing list={events} listing={"events"} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container flexDirection="column" className="section" mb={3}>
            <Grid item mb={1}>
              <Typography className="heading">Resources</Typography>
            </Grid>
            <Grid item>
              <DashboardListing list={reseliency && reseliency[0]?.menu} />
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <Grid container flexDirection="column" className="section" mb={3}>
            <Grid item mb={1}>
              <Typography className="heading">Location</Typography>
            </Grid>
            <Grid item>
              <DashboardListing
                list={groupedProvidersByLocation}
                isLoading={isLoadingGeography}
              />
            </Grid>
          </Grid>
        </Grid> */}
        {/* <Grid item xs={12} md={6}>
          <Grid container flexDirection="column" className="section" mb={3}>
            <Grid item mb={1} sx={{ maxWidth: '100%' }}>
              <Typography className="heading">Surveys</Typography>
            </Grid>
            <Grid item sx={{ maxWidth: '100%' }}>
              <DashboardListing
                list={conditions ?? surveyConditions}
                listing="surveys"
                isLoading={
                  isLoadingConditions ||
                  isFechingConditions ||
                  isFetchingSurveyConditions ||
                  isLoadingSurveyConditions
                }
                tabs={
                  <CustomTabs
                    tab={tab}
                    setTab={setTab}
                    onClick={onTabClick}
                    options={assessmentOptions ?? []}
                  />
                }
              />
            </Grid>
          </Grid>
        </Grid> */}
      </Grid>
    </Grid>
  );
}
