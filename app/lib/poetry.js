import { poems } from "../data/literature";

export function getMajorAuthors(minCount = 1) {
  const countMap = {};
  poems.forEach((p) => {
    countMap[p.author] = (countMap[p.author] || 0) + 1;
  });
  return Object.entries(countMap)
    .filter(([, c]) => c >= minCount)
    .sort((a, b) => b[1] - a[1])
    .map(([author]) => author);
}

export function getPoemsByAuthor(author) {
  if (author === "other") {
    const major = getMajorAuthors();
    return poems.filter((p) => !major.includes(p.author));
  }
  return poems.filter((p) => p.author === author);
}

export function getAuthorCounts() {
  const countMap = {};
  poems.forEach((p) => {
    countMap[p.author] = (countMap[p.author] || 0) + 1;
  });
  return countMap;
}
