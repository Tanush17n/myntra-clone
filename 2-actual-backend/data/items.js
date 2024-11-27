const fs = require('node:fs/promises');
const path = require('path'); // Required for creating absolute paths

// Function to get stored items from the JSON file
async function getStoredItems() {
  // Use __dirname to create an absolute path to items.json (now located at the root of 2-actual-backend/)
  const filePath = path.join(__dirname, '..', 'items.json'); // Adjusted to point to the root-level items.json
  const rawFileContent = await fs.readFile(filePath, { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  return data.items ?? []; // Return items if available, otherwise an empty array
}

// Function to store new items to the JSON file
function storeItems(items) {
  const filePath = path.join(__dirname, '..', 'items.json'); // Adjusted to point to the root-level items.json
  return fs.writeFile(filePath, JSON.stringify({ items: items || [] }));
}

exports.getStoredItems = getStoredItems;
exports.storeItems = storeItems;
