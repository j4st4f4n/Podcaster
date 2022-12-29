import { useHistory } from 'react-router-dom';

import { PodcastEntryProps } from './PodcastEntry.types';
import styles from './PodcastEntry.module.scss';

const PodcastEntry = ({ podcast }: PodcastEntryProps) => {
  const history = useHistory();

  const onPodcastClickHandler = () => {
    history.push(`/podcast/${podcast.id}`, { podcastEntry: podcast });
  };

  return (
    <li className={styles.podcastCard}>
      <img src={podcast.image[2].label} alt={podcast.name} />

      <div
        className={styles.podcastCardData}
        onClick={() => onPodcastClickHandler()}
      >
        <div className={styles.title}>{podcast.title}</div>
        <div className={styles.author}>Author: {podcast.artist}</div>
      </div>
    </li>
  );
};

export default PodcastEntry;
