import { StrictMode, useContext } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import axios from 'axios';
import { UserContext, UserProvider } from './contexts/user';
import UserInventoryList from "./pages/user/inventory/list";
import UserInventoryEdit from './pages/user/inventory/edit';
import UserInventoryCreate from './pages/user/inventory/create';
import UserLogin from './pages/user/login';

axios.defaults.baseURL = `http://localhost:4000`;

const OpenRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<UserLogin />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

const AuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route path="/inventory" element={<UserInventoryList />} />
      <Route path="/inventory/:itemId/edit" element={<UserInventoryEdit />} />
      <Route path="/inventory/create" element={<UserInventoryCreate />} />
      <Route path="*" element={<Navigate to="/inventory" replace />} />
    </Routes>
  );
}

const App = () => {
  const user = useContext(UserContext).user;
  return user ? <AuthenticatedRoutes /> : <OpenRoutes />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </StrictMode>,
);
