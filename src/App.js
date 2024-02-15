import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import { PackingList } from "./Packinglist";
import { Item } from "./Packinglist";

export default function App() {
  const [items, setItems] = useState([]);

  function handleItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleItemsDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function onToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleItems} items={items} />
      <PackingList
        myItems={items}
        onDeleteItems={handleItemsDelete}
        onToggleItem={onToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Stats({ items }) {
  if (items.length === 0)
    return (
      <p className="stats">
        <em>Start adding items🎃</em>
      </p>
    );

  const numItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const precentage = Math.round((packedItems / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {precentage === 100
          ? "Your are ready for trip ✈"
          : `You have ${numItems} items on your list, and you already packed ${packedItems} (${precentage}%)`}
      </em>
    </footer>
  );
}
