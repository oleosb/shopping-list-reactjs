import styles from './ItemList.module.css';
import Item from './Item';

const ItemList = ({ items, handleChecked, handleIncrease, handleDecrease, handleRemove }) => {
  return (
    <div className={styles.itemList}>
      {items.map((item, idx) => (
        <Item
          key={idx}
          idx={idx}
          {...item}
          handleChecked={handleChecked}
          handleIncrease={handleIncrease}
          handleDecrease={handleDecrease}
          handleRemove={handleRemove}
        />
      ))}
    </div>
  );
};

export default ItemList;
