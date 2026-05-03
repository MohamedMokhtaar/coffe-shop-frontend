import React from "react";
import fakeAvatar from "../assets/women.jfif";

export default function Profile({ currentUser }) {
  const displayName = currentUser?.name || "Moha";
  const avatar = currentUser?.avatar || fakeAvatar;

  return (
    <div className="min-h-[calc(100vh-8rem)] space-y-6 rounded-2xl bg-white p-6 text-black">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Account</p>
        <h1 className="text-3xl font-extrabold text-black">Profile</h1>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 bg-white px-6 py-8 text-black">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <img
              src={avatar}
              alt={displayName}
              className="h-24 w-24 rounded-2xl border border-gray-200 object-cover shadow-sm"
            />
            <div>
              <h2 className="text-2xl font-extrabold">{displayName}</h2>
              <p className="mt-1 text-sm font-medium text-gray-600">{currentUser?.role || "Coffee Admin"}</p>
              <p className="mt-2 text-sm font-medium text-gray-700">{currentUser?.email || "admin@maandeeqcoffee.local"}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Username</p>
            <p className="mt-2 text-lg font-bold text-black">{currentUser?.username || "moha"}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Email</p>
            <p className="mt-2 text-lg font-bold text-black">{currentUser?.email || "admin@maandeeqcoffee.local"}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Role</p>
            <p className="mt-2 text-lg font-bold text-black">{currentUser?.role || "Coffee Admin"}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Phone</p>
            <p className="mt-2 text-lg font-bold text-black">{currentUser?.phone || "0612345678"}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Status</p>
            <p className="mt-2 text-lg font-bold text-green-700">Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}
