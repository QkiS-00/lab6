async function* generateLargeDataset(size) {
  for (let i = 0; i < size; i++) {
    yield { id: i, value: Math.random() * 1000 };
  }
}