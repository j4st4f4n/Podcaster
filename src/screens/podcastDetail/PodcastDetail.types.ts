import { PodcastEpisode } from '../../components/episodesList/EpisodesList.types';
import { PodcastEntryI } from '../../context/podcast-context.types';

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

export interface PodcastItemData extends PodcastDetail {
  expiration: number;
}
