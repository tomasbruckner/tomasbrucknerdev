import React, { FC } from 'react';
import { t } from '../utils/i18n';
import VideoCard from './VideoCard';
import { makeStyles, Typography } from '@material-ui/core';

const Videos = Object.freeze({
  GarbageCollector: {
    title: 'videos.garbagecollector',
    href: 'https://www.youtube.com/embed/MuHCvf7WZys',
  },
  Microfrontend: {
    title: 'videos.microfrontend',
    href: 'https://www.youtube.com/embed/kmeFVANlHmU',
  },
  Microservices: {
    title: 'videos.microservices',
    href: 'https://www.youtube.com/embed/04-iN3DdIKQ',
  },
  Neuron: { title: 'videos.neuron', href: 'https://www.youtube.com/embed/vXn3JDmjzVE' },
  Babel: { title: 'videos.babel', href: 'https://www.youtube.com/embed/Me82U4c6K3s' },
  Aws: { title: 'videos.aws', href: 'https://www.youtube.com/embed/rIDNZrXMbIo' },
  Alexa: { title: 'videos.alexa', href: 'https://www.youtube.com/embed/Ueu4tOIse4I' },
  Mongo2: { title: 'videos.mongo2', href: 'https://www.youtube.com/embed/Mil2i6erarY' },
  Mongo1: { title: 'videos.mongo1', href: 'https://www.youtube.com/embed/rDk_T_F34-w' },
  Docker: { title: 'videos.docker', href: 'https://www.youtube.com/embed/h2kA2RlLzOs' },
  Adonis: { title: 'videos.adonis', href: 'https://www.youtube.com/embed/wrfG8fhm5fE' },
  Unfurling: { title: 'videos.unfurling', href: 'https://www.youtube.com/embed/6zkWZg2-bEI' },
} as const);

const useStyles = makeStyles((theme) => ({
  text: {
    marginTop: theme.spacing(2),
  },
}));

const Lectures: FC = () => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h4" id="lectures" gutterBottom className={classes.text}>
        {t('navigation.lectures')}
      </Typography>
      {Object.keys(Videos).map((v) => {
        const { title, href } = Videos[v];

        return <VideoCard videoUrl={href} videoHeadline={t(title)} key={title} />;
      })}
    </>
  );
};

export default Lectures;
