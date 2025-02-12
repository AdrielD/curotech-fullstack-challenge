import { useEffect, useState,ReactElement } from "react";
import axios from "axios";
import { Item } from "../../../../models/item";
import { NavLink } from "react-router";

const UserInventoryList = (): ReactElement => {
  const userId = 1;
  const [items, setItems] = useState<Item[]>([]);

  const fetchItems = () => {
    axios.get(`/api/user/${userId}/inventory`)
      .then((json) => {
        setItems(json.data);
      });
  };

  const handleDeletion = (itemId: number) => {
    axios.delete(`/api/user/${userId}/inventory/${itemId}`)
      .then(() => {
        alert('Item deleted!');
        fetchItems();
      });
  };

  useEffect(() => fetchItems, []);

  return (
    <>
      <h3>Inventory</h3>
      { items?.map(item => (
        <div key={item.id}>
          <NavLink to={`/inventory/${item.id}/edit`}>{item.name}</NavLink> | Price: {item.price} | Left: {item.availableQty}
          <span style={{ color: '#F00', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => handleDeletion(item.id)}> X </span>
        </div>
      )) }
    </>
  );
};

export default UserInventoryList;
