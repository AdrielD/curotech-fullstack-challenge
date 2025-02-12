import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import axios from 'axios';
import UserInventoryList from "./pages/user/inventory/list";
import UserInventoryEdit from './pages/user/inventory/edit';
import UserInventoryCreate from './pages/user/inventory/create';

axios.defaults.baseURL = `http://localhost:4000`;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/inventory" element={<UserInventoryList />} />
        <Route path="/inventory/:itemId/edit" element={<UserInventoryEdit />} />
        <Route path="/inventory/create" element={<UserInventoryCreate />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
