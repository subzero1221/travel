import { useState } from "react";

export function PackingList({ myItems, onDeleteItems, onToggleItem }) {
  const [sortedBy, setSortedBy] = useState("input");

  let sortedItems;

  if (sortedBy === "input") sortedItems = myItems;
  if (sortedBy === "description")
    sortedItems = myItems
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortedBy === "packed")
    sortedItems = myItems
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  if (sortedBy === "clear") sortedItems = [];

  function handleSorter(e) {
    setSortedBy((s) => (s = e.target.value));
  }

  function handleClear() {
    setSortedBy((s) => (s = "clear"));
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            itemObj={item}
            key={item.description}
            itemsDelete={onDeleteItems}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div>
        <select className="actions" value={sortedBy} onChange={handleSorter}>
          <option value="input">Sort by input</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed</option>
        </select>
        <button onClick={handleClear}>Clear list</button>
      </div>
    </div>
  );
}

export function Item({ itemObj, itemsDelete, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={itemObj.packed}
        value={itemObj.packed}
        onChange={() => onToggleItem(itemObj.id)}
      ></input>
      <span style={itemObj.packed ? { textDecoration: "line-through" } : {}}>
        {itemObj.quantity} {itemObj.description}
      </span>
      <button onClick={() => itemsDelete(itemObj.id)}>❌</button>
    </li>
  );
}
