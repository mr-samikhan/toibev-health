import React, { useEffect, useState } from "react";
import {
  Avatar,
  Grid,
  Typography,
  InputAdornment,
  TextField,
} from "@mui/material";
import { ReactComponent as SearchIcon } from "../../assets/icons/search-normal.svg";
import icons from "../../assets";
import "./style.scss";

export default function CardListing({ list, CardActionButton }) {
  const [data, setData] = useState(list);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchValue.length) {
      const items = [...data];
      const filteredItems = items.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      );

      setData(filteredItems);
    } else setData(list);
  }, [searchValue]);

  return (
    <Grid container className="card-listing">
      <Grid item xs={12} sx={{ mb: { xs: 3, sm: 2 } }} className="search-field">
        {" "}
        <TextField
          fullWidth
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ pl: 2 }}>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        ></TextField>
      </Grid>
      {data?.map((item, index) => (
        <Grid item xs={12} className="card-list-item" key={index}>
          <ListItem item={item} CardActionButton={CardActionButton} />
        </Grid>
      ))}
    </Grid>
  );
}

const ListItem = ({ item, CardActionButton }) => {
  const { icon, title } = item;
  return (
    <>
      <Grid container justifyContent="space-between" alignItems={"center"}>
        <Grid item>
          <Grid container alignItems={"center"} columnGap={1}>
            <Grid item>
              <Grid container className="icon-container">
                <Avatar variant="square" src={icon} className="icon" />
              </Grid>
            </Grid>
            <Grid item>
              <Typography className="title">{title}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className="list-action">
          <CardActionButton data={item} />
        </Grid>
      </Grid>
      <Grid container justifyContent={"center"} my={2}>
        <Grid item xs={9} className="item-divider"></Grid>
      </Grid>
    </>
  );
};
