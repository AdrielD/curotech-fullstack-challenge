import { ReactElement, useContext } from "react";
import { useNavigate  } from 'react-router';
import { UserContext } from "../../../contexts/user";

const UserLogout = (): ReactElement => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  const handleClick = (e: React.FormEvent<HTMLButtonElement>) => {
    // For logout, we just clear the context
    e.preventDefault();
    setUser(null);
    navigate('/login');
  }

  return (
    <button onClick={handleClick}>Logout</button>
  );
};

export default UserLogout;
