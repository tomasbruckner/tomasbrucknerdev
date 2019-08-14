import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

interface Props {
  videoUrl: string;
  videoHeadline: string;
}

const VideoCard = ({ videoUrl, videoHeadline }: Props) => {
  return (
    <Card
      style={{
        minWidth: 275,
        marginTop: '48px',
        marginBottom: '48px',
      }}
    >
      <CardContent>
        <Typography variant="h5" component="h2" style={{ marginBottom: '16px' }}>
          {videoHeadline}
        </Typography>
        <iframe
          title={videoHeadline}
          width="100%"
          height="440"
          style={{ borderWidth: 0 }}
          src={videoUrl}
        />
      </CardContent>
    </Card>
  );
};

export default VideoCard;
