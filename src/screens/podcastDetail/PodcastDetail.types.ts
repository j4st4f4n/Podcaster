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
  items: PodcastDetailItem[];
}

export type PodcastDetailItem = {
  id: string;
  title: string;
  description: string;
  created: number;
  published: number;
  itunes_duration: number;
  link: string | undefined;
  media: { thumbnail: Thumbnail[] | undefined };
};

export type Thumbnail = {
  medium: string;
  type: string;
  url: string;
};
