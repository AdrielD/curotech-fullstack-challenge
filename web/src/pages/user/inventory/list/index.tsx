import { useEffect, useState,ReactElement, useContext } from "react";
import axios from "axios";
import { Item } from "../../../../models/item";
import { NavLink, useNavigate } from "react-router";
import { UserContext } from "../../../../contexts/user";
import UserLogout from "../../logout";

const UserInventoryList = (): ReactElement => {
  const userId = useContext(UserContext).user?.id;
  const [items, setItems] = useState<Item[]>([]);

  const fetchItems = () => {
    axios.get(`/api/user/${userId}/inventory`)
      .then((json) => {
        setItems(json.data);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const handleDeletion = (itemId: number) => {
    axios.delete(`/api/user/${userId}/inventory/${itemId}`)
      .then(() => {
        alert('Item deleted!');
        fetchItems();
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  useEffect(() => fetchItems, []);
  const navigate = useNavigate();

  return (
    <>
      <h3>Inventory</h3>
      <button onClick={() => {
        navigate('/inventory/create');
      }}>Create new item</button>
      { items?.map(item => (
        <div key={item.id}>
          <NavLink to={`/inventory/${item.id}/edit`}>{item.name}</NavLink> | Price: {item.price} | Left: {item.availableQty}
          <span style={{ color: '#F00', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => handleDeletion(item.id)}> X </span>
        </div>
      )) }
      <UserLogout />
    </>
  );
};

export default UserInventoryList;
