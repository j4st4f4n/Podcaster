import { PodcastEntryI } from '../../context/podcast-context.types';

export type PodcastEntryProps = {
  podcast: PodcastEntryI;
  children?: React.ReactNode;
};
