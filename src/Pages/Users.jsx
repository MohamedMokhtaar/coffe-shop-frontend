import { useState } from "react";

const initialUsers = [
  { user_id: 1, Staff_No: 101, username: "admin", password: "admin123", role_no: 1 },
  { user_id: 2, Staff_No: 102, username: "john", password: "john123", role_no: 2 },
  { user_id: 3, Staff_No: 103, username: "jane", password: "jane123", role_no: 2 },
];

const staffOptions = [
  { staff_no: 101, name: "Ahmed Ali" },
  { staff_no: 102, name: "Fartun Hassan" },
  { staff_no: 103, name: "Mohamed Noor" },
  { staff_no: 104, name: "Asha Osman" },
];

export default function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    Staff_No: "",
    username: "",
    password: "",
    role_no: "",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrEditUser = () => {
    if (!formData.Staff_No || !formData.username || !formData.password || !formData.role_no) return;

    if (isEditing) {
      setUsers((prev) =>
        prev.map((user) =>
          user.user_id === editId
            ? {
              ...user,
              ...formData,
              Staff_No: parseInt(formData.Staff_No),
              role_no: parseInt(formData.role_no),
            }
            : user
        )
      );
    } else {
      const newUser = {
        user_id: users.length + 1,
        Staff_No: parseInt(formData.Staff_No),
        username: formData.username,
        password: formData.password,
        role_no: parseInt(formData.role_no),
      };
      setUsers([...users, newUser]);
    }

    setFormData({ Staff_No: "", username: "", password: "", role_no: "" });
    setShowModal(false);
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (user) => {
    setFormData({
      Staff_No: user.Staff_No.toString(),
      username: user.username,
      password: user.password,
      role_no: user.role_no.toString(),
    });
    setEditId(user.user_id);
    setIsEditing(true);
    setShowModal(true);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    setUsers((prev) => prev.filter((u) => u.user_id !== deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const getStaffName = (staffNo) => {
    return staffOptions.find((staff) => staff.staff_no === staffNo)?.name || "Unknown Staff";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#5C4033]/70">Access</p>
          <h1 className="text-3xl font-extrabold text-[#5C4033]">Manage Users</h1>
        </div>
        <button
          onClick={() => {
            setFormData({ Staff_No: "", username: "", password: "", role_no: "" });
            setIsEditing(false);
            setShowModal(true);
          }}
          className="rounded-xl bg-[#5C4033] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5C4033]/20 transition hover:bg-[#4A3224]"
        >
          + Add User
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-[#5C4033]/10 bg-white shadow-xl shadow-[#5C4033]/5">
        <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-[#f8f6f4] text-xs uppercase tracking-wide text-[#5C4033]">
            <tr className="text-left">
              <th className="px-5 py-4 font-bold">ID</th>
              <th className="px-5 py-4 font-bold">Staff No</th>
              <th className="px-5 py-4 font-bold">Staff Name</th>
              <th className="px-5 py-4 font-bold">Username</th>
              <th className="px-5 py-4 font-bold">Password</th>
              <th className="px-5 py-4 font-bold">Role No</th>
              <th className="px-5 py-4 text-center font-bold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#5C4033]/10">
            {users.map((user) => (
              <tr key={user.user_id} className="text-sm transition hover:bg-[#FFF7F0]">
                <td className="px-5 py-4 font-semibold">{user.user_id}</td>
                <td className="px-5 py-4">{user.Staff_No}</td>
                <td className="px-5 py-4 font-semibold">{getStaffName(user.Staff_No)}</td>
                <td className="px-5 py-4 font-semibold">{user.username}</td>
                <td className="px-5 py-4">********</td>
                <td className="px-5 py-4">{user.role_no}</td>
                <td className="px-5 py-4 text-center">
                  <button
                    onClick={() => handleEdit(user)}
                    className="mr-2 rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(user.user_id)}
                    className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="mb-5 text-xl font-bold text-[#5C4033]">
              {isEditing ? "Edit User" : "Add New User"}
            </h2>
            <select
              name="Staff_No"
              value={formData.Staff_No}
              onChange={handleInputChange}
              className="mb-3 w-full rounded-xl border border-[#5C4033]/20 px-4 py-3 outline-none transition focus:border-[#5C4033] focus:ring-4 focus:ring-[#5C4033]/10"
            >
              <option value="">Select staff name</option>
              {staffOptions.map((staff) => (
                <option key={staff.staff_no} value={staff.staff_no}>
                  {staff.name} - Staff No {staff.staff_no}
                </option>
              ))}
            </select>

            {["username", "password", "role_no"].map((field) => (
              <input
                key={field}
                type={field === "role_no" ? "number" : "text"}
                name={field}
                placeholder={field.replace("_", " ").toUpperCase()}
                value={formData[field]}
                onChange={handleInputChange}
                className="mb-3 w-full rounded-xl border border-[#5C4033]/20 px-4 py-3 outline-none transition focus:border-[#5C4033] focus:ring-4 focus:ring-[#5C4033]/10"
              />
            ))}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-xl bg-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrEditUser}
                className="rounded-xl bg-[#5C4033] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4A3224]"
              >
                {isEditing ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">
            <h2 className="mb-3 text-xl font-bold text-[#5C4033]">Confirm Deletion</h2>
            <p className="mb-6 text-sm text-gray-600">Are you sure you want to delete this user?</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="rounded-xl bg-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
