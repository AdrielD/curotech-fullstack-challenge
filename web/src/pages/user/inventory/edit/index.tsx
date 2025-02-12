import { useEffect, useState,ReactElement } from "react";
import { NavLink, useParams } from "react-router";
import axios from "axios";
import { Item } from "../../../../models/item";

const UserInventoryEdit = (): ReactElement | null => {
  let { itemId } = useParams();

  const userId = 1;
  const [item, setItem] = useState<Item>();

  useEffect(() => {
    axios.get(`/api/user/${userId}/inventory/${itemId}`)
      .then((json) => {
        setItem(json.data);
      })
  }, []);

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.put(`/api/user/${userId}/inventory/${itemId}`, {
      name: item?.name,
      price: item?.price,
      availableQty: item?.availableQty,
    }).then(() => {
      alert('Item updated!');
    });
  }

  if (!item) return null;

  return (
    <>
      <form onSubmit={handleUpdate}>
        <div>
          <label htmlFor="item_name">Name: </label>
          <input
            name="item_name"
            type="text"
            value={item.name}
            onChange={(e) => setItem({...item, name: e.target.value})} />
        </div>
        <div>
          <label htmlFor="item_price">Price: </label>
          <input
            name="item_price"
            type="number"
            value={item.price}
            onChange={(e) => setItem({...item, price: Number(e.target.value)})} />
        </div>
        <div>
          <label htmlFor="item_qty">Left: </label>
          <input
            name="item_qty"
            type="number"
            value={item.availableQty}
            onChange={(e) => setItem({...item, availableQty: Number(e.target.value)})} />
        </div>
        <button type="submit">Update</button>
      </form>

      <NavLink to="/inventory">Go back</NavLink>
    </>
  );
};

export default UserInventoryEdit;
