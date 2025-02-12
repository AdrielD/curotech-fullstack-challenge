import { useEffect, useState,ReactElement } from "react";
import axios from "axios";
import { Item } from "../../../../models/item";

const UserInventoryList = (): ReactElement => {
  const userId = 1;
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    axios.get(`/api/user/${userId}/inventory`)
      .then((json) => {
        setItems(json.data);
      })
  }, []);

  return (
    <>
      <h3>Inventory</h3>
      { items?.map(item => (
        <div key={item.id}>
          {item.name} | Price: {item.price} | Left: {item.availableQty}
        </div>
      )) }
    </>
  );
};

export default UserInventoryList;
