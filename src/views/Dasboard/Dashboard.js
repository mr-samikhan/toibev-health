import React from "react";
import { Grid, Typography } from "@mui/material";
import StatsCard from "./components/StatsCard";
import icons from "../../assets/index";
import DashboardListing from "./components/DashboardListing";
import CustomCarousel from "../../components/Carousel";
import { CustomTabs } from "../../components/Tabs";
import { useDashboard } from "./useDashboard";

const list1 = [
  {
    title: "Road Run 2020",
    count: "Road Run 2020",
    image: icons.statsUsersIcon,
  },
  {
    title: "Road Run 2020",
    count: "Road Run 2020",
    image: icons.statsUsersIcon,
  },
  {
    title: "Road Run 2020",
    count: "Road Run 2020",
    image: icons.statsUsersIcon,
  },
  {
    title: "Road Run 2020",
    count: "Road Run 2020",
    image: icons.statsUsersIcon,
  },
  {
    title: "Road Run 2020",
    count: "Road Run 2020",
    image: icons.statsUsersIcon,
  },
  {
    title: "Road Run 2020",
    count: "Road Run 2020",
    image: icons.statsUsersIcon,
  },
  {
    title: "Road Run 2020",
    count: "Road Run 2020",
    image: icons.statsUsersIcon,
  },
  {
    title: "Road Run 2020",
    count: "Road Run 2020",
    image: icons.statsUsersIcon,
  },
  {
    title: "Road Run 2020",
    count: "Road Run 2020",
    image: icons.statsUsersIcon,
  },
  {
    title: "Road Run 2020",
    count: "Road Run 2020",
    image: icons.statsUsersIcon,
  },
];

export function Dashboard() {
  const { tab, setTab, events, reseliency, assessmentOptions } = useDashboard(
    {}
  );

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
              count={920}
              icon={icons.statsCalendarIcon}
            />

            <StatsCard
              title="Registered Users"
              count={"1,240"}
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
        <Grid item md={6}>
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
        <Grid item md={6}>
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
        <Grid item md={6}>
          {" "}
          <Grid container flexDirection="column" className="section" mb={3}>
            {" "}
            <Grid item mb={1}>
              <Typography className="heading">Geographic</Typography>
            </Grid>
            <Grid item>
              <DashboardListing list={list1} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6}>
          {" "}
          <Grid container flexDirection="column" className="section" mb={3}>
            {" "}
            <Grid item mb={1} sx={{ maxWidth: "100%" }}>
              <Typography className="heading">Surveys</Typography>
            </Grid>
            <Grid item sx={{ maxWidth: "100%" }}>
              <DashboardListing
                list={list1}
                listing="surveys"
                tabs={
                  <CustomTabs
                    options={assessmentOptions ?? []}
                    setTab={setTab}
                    tab={tab}
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
