import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import NavCard from "./nav-card";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(6),
  },
}));

const CardsList = () => {
  const classes = useStyles();
  return (
    <Grid className={classes.root} container spacing={6}>
      {[...Array(13)].map((_item, index) => (
        <Grid item key={index} lg={4} md={6} sm={12}>
          <NavCard to={index % 2 === 0 ? "/page-one" : "/page-two"} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardsList;
