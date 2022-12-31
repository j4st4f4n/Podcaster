import { PodcastEpisode } from '../../components/episodesList/EpisodesList.types';
import { PodcastEntryI } from '../podcasts/Podcasts.types';

export type PodcastDetailReq = {
  resultCount: number;
  results: { feedUrl: string }[];
};

export type PodcastDetailLocationState = {
  podcastEntry: PodcastEntryI;
};

export interface PodcastDetail extends PodcastEntryI {
  description: string;
  items: PodcastEpisode[];
}

export type Thumbnail = {
  medium: string;
  type: string;
  url: string;
};
