import React, { ReactElement } from 'react';
import { t } from '../utils/i18n';
import VideoCard from './VideoCard';
import { Typography } from '@material-ui/core';

const Videos = Object.freeze({
  Babel: { title: 'videos.babel', href: 'https://www.youtube.com/embed/Me82U4c6K3s' },
  Aws: { title: 'videos.aws', href: 'https://www.youtube.com/embed/rIDNZrXMbIo' },
  Alexa: { title: 'videos.alexa', href: 'https://www.youtube.com/embed/Ueu4tOIse4I' },
  Mongo2: { title: 'videos.mongo2', href: 'https://www.youtube.com/embed/Mil2i6erarY' },
  Mongo1: { title: 'videos.mongo1', href: 'https://www.youtube.com/embed/rDk_T_F34-w' },
  Docker: { title: 'videos.docker', href: 'https://www.youtube.com/embed/h2kA2RlLzOs' },
  Adonis: { title: 'videos.adonis', href: 'https://www.youtube.com/embed/wrfG8fhm5fE' },
  Unfurling: { title: 'videos.unfurling', href: 'https://www.youtube.com/embed/6zkWZg2-bEI' },
});

const getVideos = (): ReactElement[] => {
  const videos: ReactElement[] = [];

  for (const video of Object.keys(Videos)) {
    const { title, href } = Videos[video];

    videos.push(<VideoCard videoUrl={href} videoHeadline={t(title)} key={title} />);
  }

  return videos;
};

const Lectures = () => {
  const videos = getVideos();

  return (
    <>
      <Typography variant="h4" id="lectures" gutterBottom style={{ marginTop: '1em' }}>
        {t('navigation.lectures')}
      </Typography>
      {videos}
    </>
  );
};

export default Lectures;
