import { useState } from 'react';
import { Item } from './types';
import { createTradeLink } from './utils';

type tableProps = {
  items: Item[];
}

export default function ItemTable({ items }: tableProps) {
  const [minDustValue, setMinDustValue] = useState<number>(0);

  const filteredItems = items.filter(item => item.dustValIlvl84 >= minDustValue);

  return (
    <>
      <label htmlFor="filter">Minimum dust value: </label>
      <input
        type="number"
        id="filter"
        className="input"
        onChange={(e) => setMinDustValue(parseInt(e.target.value))}
        />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Dust Value (Ilvl 84)</th>
            <th>Chaos Price</th>
            <th>Dust Per Chaos</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.dustValIlvl84}</td>
              <td>{item.chaosPrice ?? 'N/A'}</td>
              <td>{item.dustPerChaos ?? 'N/A'}</td>
              <td><a href={createTradeLink(item.name)} target='_blank'><button>Trade</button></a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}