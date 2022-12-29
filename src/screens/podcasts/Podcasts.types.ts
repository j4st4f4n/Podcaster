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
