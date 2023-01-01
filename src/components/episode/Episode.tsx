import HTMLReactParser from 'html-react-parser';

import Card from '../card/Card';
import { EpisodeProps } from './Episode.types';
import styles from './Episode.module.scss';

const Episode = ({ episode }: EpisodeProps) => {
  const media = episode.enclosures[0];

  return (
    <Card classes={styles.episodeDetailContainer}>
      <h2 className={styles.title}>{episode.title}</h2>
      <i>{HTMLReactParser(episode.description)}</i>
      <hr />
      <figure>
        <audio controls src={media.url}></audio>
      </figure>
    </Card>
  );
};

export default Episode;
