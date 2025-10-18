"use client";

import { useState } from "react";
import { useHistory } from "@/context/HistoryContext";

function History() {
  const { history } = useHistory();
  const [renderHistory] = useState(history);
  return (
    <ul>
      {renderHistory.map(
        (item, index) =>
          item && (
            <li key={`${index}-${item}`} className="mb-1">
              <span className="text-pink">$</span> {item}
            </li>
          )
      )}
    </ul>
  );
}

export default History;
