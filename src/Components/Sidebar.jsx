




// src/Components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaBoxOpen, FaCoffee, FaUserTie, FaUserShield, FaUser } from 'react-icons/fa';

const Sidebar = () => {
    const links = [
        { name: 'Home', path: '/', icon: <FaHome /> },
        { name: 'Items', path: '/items', icon: <FaCoffee /> },
        { name: 'Orders', path: '/orders', icon: <FaBoxOpen /> },

        { name: 'Staff', path: '/staff', icon: <FaUserTie /> },
        { name: 'Roles', path: '/roles', icon: <FaUserShield /> },
        { name: 'Users', path: '/users', icon: <FaUser /> },
    ];

    return (
        <aside className="sticky top-0 hidden h-screen w-56 shrink-0 bg-[#5C4033] px-3 py-5 text-white shadow-2xl shadow-[#3C2A21]/30 md:block">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#3C2A21] text-lg shadow-lg shadow-[#3C2A21]/30">
                    <FaCoffee />
                </div>
                <div>
                    <h2 className="text-lg font-bold tracking-wide">Coffee Admin</h2>
                    <p className="text-xs font-medium text-white/60">Management Panel</p>
                </div>
            </div>

            <div className="my-6 border-t border-white/20"></div>

            <nav className="flex flex-col gap-2">
                {links.map((link) => (
                    <NavLink
                        key={link.name}
                        to={link.path}
                        className={({ isActive }) =>
                            `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition duration-200 ${isActive
                                ? 'bg-[#3C2A21] text-white shadow-lg shadow-[#3C2A21]/30'
                                : 'text-white/80 hover:bg-[#4A3224] hover:text-white'
                            }`
                        }
                        end
                    >
                        <span className="text-base text-white/80 transition group-hover:text-white">{link.icon}</span>
                        <span>{link.name}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
