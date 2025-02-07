import { useEffect } from "react";
import { useFarmData } from "./mockData";

/**
 * Problem 5
 *
 * As a user, I want to see multiple farms (with different strawberry varieties)
 * and their harvested yields, so I can quickly understand the overall harvest data.
 *
 * You only have 45 minutes.
 * Focus on data representation over interactivity.
 * No interactivity is required, just a presentation of the mockData.
 *
 * Feel free to complete this task however you are most comfortable.
 *
 * Instructions:
 * 1. Display the data from `mockData.js` in any format you like (table, cards, graph, etc.).
 * 2. Provide a basic summary or insight (e.g. total yields, yields by variety, or similar).
 * 3. Optionally use Tailwind for styling (if implementing in code).
 * 4. Be prepared to discuss your approach.
 */
export default function Problem() {
  const [farmData, setFarmData]  = useFarmData();

  useEffect(()=>{

    setFarmData()
  },[])

  // Modify or split this into multiple components if desired
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Problem 5</h2>
      <p className="mb-4">{/* Example: Summaries or introductions here */}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Render the data in the layout of your choice */}


        <table>

        </table>
      </div>
    </div>
  );
}

//Variety, which types? Filter by farm
//Button filtering
//Display data:TAble or graph
//Button: Filter by total yields, variety, 
