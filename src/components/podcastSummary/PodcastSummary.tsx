import parse from 'html-react-parser';

import { PodcastSummaryProps } from './PodcastSummary.types';
import styles from './PodcastSummary.module.scss';
import Card from '../card/Card';

// TODO: Description format

const PodcastSummary = ({
  imgSource,
  title,
  name,
  artist,
  description,
}: PodcastSummaryProps) => {
  return (
    <Card classes={styles.podcastSummary}>
      <img src={imgSource} alt={name} />
      <hr />
      <div className={styles.info}>
        <h4 className={styles.title}>{title}</h4>
        <i className={styles.text}>by {artist}</i>
      </div>
      <hr />
      <div className={styles.description}>
        <h5 className={styles.title}>Description:</h5>
        <i className={styles.text}>{parse(description)}</i>
      </div>
    </Card>
  );
};

export default PodcastSummary;
