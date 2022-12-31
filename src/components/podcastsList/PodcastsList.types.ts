import { PodcastEntryI } from '../../context/podcast.context.types';

export type PodcastsListProps = {
  podcasts: PodcastEntryI[];
  children?: React.ReactNode;
};
