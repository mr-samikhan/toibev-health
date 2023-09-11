import React from "react";
import { CircularProgress, Grid, Typography } from "@mui/material";
import StatsCard from "./components/StatsCard";
import icons from "../../assets/index";
import DashboardListing from "./components/DashboardListing";
import CustomCarousel from "../../components/Carousel";
import { CustomTabs } from "../../components/Tabs";
import { useDashboard } from "./useDashboard";

export function Dashboard() {
  const {
    tab,
    setTab,
    events,
    reseliency,
    assessmentOptions,
    onTabClick,
    conditions,
    isLoadingConditions,
    groupedProvidersByLocation,
    isLoadingGeography,
    surveyConditions,
    isLoadingSurveyConditions,
    users,
    isFechingConditions,
    isFetchingSurveyConditions,
    isLoadingUsers,
    isFetchingUsers,
    isFetchingGeography,
    isLoadingResources,
    isFechingResources,
    isLoadingAssessments,
    isFetchingAssessments,
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
              title="Scheduled Appointments"
              count={"2,000"}
              icon={icons.statsAppointmentIcon}
            />

            <StatsCard
              title="Scheduled Calendar Events"
              count={events?.length}
              icon={icons.statsCalendarIcon}
            />

            <StatsCard
              title="Registered Users"
              count={users?.length}
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
          {" "}
          <Grid container flexDirection="column" className="section" mb={3}>
            {" "}
            <Grid item mb={1}>
              <Typography className="heading">Events</Typography>
            </Grid>
            <Grid item>
              {" "}
              <DashboardListing list={events} listing={"events"} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          {" "}
          <Grid container flexDirection="column" className="section" mb={3}>
            {" "}
            <Grid item mb={1}>
              <Typography className="heading">Resources</Typography>
            </Grid>
            <Grid item>
              <DashboardListing list={reseliency && reseliency[0]?.menu} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          {" "}
          <Grid container flexDirection="column" className="section" mb={3}>
            {" "}
            <Grid item mb={1}>
              <Typography className="heading">Geographic</Typography>
            </Grid>
            <Grid item>
              <DashboardListing
                list={groupedProvidersByLocation}
                isLoading={isLoadingGeography}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          {" "}
          <Grid container flexDirection="column" className="section" mb={3}>
            {" "}
            <Grid item mb={1} sx={{ maxWidth: "100%" }}>
              <Typography className="heading">Surveys</Typography>
            </Grid>
            <Grid item sx={{ maxWidth: "100%" }}>
              <DashboardListing
                list={conditions ?? surveyConditions}
                listing="surveys"
                isLoading={
                  isLoadingConditions ||
                  isLoadingSurveyConditions ||
                  isFechingConditions ||
                  isFetchingSurveyConditions
                }
                tabs={
                  <CustomTabs
                    options={assessmentOptions ?? []}
                    setTab={setTab}
                    tab={tab}
                    onClick={onTabClick}
                  />
                }
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
