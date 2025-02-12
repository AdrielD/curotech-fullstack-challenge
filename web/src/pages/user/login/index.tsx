import { ReactElement, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../contexts/user";

const UserLogin = (): ReactElement => {
  const { setUser } = useContext(UserContext);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // We'll emulate a login here, but just get the 
    // user and fill the context with it
    e.preventDefault();
    axios.get('/api/user/1')
      .then((json) => {
        setUser(json.data);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }

  return (
    <div>
      <h1>User Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input type="text" name="username" />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default UserLogin;
