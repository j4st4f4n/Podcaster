export type PodcastEpisode = {
  id: string;
  title: string;
  description: string;
  created: number;
  published: number;
  link: string | undefined;
  media: { thumbnail: Thumbnail[] | undefined };
  enclosures: [EnclosureA, EnclosureB];
  content_encoded: string;
  itunes_author: string;
  itunes_duration: number | string;
  itunes_season: number;
  itunes_episode: number;
  itunes_episodeType: string;
  itunes_image: { href: string };
  category: string[];
  content: string;
};

type EnclosureA = {
  length?: string;
  type: string;
  url: string;
};

type EnclosureB = [
  { 'media:player': { url: string }; type: string; url: string },
  { type: string; url: string }
];

type Thumbnail = {
  medium?: string;
  type: string;
  url: string;
  'media:player'?: { url: string };
};
