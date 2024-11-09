import { useState, useEffect } from 'react'
import { Item } from './types.ts'
import './App.css'
import ItemTable from './ItemTable'
import Papa from 'papaparse';
import { fetchDustableItems } from './api.ts';

function App() {
  const [items, setItems] = useState<Item[]>([])  ;
  const [priceMap, setPriceMap] = useState<Map<string, number>>();
  
  // Fetch item prices from poe.ninja
  useEffect(() => {
    async function fetchItems() {
      const items = await fetchDustableItems();
      const map = new Map(
        items?.map((item: { name: string; chaosValue: number }) => [item.name, item.chaosValue])
      );
      setPriceMap(map);
    }
    fetchItems();
  }, [])

  // Parse item data from csv file
  useEffect(() => {
    fetch('poe-dust.csv')
      .then((response) => response.text())
      .then((csvString) => parseCSV(csvString));
  }, [])
  
  // Match items with their corresponding price
  useEffect(() => {
    if (items.length > 0 && priceMap) {
      setPrices();
    }
  }, [priceMap])
  
  function parseCSV(csvString: string) {
    Papa.parse(csvString, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const data: Item[] = result.data.map((row: any) => ({
          name: row.name,
          dustVal: parseFloat(row.dustVal),
          dustPerSlot: parseFloat(row.dustPerSlot),
          dustValIlvl84: parseFloat(row.dustValIlvl84),
          dustValIlvl84Q20: parseFloat(row.dustValIlvl84Q20),
        }));
        setItems(data);
      },
    });
  }

  function setPrices() {
    const updatedItems = items.map((item) => {
      const chaosPrice = priceMap?.get(item.name);
      let dustPerChaos: number = 0;
      if (chaosPrice) {
        dustPerChaos = item.dustValIlvl84 / chaosPrice
      }

      return {
        ...item,
        chaosPrice: Math.ceil(chaosPrice!) ?? null,
        dustPerChaos: Math.ceil(dustPerChaos)
      };
    });

    updatedItems.sort((a, b) => b.dustPerChaos - a.dustPerChaos);
    setItems(updatedItems);
  }

  return (
    <>
      <h1 className='logo'>DustList</h1>
      {items.length > 0 ? <ItemTable items={items} /> : <p>Loading. . .</p>}
    </>
  )
}

export default App
