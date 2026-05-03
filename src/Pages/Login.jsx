import { useState } from "react";
import fakeAvatar from "../assets/women.jfif";

export default function Login({ onLogin }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      name: formData.username || "Moha",
      username: formData.username || "moha",
      role: "Coffee Admin",
      email: "admin@maandeeqcoffee.local",
      phone: "0612345678",
      avatar: fakeAvatar,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#5C4033] px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl shadow-[#3C2A21]/30">
        <div className="mb-7 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#5C4033]/70">Maandeeq Coffee</p>
          <h2 className="mt-2 text-3xl font-extrabold text-[#5C4033]">Welcome Back</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-[#5C4033]/20 px-4 py-3 outline-none transition focus:border-[#5C4033] focus:ring-4 focus:ring-[#5C4033]/10"
              required
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-[#5C4033]/20 px-4 py-3 pr-10 outline-none transition focus:border-[#5C4033] focus:ring-4 focus:ring-[#5C4033]/10"
              required
            />
            {/* Eye Icon button */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 top-7 flex items-center pr-3 text-gray-500 transition hover:text-[#5C4033] focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? (
                // Eye Off Icon (Hide)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10.94 10.94 0 0112 20c-5.523 0-10-4.477-10-10a10.94 10.94 0 012.06-6.06" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                // Eye Icon (Show)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-[#5C4033] py-3 font-semibold text-white shadow-lg shadow-[#5C4033]/20 transition hover:bg-[#4A3224]"
          >
            Sign In
          </button>
        </form>
        <p className="mt-5 text-center text-sm text-gray-600">
          Don't have an account? <span className="cursor-pointer font-semibold text-[#5C4033] hover:underline">Register</span>
        </p>
      </div>
    </div>
  );
}
