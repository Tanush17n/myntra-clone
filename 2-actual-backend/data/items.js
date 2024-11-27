const fs = require('node:fs/promises');
const path = require('path');

// Use an absolute path to the items.json file
const itemsFilePath = path.join(__dirname, 'items.json');

async function getStoredItems() {
  const rawFileContent = await fs.readFile(itemsFilePath, { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedItems = data.items ?? [];
  return storedItems;
}

function storeItems(items) {
  return fs.writeFile(itemsFilePath, JSON.stringify({ items: items || [] }, null, 2)); // Pretty print JSON
}

exports.getStoredItems = getStoredItems;
exports.storeItems = storeItems;
