export function arraysAreEqual<T>(a: T[], b: T[]): boolean {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

// a helper to check recursively the previous history if it is empty it will skip and check the prvious until it finds a non empty item and returns it
export function getNonEmptyHistoryIndex<T>(
  history: T[],
  index: number
): number | -1 {
  console.log({ index, history });
  if (history.at(index)) {
    return index ?? -1;
  }

  return index - 1 >= 0 ? getNonEmptyHistoryIndex(history, index - 1) : -1;
}
