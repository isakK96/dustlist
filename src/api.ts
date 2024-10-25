export async function fetchDustableItems() {
  const proxyUrl = "https://corsproxy.io/?";
  const baseUrl = "https://poe.ninja/api/data/itemoverview?league=Settlers&type=";
  
  try {
    const [weapons, armours, accessories] = await Promise.all([
      fetch(proxyUrl + baseUrl + 'UniqueWeapon'),
      fetch(proxyUrl + baseUrl + 'UniqueArmour'),
      fetch(proxyUrl + baseUrl + 'UniqueAccessory'),
    ]);

    const weaponsData = await weapons.json();
    const armoursData = await armours.json();
    const accessoriesData = await accessories.json();

    const combinedItems = [...weaponsData.lines, ...armoursData.lines, ...accessoriesData.lines];

    console.log(combinedItems);
    return combinedItems;
  } catch (err) {
    console.log(err);
  }
}