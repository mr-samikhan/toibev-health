import React from "react";
import { Grid } from "@mui/material";
import { Wrapper } from "../../components/wrapper/Wrapper";
import { CustomList } from "../../components/list/CustomList";
import { CustomCard } from "../../components/card/CustomCard";
import { dummyCardList } from "mocks/dashboardMock";
import CommonTitle from "components/CommonTitle/Index";
import BasicTabs from "components/tabs";

export function Dashboard() {
  return (
    <>
      <Grid
        container
        spacing={3}
        sx={{ background: (theme) => theme.palette.primary.light }}
      >
        <Grid item xs={12}>
          <CommonTitle title="General" />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {dummyCardList.map((card, index) => {
              return (
                <Grid item xs={12} sm={6} md={3}>
                  <CustomCard variant="rounded" key={index} cardData={card} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Wrapper>{""}</Wrapper>
        </Grid>
        <Grid item xs={12} md={6}>
          <CommonTitle title="Events" />
          <Wrapper>
            <CustomList />
          </Wrapper>
        </Grid>
        <Grid item xs={12} md={6}>
          <CommonTitle title="Resources" />
          <Wrapper>
            <CustomList />
          </Wrapper>
        </Grid>
        <Grid item xs={12} md={6}>
          <CommonTitle title="Geographic" />
          <Wrapper>
            <CustomList />
          </Wrapper>
        </Grid>
        <Grid item xs={12} md={6}>
          <CommonTitle title="Surveys" />
          <Wrapper>
            {/* <CustomList /> */}
            <BasicTabs />
          </Wrapper>
        </Grid>
      </Grid>
    </>
  );
}
