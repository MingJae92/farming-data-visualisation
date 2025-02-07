import { useState } from "react";

/**
 * Problem 2
 * Instructions: Fix this component such that when the button is clicked, the text of the first item is updated.
 */

const data = [
  { id: 1, text: "First" },
  { id: 2, text: "Second" },
  { id: 3, text: "Third" },
];

export default function Problem() {
  const [items, setItems] = useState(data);

  const updateFirstItem = (items) => {
    items[0].text = "Updated!";
    setItems(items);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Problem 3</h2>
      <button
        onClick={updateFirstItem}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Update First Item
      </button>
      <ul className="mt-4">
        {items.map((item) => (
          <li key={item.id} className="mb-2">
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

//update 1st item in the array
//Identify the function for the button click
//Once check function if initial state has been passed in as arg
//Check if data is updated and rendered
