import fs from 'fs'
import BSON from 'bson'

const bsonFilePath = './dump/test-db/transactions.bson';
const jsonFilePath = './dump/test-db/transactions.json';

const readStream = fs.createReadStream(bsonFilePath);

let buffer = Buffer.from([]);
let size;

const jsonDataArray = [];

readStream.on('data', (chunk) => {
  buffer = Buffer.concat([buffer, chunk]);

  while (buffer.length > 4) {
    if (!size) {
      size = buffer.readInt32LE(0);
    }

    if (buffer.length >= size) {
      const bsonData = buffer.subarray(0, size);
      const parsedData = BSON.deserialize(bsonData);

      jsonDataArray.push(parsedData);

      buffer = buffer.slice(size);
      size = undefined;
    } else {
      break;
    }
  }
});

readStream.on('error', (err) => {
  console.error('Error reading BSON file:', err);
});

readStream.on('end', () => {
  if (buffer.length > 0) {
    console.error('Incomplete BSON data. The file might be corrupted.');
  } else {
    // Write the parsed data to a JSON file
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonDataArray, null, 2));
    console.log('BSON file successfully processed and JSON file created.');
  }
});

