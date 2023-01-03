export type PodcastContextProps = {
  children?: React.ReactNode;
};

export type PodcastContextState = {
  podcastsList: PodcastEntryI[];
  selectedPodcast: PodcastEntryI | undefined;
  loading: boolean;
};

export type PodcastContextAction = {
  type: string;
  payload: undefined | boolean | string | PodcastEntryI | PodcastEntryI[];
};

export interface PodcastContextI {
  podcastsList: PodcastEntryI[];
  selectedPodcast: PodcastEntryI | undefined;
  loading: boolean;
  selectPodcast: (podcastId: string) => void;
  setLoading: (value: boolean) => void;
}

export type PodcastsData = {
  podcasts: PodcastEntryI[];
  expiration: number;
};

export type PodcastsEntryReq = {
  id: { attributes: { 'im:id': string } };
  'im:image': { attributes: { height: string }; label: string }[];
  'im:artist': { label: string };
  'im:name': { label: string };
  title: { label: string };
};

export interface PodcastEntryI {
  id: string;
  name: string;
  title: string;
  artist: string;
  image: { height: string; label: string }[];
}

export type PodcastDetailReq = {
  resultCount: number;
  results: { feedUrl: string }[];
};
