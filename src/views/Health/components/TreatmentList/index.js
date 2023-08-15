import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Alert } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import CustomTextfield from "../../../../components/CustomTextfield";
import "./list.scss";
import { useGetTreatmentOptions } from "../../../../hooks/useGetTreatmentOptions";

const Paper = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export function TreatmentList({ list = [], icon, Actions, ResourceActions }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
                  >
                    <AccordionSummary
                      sx={{
                        "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded":
                          {
                            transform: "rotate(0deg)",
                          },
                      }}
                      expandIcon={
                        <Actions
                          data={item}
                          expanded={expanded === `panel${index + 1}`}
                        />
                      }
                    >
                      <Grid container alignItems="center" columnSpacing={2}>
                        <Grid item>
                          {" "}
                          <Avatar className={"avatar"}>
                            {" "}
                            <img src={icon ?? item.icon} />
                          </Avatar>
                        </Grid>
                        <Grid item>
                          {" "}
                          <Typography className="primary-text">
                            {item?.title}
                          </Typography>
                        </Grid>
                      </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container>
                        <Grid item xs={12} mb={2.5}>
                          <CustomTextfield
                            multiline
                            rows={3}
                            label="MAT Description"
                          />
                        </Grid>
                        <Grid item container columnSpacing={6} rowSpacing={2}>
                          <TreatmentResource
                            index={index}
                            ResourceActions={ResourceActions}
                            treatment={item}
                          />
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
  );
}

export const TreatmentResource = ({ treatment, ResourceActions }) => {
  const { data, isLoading } = useGetTreatmentOptions({ id: treatment?.id });

  return (
    <>
      {isLoading
        ? "Loading..."
        : !data?.length
        ? "No data found!"
        : data?.map((resource, index) => (
            <Grid item xs={6}>
              {index !== 0 && index !== 1 && (
                <div
                  className="itemDivider"
                  style={{ marginBottom: "16px" }}
                ></div>
              )}

              <Grid
                container
                justifyContent={"space-between"}
                alignItems="center"
              >
                <Grid item>
                  <Grid container columnSpacing={1.5} alignItems="center">
                    <Grid item>
                      {" "}
                      <Avatar className={"avatar-small"}>
                        {" "}
                        <img src={treatment?.icon} />
                      </Avatar>
                    </Grid>
                    <Grid item>
                      {" "}
                      <Typography className="primary-text">
                        {resource?.title}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className="list-action">
                  <ResourceActions resource={resource} treatment={treatment} />
                </Grid>
              </Grid>
            </Grid>
          ))}
    </>
  );
};
