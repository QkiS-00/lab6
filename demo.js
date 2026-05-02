import {
  generateLargeDataset,
  asyncFilter,
  asyncMap,
  batchItems,
  readFileLines,
  processStream,
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

  console.log('\n=== Batch Processing ===');

  const dataset2 = generateLargeDataset(100);
  const batched = batchItems(dataset2, 10);

  let batchNum = 0;
  for await (const batch of batched) {
    batchNum += 1;
    console.log(`Batch ${batchNum}: ${batch.length} items`);
  }

  console.log('\n=== File Stream (якщо є файл) ===');
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