"use client";

import { createContext, type ReactNode, useContext, useState } from "react";

const HistoryContext = createContext({
  history: [] as string[],
  isHistoryEmpty: true,
  historyIndex: 0,
  navigateHistory: (_direction: "up" | "down"): string => "",
  addToHistory: (_command: string) => {},
  clearHistory: () => {},
  resetHistoryIndex: () => {},
});

function HistoryContextProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const navigateHistory = (direction: "up" | "down"): string => {
    if (history.length === 0) return "";
    if (direction === "up") {
      if (historyIndex === -1 && history.length > 0) {
        setHistoryIndex(history.length - 1);
        return history[history.length - 1];
      } else if (historyIndex > 0) {
        setHistoryIndex(historyIndex - 1);
        return history[historyIndex - 1];
        // if the historyIndex is 0, do nothing
      } else {
        return history[0];
      }
    } else {
      if (historyIndex >= 0 && historyIndex <= history.length - 1) {
        setHistoryIndex(historyIndex + 1);
        // if the historyIndex is at the last item, return empty string
        if (historyIndex + 1 === history.length) {
          return "";
        }
        return history[historyIndex + 1];
      }
      return "";
    }
  };

  const addToHistory = (command: string) =>
    setHistory((prev) => [...prev, command]);

  const clearHistory = () => setHistory([]);

  const resetHistoryIndex = () => setHistoryIndex(-1);
  return (
    <HistoryContext.Provider
      value={{
        isHistoryEmpty: history.length === 0,
        historyIndex,
        history,
        addToHistory,
        clearHistory,
        navigateHistory,
        resetHistoryIndex,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
}

export const useHistory = () => {
  const context = useContext(HistoryContext);

  if (!context) {
    throw new Error("useHistory must be used within a HistoryContextProvider");
  }

  return context;
};

export default HistoryContextProvider;
