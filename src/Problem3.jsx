import { useState, useEffect } from "react";

/**
 * Problem 3
 *
 * Instructions: Fix the issue where fetching occurs repeatedly,
 * potentially causing unnecessary re-renders and network requests.
 *
 */
export default function Problem() {
  const [data, setData] = useState(null);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (toggle) {
      fetch("https://jsonplaceholder.typicode.com/posts/1")
        .then((res) => res.json())
        .then((json) => {
          setData(json);
        })
        .catch((error) => console.error("Fetch error:", error));
    }
  },[toggle]);

  const handleClick = () => setToggle(!toggle);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Problem 2</h2>
      <button
        onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Toggle Fetch
      </button>
      <pre className="mt-4 bg-grey-100 p-2 rounded">
        {data ? JSON.stringify(data, null, 2) : "No data"}
      </pre>
    </div>
  );
}


//