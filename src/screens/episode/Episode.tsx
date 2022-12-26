import {useLocation /*, useParams*/} from 'react-router-dom';

import {EpisodeLocationState} from './Episode.types';

const Episode = () => {
  // const {podcastId, episodeId} = useParams<{
  //   podcastId: string;
  //   episodeId: string;
  // }>();
  const {state: locationState} = useLocation<EpisodeLocationState>();

  const {podcastDetail, podcastEpisode} = locationState;

  const media = podcastEpisode.media.thumbnail?.find(
    mediaAudio => mediaAudio.medium === 'audio'
  );

  return (
    <div>
      <img src={podcastDetail.image[2].label} alt={podcastDetail.name} />
      <div>{podcastDetail.title}</div>
      <div>by {podcastDetail.artist}</div>
      <div>Description: {podcastDetail.description}</div>
      {media ? (
        <figure>
          <audio controls src={media?.url}></audio>
        </figure>
      ) : (
        <div>
          <a href={podcastEpisode.link}>Link</a>
        </div>
      )}
    </div>
  );
};

export default Episode;
