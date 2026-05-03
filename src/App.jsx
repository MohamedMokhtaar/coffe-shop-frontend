




// src/App.jsx
import React, { useState } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';

import Home from './Pages/Home';
import Orders from './Pages/Orders';
import Items from './Pages/Items';
import Staff from './Pages/Staff';
import Roles from './Pages/Roles';
import Users from './Pages/Users';
import Login from './Pages/Login';
import Profile from './Pages/Profile';

const App = () => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('coffeeUser');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      localStorage.removeItem('coffeeUser');
      return null;
    }
  });

  const mobileLinks = [
    { name: 'Home', path: '/' },
    { name: 'Items', path: '/items' },
    { name: 'Orders', path: '/orders' },
    { name: 'Staff', path: '/staff' },
    { name: 'Roles', path: '/roles' },
    { name: 'Users', path: '/users' },
  ];

  const handleLogin = (user) => {
    localStorage.setItem('coffeeUser', JSON.stringify(user));
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('coffeeUser');
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-[#FFF8F0] text-[#2B1C16]">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header currentUser={currentUser} onLogout={handleLogout} />
        <nav className="flex gap-2 overflow-x-auto border-b border-[#5C4033]/10 bg-white px-4 py-3 md:hidden">
          {mobileLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end
              className={({ isActive }) =>
                `shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${isActive
                  ? 'bg-[#5C4033] text-white'
                  : 'bg-[#FFF8F0] text-[#5C4033] hover:bg-[#4A3224] hover:text-white'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-9">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items" element={<Items />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/users" element={<Users />} />
            <Route path="/profile" element={<Profile currentUser={currentUser} />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
