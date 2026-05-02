import {
  generateLargeDataset,
  asyncFilter,
  asyncMap,
  batchItems,
  readFileLines,
  processStream,
  take,
} from './laba6.js';

async function runDemo() {
  console.log('=== Async Iterator Pipeline ===');

  const dataset = generateLargeDataset(1_000_000);

  const filtered = asyncFilter(dataset, async (item) => item.value > 500);
  const mapped = asyncMap(filtered, async (item) => ({
    ...item,
    value: Math.round(item.value),
  }));

  const stats = await processStream(mapped);
  console.log('Stats:', stats);

  console.log('\n=== Take — перші 5 елементів ===');

  const dataset2 = generateLargeDataset(1_000_000);
  const first5 = take(dataset2, 5);

  for await (const item of first5) {
    console.log('Item:', item);
  }

  console.log('\n=== Batch Processing ===');

  const dataset3 = generateLargeDataset(100);
  const batched = batchItems(dataset3, 10);

  let batchNum = 0;
  for await (const batch of batched) {
    batchNum += 1;
    console.log(`Batch ${batchNum}: ${batch.length} items`);
  }

  console.log('\n=== File Stream ===');
  try {
    const lines = readFileLines('./data.txt');
    let lineCount = 0;
    for await (const line of lines) {
      lineCount += 1;
    }
    console.log('Total lines:', lineCount);
  } catch {
    console.log('data.txt not found, skipping file demo');
  }
}

runDemo();