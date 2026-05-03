import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fakeAvatar from "../assets/women.jfif";

export default function Header({ currentUser, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const displayName = currentUser?.name || currentUser?.username || "Moha";
  const avatar = currentUser?.avatar || fakeAvatar;

  const handleProfile = () => {
    setIsOpen(false);
    navigate("/profile");
  };

  const handleLogout = () => {
    setIsOpen(false);
    navigate("/");
    onLogout();
  };

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[#5C4033]/10 bg-white/95 px-4 py-4 shadow-sm backdrop-blur sm:px-6 lg:px-9">
      <div>
        <div className="text-lg font-extrabold tracking-wide text-black sm:text-2xl">
          Maandeeq <span className="text-[#5C4033]">Coffee</span> Management System
        </div>
        <p className="mt-1 hidden text-xs font-medium text-[#5C4033]/70 sm:block">
          Clean daily operations dashboard
        </p>
      </div>

      <div className="relative flex items-center gap-3">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-12 items-center gap-3 rounded-full bg-[#5C4033] py-1 pl-1 pr-4 text-sm font-semibold text-white shadow-md shadow-[#5C4033]/20 transition hover:bg-[#4A3224]"
        >
          <img
            src={avatar}
            alt={displayName}
            className="h-10 w-10 rounded-full border-2 border-white/70 object-cover"
          />
          <span className="hidden sm:inline">{displayName}</span>
          <span className="text-xs text-white/70">v</span>
        </button>

        {isOpen && (
          <div className="absolute right-0 top-14 w-64 overflow-hidden rounded-2xl border border-[#5C4033]/10 bg-white shadow-2xl shadow-[#5C4033]/15">
            <div className="flex items-center gap-3 border-b border-[#5C4033]/10 px-4 py-4">
              <img
                src={avatar}
                alt={displayName}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-bold text-[#5C4033]">{displayName}</p>
                <p className="text-xs text-gray-500">{currentUser?.role || "Coffee Admin"}</p>
              </div>
            </div>
            <button
              onClick={handleProfile}
              className="block w-full px-4 py-3 text-left text-sm font-semibold text-black transition hover:bg-gray-100"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
