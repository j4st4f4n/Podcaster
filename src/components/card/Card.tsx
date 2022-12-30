import styles from './Card.module.scss';
import { CardProps } from './Card.types';

const Card = ({ classes, children }: CardProps) => {
  return <div className={`${styles.card} ${classes}`}>{children}</div>;
};

export default Card;
