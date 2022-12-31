import PodcastEntry from '../podcastEntry/PodcastEntry';

import { PodcastsListProps } from './PodcastsList.types';
import { PodcastEntryI } from '../../context/podcast.context.types';
import styles from './PodcastsList.module.scss';

// TODO: Pagination or scroll loading

const PodcastList = ({ podcasts }: PodcastsListProps) => {
  return (
    <ul className={styles.podcastsList}>
      {podcasts.map((podcast: PodcastEntryI) => (
        <PodcastEntry key={podcast.id} podcast={podcast} />
      ))}
    </ul>
  );
};

export default PodcastList;
