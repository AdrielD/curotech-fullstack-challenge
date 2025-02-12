import { useState,ReactElement, useContext } from "react";
import { NavLink } from "react-router";
import axios from "axios";
import { Item } from "../../../../models/item";
import { UserContext } from "../../../../contexts/user";

const UserInventoryCreate = (): ReactElement | null => {
  const emptyItem = { name: '', price: 0, availableQty: 0 }
  const userId = useContext(UserContext).user?.id;
  const [item, setItem] = useState<Omit<Item, 'id'>>(emptyItem);

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post(`/api/user/${userId}/inventory/`, {
      name: item?.name,
      price: item?.price,
      availableQty: item?.availableQty,
    }).then(() => {
      alert('Item created!');
      setItem(emptyItem);
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
  }

  return (
    <>
      <form onSubmit={handleCreate}>
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
        <button type="submit">Create</button>
      </form>

      <NavLink to="/inventory">Go back</NavLink>
    </>
  );
};

export default UserInventoryCreate;
