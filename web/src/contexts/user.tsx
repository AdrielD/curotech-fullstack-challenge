import { createContext, useState } from 'react';
import { User } from '../models/user';

const UserContext = createContext<{
  user: User | null,
  setUser: (user: User | null) => void,
}>({
  user: null,
  setUser: () => {},
});

// For now, until propper auth is added, we use localStorage to simulate a session
// Of course, this would not be used in a real production application
const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const savedUser = localStorage.getItem('user');
  const [user, setUser] = useState<User | null>(savedUser ? JSON.parse(savedUser) : null);

  const handleSetUser = (user: User | null) => {
    setUser(user);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
      setUser(null);
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser: handleSetUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
