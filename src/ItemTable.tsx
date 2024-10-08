import { Item } from './types';
import { createTradeLink } from './utils';

type tableProps = {
  items: Item[];
}

export default function ItemTable({ items }: tableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Dust Value</th>
          <th>Dust Value (Ilvl 84)</th>
          <th>Dust Value (Ilvl 84 Q20)</th>
          <th>Dust Per Slot</th>
          <th>Chaos Price</th>
          <th>Dust Per Chaos</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.dustVal}</td>
            <td>{item.dustValIlvl84}</td>
            <td>{item.dustValIlvl84Q20}</td>
            <td>{item.dustPerSlot}</td>
            <td>{item.chaosPrice ?? 'N/A'}</td>
            <td>{item.dustPerChaos ?? 'N/A'}</td>
            <td><a href={createTradeLink(item.name)} target='_blank'><button>Trade</button></a></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}