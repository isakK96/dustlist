import { useState, useEffect } from 'react'
import { Item } from './types.ts'
import './App.css'
import ItemTable from './ItemTable'
import Papa from 'papaparse';

function App() {
  const [items, setItems] = useState<Item[]>([])  
  
  useEffect(() => {
      fetch('poe-dust.csv')
        .then((response) => response.text())
        .then((csvString) => parseCSV(csvString));
      //.then((response) => response.text())
      //.then((csvString) => parseCSV(csvString));
  }, [])
  
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
        // fetchPrices(data); // Fetch prices after parsing
      },
    });
  }

  return (
    <>
      {items ? <ItemTable items={items} /> : <p>loading</p>}
    </>
  )
}

export default App
