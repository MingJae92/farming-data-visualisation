import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

// Data representing multiple farms growing strawberries and recording their harvested yields
const mockData = [
  {
    id: 1,
    farm: "North Farm",
    variety: "Albion",
    yield: 120,
    date: "2025-05-01",
    harvestedBy: "Sam",
    category: "class 1",
  },
  {
    id: 2,
    farm: "North Farm",
    variety: "San Andreas",
    yield: 98,
    date: "2025-05-02",
    harvestedBy: "Sam",
    category: "class 1",
  },
  {
    id: 3,
    farm: "East Farm",
    variety: "Monterey",
    yield: 150,
    date: "2025-05-01",
    harvestedBy: "Sam",
    category: "class 1",
  },
  {
    id: 4,
    farm: "East Farm",
    variety: "Albion",
    yield: 145,
    date: "2025-05-02",
    harvestedBy: "Peter",
    category: "class 1",
  },
  {
    id: 5,
    farm: "North Farm",
    variety: "Camarosa",
    yield: 73,
    date: "2025-05-03",
    harvestedBy: "Sam",
    category: "class 1",
  },
  {
    id: 6,
    farm: "East Farm",
    variety: "San Andreas",
    yield: 130,
    date: "2025-05-03",
    harvestedBy: "Sam",
    category: "class 1",
  },
  {
    id: 7,
    farm: "West Farm",
    variety: "Camino Real",
    yield: 90,
    date: "2025-05-01",
    harvestedBy: "Peter",
    category: "class 1",
  },
  {
    id: 8,
    farm: "West Farm",
    variety: "Albion",
    yield: 110,
    date: "2025-05-02",
    harvestedBy: "Sam",
    category: "waste",
  },
  {
    id: 9,
    farm: "West Farm",
    variety: "Monterey",
    yield: 60,
    date: "2025-05-03",
    harvestedBy: "Sam",
    category: "waste",
  },
  {
    id: 10,
    farm: "South Farm",
    variety: "Camarosa",
    yield: 160,
    date: "2025-05-01",
    harvestedBy: "Steve",
    category: "class 1",
  },
  {
    id: 11,
    farm: "South Farm",
    variety: "Monterey",
    yield: 125,
    date: "2025-05-02",
    harvestedBy: "Sam",
    category: "waste",
  },
  {
    id: 12,
    farm: "South Farm",
    variety: "San Andreas",
    yield: 115,
    date: "2025-05-03",
    harvestedBy: "Sam",
    category: "waste",
  },
];

/**
 * 
 * @returns {Object} An object containing the farm data, a function to cancel the request, and a boolean indicating if the data is loading
 */
export const useFarmData = () => {
  const timeoutRef = useRef(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      timeoutRef.current = setTimeout(() => {
        setData(mockData);
        setIsLoading(false);
        console.log(mockData)
      }, 1000);
    } catch (err) {
      setError("Failed to fetch farm data");
      setIsLoading(false);
  
    }

    return () => clearTimeout(timeoutRef.current);
  }, []);

  return {
    data,
    error,
    cancelRequest: () => {
      clearTimeout(timeoutRef.current);
      setIsLoading(false);
    },
    isLoading,
  };
};
