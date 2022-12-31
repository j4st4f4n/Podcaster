import styles from './EpisodesCounter.module.scss';

const EpisodesCounter = ({ counter }: { counter: number }) => {
  return (
    <h2 className={styles.episodesCounter}>
      Episodes: <span>{counter}</span>
    </h2>
  );
};

export default EpisodesCounter;
