import { PodcastEntryI } from '../../screens/podcasts/Podcasts.types';

export type PodcastsListProps = {
  podcasts: PodcastEntryI[];
  children?: React.ReactNode;
};
