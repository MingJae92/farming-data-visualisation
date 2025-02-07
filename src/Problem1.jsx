/**
 * Problem 1
 * Instructions: Increment the count when the button is clicked.
 */

import { useState } from "react";
export default function Problem() {
  const [count, setCount]=useState(0)


  // const count = 0;

  const increment = () => setCount(count + 1)

  return (
    <div className="p-4 ">
      <h2 className="text-xl font-bold mb-4">Problem 1</h2>
      <ChildComponent onClick={increment} />
      <p className="mt-4">Count: {count}</p>
    </div>
  );
}

function ChildComponent({ onClick }) {
  console.log("ChildComponent re-rendered!");
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
    >
      Increment
    </button>
  );
}

//Strarting point is 0
//initial state, how will I update my state
//How will the comp render the state?


