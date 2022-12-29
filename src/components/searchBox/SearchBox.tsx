import { SearchBoxProps } from './SearchBox.types';
import styles from './SearchBox.module.scss';

const SearchBox = ({
  resultsNumber,
  onSearchChangeHandler,
}: SearchBoxProps) => {
  return (
    <div className={styles.searchBox}>
      <span>{resultsNumber}</span>
      <input
        placeholder="Filter podcasts..."
        type="text"
        onChange={onSearchChangeHandler}
      />
    </div>
  );
};

export default SearchBox;
