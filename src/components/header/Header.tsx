import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <div className={styles.headerConatiner}>
      <div className={styles.header}>
        <Link to="/" className={styles.title}>
          Podcaster
        </Link>
      </div>
      <hr />
    </div>
  );
};

export default Header;
