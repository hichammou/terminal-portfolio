export function arraysAreEqual<T>(a: T[], b: T[]): boolean {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

// a helper to check recursively the previous history if it is empty it will skip and check the prvious until it finds a non empty item and returns it
export function getNonEmptyHistoryIndex<T>(
  history: T[],
  index: number,
  direction: "up" | "down"
): number | -1 {
  if (history.at(index)) {
    return index ?? -1;
  }

  const sign = direction === "up" ? index - 1 : index + 1;

  return sign >= 0 ? getNonEmptyHistoryIndex(history, sign, direction) : -1;
}
