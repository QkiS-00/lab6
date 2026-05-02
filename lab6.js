import { createReadStream } from 'fs';
import { createInterface } from 'readline';

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

async function* readFileLines(filePath) {
  const fileStream = createReadStream(filePath, { encoding: 'utf8' });
  const rl = createInterface({ input: fileStream, crlfDelay: Infinity });

  for await (const line of rl) {
    if (line.trim()) {
      yield line;
    }
  }
}

async function* batchItems(iterable, batchSize) {
  let batch = [];

  for await (const item of iterable) {
    batch.push(item);
    if (batch.length >= batchSize) {
      yield batch;
      batch = [];
    }
  }

  if (batch.length > 0) {
    yield batch;
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

async function* take(iterable, limit) {
  let count = 0;
  for await (const item of iterable) {
    if (count >= limit) break;
    yield item;
    count += 1;
  }
}
