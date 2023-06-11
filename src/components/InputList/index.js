import React, { useState, useRef } from "react";
import { IconButton, Typography, Grid } from "@mui/material";
import { ReactComponent as ClearIcon } from "../../assets/icons/close-circle.svg";
import { styled } from "@mui/material/styles";
import "./style.scss";

const CustomIconButton = styled(IconButton)(({ theme }) => ({
  "&.MuiIconButton-root": {
    background: "rgba(242, 106, 71, 0.08)",
    borderRadius: "10px",
    top: "-8px",
    filter:
      "invert(50%) sepia(97%) saturate(1979%) hue-rotate(334deg) brightness(102%) contrast(90%)",
  },
  "& svg": {
    width: "16px",
    height: "16px",
  },
}));

const ListItem = ({ title, onRemove }) => {
  return (
    <Grid p={1} className="input-item" mb={2}>
      <Typography className="text">{title}</Typography>
      <IconButton sx={{ padding: 0 }} onClick={onRemove}>
        <ClearIcon />
      </IconButton>
    </Grid>
  );
};

const InputList = ({
  Icon = <></>,
  list = [],
  setList,
  label = "",
  placeholder = "",
}) => {
  const [item, setItem] = useState("");
  const ref = useRef(null);
  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter" && item.trim() !== "") {
      setList((prev) => [...prev, item]);
      setItem("");
    }
  };

  const handleRemoveItem = (index) => {
    setList((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <fieldset className="field-set" onClick={() => ref.current.focus()}>
      <legend>{label}</legend>

      <Grid
        container
        flexDirection="row"
        justifyContent="space-between"
        flexWrap="nowrap"
      >
        <Grid item container flexDirection="column" sx={{ padding: 0 }}>
          {!!list.length &&
            list.map((item, index) => (
              <ListItem
                key={index}
                title={item}
                onRemove={() => handleRemoveItem(index)}
              />
            ))}
          <input
            ref={ref}
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder={!list.length && placeholder}
            className="input"
            onKeyPress={handleEnterKeyPress}
          />
        </Grid>
        <Grid item sx={{ padding: 0 }}>
          <CustomIconButton>
            <Icon />
          </CustomIconButton>
        </Grid>
      </Grid>
    </fieldset>
  );
};

export default InputList;
