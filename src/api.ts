export async function fetchDustableItems() {
  try {
    const [weapons, armours, accessories] = await Promise.all([
      fetch('/api/data/itemoverview?league=Settlers&type=UniqueWeapon'),
      fetch('/api/data/itemoverview?league=Settlers&type=UniqueArmour'),
      fetch('/api/data/itemoverview?league=Settlers&type=UniqueAccessory'),
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