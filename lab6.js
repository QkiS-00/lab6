async function* generateLargeDataset(size) {
  for (let i = 0; i < size; i++) {
    yield { id: i, value: Math.random() * 1000 };
  }
}

async function* asyncFilter(iterable, predicate) {
  for await (const item of iterable) {
    if (await predicate(item)) {
      yield item;
    }
  }
}

async function* asyncMap(iterable, transform) {
  for await (const item of iterable) {
    yield await transform(item);
  }
}

async function processStream(asyncIterable) {
  let count = 0;
  let sum = 0;

  for await (const item of asyncIterable) {
    sum += item.value;
    count += 1;
  }

  return { count, average: sum / count };
}