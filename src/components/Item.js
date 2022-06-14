import styles from './Item.module.css';
import {
  FaCircle,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaMinusCircle,
} from 'react-icons/fa';

const Item = ({
  idx,
  id,
  checked,
  name,
  quantity,
  handleChecked,
  handleIncrease,
  handleDecrease,
  handleRemove,
}) => {
  return (
    <div className={styles.item}>
      <div className={styles.leftSide} onClick={() => handleChecked(idx)}>
        {checked ? (
          <FaCheckCircle className={styles.circleBtn} />
        ) : (
          <FaCircle className={styles.circleBtn} />
        )}
        <p className={checked ? `${styles.checked}` : ' '}>{name}</p>
      </div>
      <div className={styles.rightSide}>
        <button onClick={() => handleDecrease(id)}>
          <FaChevronLeft className={`${styles.arrow} ${styles.arrowLeft}`} />
        </button>
        <span className={styles.qtt}>{quantity}</span>
        <button onClick={() => handleIncrease(id)}>
          <FaChevronRight className={`${styles.arrow} ${styles.arrowRight}`} />
        </button>
      </div>
      <button className={styles.removeBtn} onClick={() => handleRemove(id)}>
        <FaMinusCircle />
      </button>
    </div>
  );
};

export default Item;
