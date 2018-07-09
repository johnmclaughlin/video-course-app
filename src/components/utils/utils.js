module.exports = {

filteredInput: (locations, userInput) =>
  locations.filter(e => e.location.merchant_name.toLowerCase().startsWith(userInput.toLowerCase())),

filteredPresent: (filteredLocations, locations) =>
  (filteredLocations.length > 0 ? filteredLocations : locations),

getMerchantLocation: (locations, id) =>
  locations.filter(e => e.location.id.toString() === id.toString()),

trimNames: (merchantName) => {
  if (merchantName.includes('Caffè Nero')) {
    return 'Caffè Nero';
  } else if (merchantName.includes('Formaggio Kitchen')) {
    return 'Formaggio Kitchen';
  } else if (merchantName.includes('Flame Cafe')) {
    return 'Flame Cafe';
  }
  return merchantName;
},

};