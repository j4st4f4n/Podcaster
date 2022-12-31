import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { PodcastContext } from '../../context/podcast-context';
import Card from '../card/Card';

import { PodcastEntryProps } from './PodcastEntry.types';
import styles from './PodcastEntry.module.scss';

const PodcastEntry = ({ podcast }: PodcastEntryProps) => {
  const history = useHistory();
  const { selectPodcast } = useContext(PodcastContext);

  const onPodcastClickHandler = () => {
    selectPodcast(podcast.id);
    history.push(`/podcast/${podcast.id}`);
  };

  return (
    <li className={styles.noList}>
      <Card classes={styles.podcastCard}>
        <img src={podcast.image[2].label} alt={podcast.name} />

        <div
          className={styles.podcastCardData}
          onClick={() => onPodcastClickHandler()}
        >
          <div className={styles.title}>{podcast.title}</div>
          <div className={styles.author}>Author: {podcast.artist}</div>
        </div>
      </Card>
    </li>
  );
};

export default PodcastEntry;
