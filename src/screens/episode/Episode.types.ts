import { PodcastEpisode } from '../../components/episodesList/EpisodesList.types';
import { PodcastDetail } from '../podcastDetail/PodcastDetail.types';

export type EpisodeLocationState = {
  podcastDetail: PodcastDetail;
  podcastEpisode: PodcastEpisode;
};
