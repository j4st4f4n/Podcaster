import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PodcastContext } from '../../context/podcast-context';

import styles from './Header.module.scss';

const Header = () => {
  const { loading } = useContext(PodcastContext);
  return (
    <div className={styles.headerConatiner}>
      <div className={styles.header}>
        <Link to="/" className={styles.title}>
          Podcaster
        </Link>
        {loading && <div className={styles.loading} title="loading"></div>}
      </div>
      <hr />
    </div>
  );
};

export default Header;
