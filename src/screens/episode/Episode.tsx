import { useLocation /*, useParams*/ } from 'react-router-dom';

import PodcastSummary from '../../components/podcastSummary/PodcastSummary';

import { EpisodeLocationState } from './Episode.types';
import styles from './Episode.module.scss';
import Card from '../../components/card/Card';
import HTMLReactParser from 'html-react-parser';

// TODO: Resposive

const Episode = () => {
  // const {podcastId, episodeId} = useParams<{
  //   podcastId: string;
  //   episodeId: string;
  // }>();
  const { state: locationState } = useLocation<EpisodeLocationState>();

  const { podcastDetail, podcastEpisode } = locationState;
  const media = podcastEpisode.enclosures[0];

  return (
    <div className={styles.episode}>
      <PodcastSummary
        {...podcastDetail}
        imgSource={podcastDetail.image[2].label}
      />
      <Card classes={styles.episodeDetailContainer}>
        <h2 className={styles.title}>{podcastDetail.title}</h2>
        <i>{HTMLReactParser(podcastEpisode.description)}</i>
        <hr />
        <figure>
          <audio controls src={media.url}></audio>
        </figure>
      </Card>
    </div>
  );
};

export default Episode;
