import React, { FC } from 'react';
import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 275,
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
  },
  h2: {
    marginBottom: theme.spacing(2),
  },
  iframe: {
    borderWidth: 0,
  },
}));

interface Props {
  videoUrl: string;
  videoHeadline: string;
}

const VideoCard: FC<Props> = ({ videoUrl, videoHeadline }: Props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2" className={classes.h2}>
          {videoHeadline}
        </Typography>
        <iframe
          title={videoHeadline}
          width="100%"
          height="440"
          className={classes.iframe}
          src={videoUrl}
        />
      </CardContent>
    </Card>
  );
};

export default VideoCard;
