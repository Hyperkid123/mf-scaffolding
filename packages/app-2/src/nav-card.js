import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import PropTypes from "prop-types";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function NavCard({ to }) {
  const classes = useStyles();
  const { push } = useHistory();

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => push(to)}>
        <CardMedia
          className={classes.media}
          image="https://www.redhat.com/cms/managed-files/Brand_Standards_RH-IBM_Assets_Red_Hat.svg?itok=Oy-TkmLe"
          title="Red hat brand"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Title
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            dignissim sem vitae turpis ullamcorper viverra. Etiam scelerisque
            dapibus tincidunt. Nulla sit amet aliquet mi.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

NavCard.propTypes = {
  to: PropTypes.string.isRequired,
};
