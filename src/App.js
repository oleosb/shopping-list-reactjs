import styles from './App.module.css';
import { useEffect, useState } from 'react';
import ItemList from './components/ItemList';
import { FaPlusCircle } from 'react-icons/fa';
import { nanoid } from 'nanoid';

const App = () => {
  const [items, setItems] = useState([]);
  const [entryItem, setEntryItem] = useState('');

  function addItem() {
    if (entryItem) {
      const hasItem = items.filter(
        (item) => item.name.toLowerCase() === entryItem.toLowerCase(),
      );

      if (hasItem.length === 0) {
        const newItem = {
          id: nanoid(),
          checked: false,
          name: entryItem,
          quantity: '01',
        };

        setItems([...items, newItem]);
        setEntryItem('');
      }
    }
  }

  function removeItem(id) {
    const itemsCopy = items.filter((item) => item.id !== id);
    setItems(itemsCopy);
  }

  function toggleChecked(idx) {
    const itemsCopy = [...items];
    itemsCopy[idx].checked = !itemsCopy[idx].checked;
    setItems(itemsCopy);
  }

  function increaseQtt(id) {
    const itemsCopy = [...items];
    itemsCopy.filter((item) => {
      if (item.id === id) {
        item.quantity++;
        item.quantity = formatNumber(item.quantity);
      }
      return itemsCopy;
    });
    setItems(itemsCopy);
  }

  function decreaseQtt(id) {
    const itemsCopy = [...items];
    itemsCopy.filter((item) => {
      if (item.id === id) {
        item.quantity--;
        item.quantity = formatNumber(item.quantity);

        if (item.quantity === '00') {
          const newCopy = items.filter((item) => item.id !== id);
          setItems(newCopy);
        } else {
          setItems(itemsCopy);
        }
      }
      return null;
    });
  }

  function formatNumber(number) {
    return number.toLocaleString('pt-BR', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  }

  useEffect(() => {
    const localItems = JSON.parse(localStorage.getItem('local-items'));

    if (localItems) {
      setItems(localItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('local-items', JSON.stringify(items));
  }, [items]);

  return (
    <section className={styles.container}>
      <header>
        <h1>SHOPPING LIST</h1>
      </header>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="adicione ou busque um item..."
          value={entryItem}
          onChange={({ target }) => setEntryItem(target.value)}
          onKeyDown={({ key }) => (key === 'Enter' ? addItem() : null)}
          autoFocus
        />
        <FaPlusCircle className={styles.addBtn} onClick={addItem} />
      </div>
      <ItemList
        items={items.filter((item) =>
          item.name.toLowerCase().includes(entryItem.toLowerCase()),
        )}
        handleChecked={toggleChecked}
        handleIncrease={increaseQtt}
        handleDecrease={decreaseQtt}
        handleRemove={removeItem}
      />
    </section>
  );
};

export default App;
