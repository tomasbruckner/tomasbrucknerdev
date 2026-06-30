import type { cs } from '../i18n/cs';

export type VideoKey = keyof typeof cs['videos'];

export const LECTURES: readonly { youtubeId: string; key: VideoKey }[] = [
  { key: 'garbagecollector', youtubeId: 'MuHCvf7WZys' },
  { key: 'microfrontend', youtubeId: 'kmeFVANlHmU' },
  { key: 'microservices', youtubeId: '04-iN3DdIKQ' },
  { key: 'neuron', youtubeId: 'vXn3JDmjzVE' },
  { key: 'babel', youtubeId: 'Me82U4c6K3s' },
  { key: 'aws', youtubeId: 'rIDNZrXMbIo' },
  { key: 'alexa', youtubeId: 'Ueu4tOIse4I' },
  { key: 'mongo2', youtubeId: 'Mil2i6erarY' },
  { key: 'mongo1', youtubeId: 'rDk_T_F34-w' },
  { key: 'docker', youtubeId: 'h2kA2RlLzOs' },
  { key: 'adonis', youtubeId: 'wrfG8fhm5fE' },
  { key: 'unfurling', youtubeId: '6zkWZg2-bEI' },
] as const;
