import { useState } from "react";

const initialStaff = [
  { staff_no: 1, full_name: "Ahmed Ali", tell: "0612345678", sex: "male", email: "ahmed@example.com" },
  { staff_no: 2, full_name: "Fartun Hassan", tell: "0623456789", sex: "female", email: "fartun@example.com" },
];

export default function Staff() {
  const [staffList, setStaffList] = useState(initialStaff);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    tell: "",
    sex: "female",
    email: "",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrEdit = () => {
    if (!formData.full_name || !formData.tell || !formData.email) return;

    if (isEditing) {
      setStaffList((prev) =>
        prev.map((staff) =>
          staff.staff_no === editId ? { ...staff, ...formData } : staff
        )
      );
    } else {
      const newStaff = {
        staff_no: staffList.length + 1,
        ...formData,
      };
      setStaffList([...staffList, newStaff]);
    }

    setFormData({ full_name: "", tell: "", sex: "female", email: "" });
    setIsEditing(false);
    setEditId(null);
    setShowModal(false);
  };

  const handleEdit = (staff) => {
    setFormData({
      full_name: staff.full_name,
      tell: staff.tell,
      sex: staff.sex,
      email: staff.email,
    });
    setEditId(staff.staff_no);
    setIsEditing(true);
    setShowModal(true);
  };

  const confirmDelete = (staff_no) => {
    setDeleteId(staff_no);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    setStaffList((prev) => prev.filter((s) => s.staff_no !== deleteId));
    setDeleteId(null);
    setShowDeleteModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#5C4033]/70">Team</p>
          <h1 className="text-3xl font-extrabold text-[#5C4033]">Staff Management</h1>
        </div>
        <button
          onClick={() => {
            setFormData({ full_name: "", tell: "", sex: "female", email: "" });
            setIsEditing(false);
            setShowModal(true);
          }}
          className="rounded-xl bg-[#5C4033] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5C4033]/20 transition hover:bg-[#4A3224]"
        >
          + Add Staff
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#5C4033]/10 bg-white shadow-xl shadow-[#5C4033]/5">
        <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-[#f8f6f4] text-xs uppercase tracking-wide text-[#5C4033]">
            <tr>
              <th className="px-5 py-4 text-left font-bold">Staff No</th>
              <th className="px-5 py-4 text-left font-bold">Full Name</th>
              <th className="px-5 py-4 text-left font-bold">Tell</th>
              <th className="px-5 py-4 text-left font-bold">Sex</th>
              <th className="px-5 py-4 text-left font-bold">Email</th>
              <th className="px-5 py-4 text-center font-bold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#5C4033]/10">
            {staffList.map((s) => (
              <tr key={s.staff_no} className="text-sm transition hover:bg-[#FFF8F0]">
                <td className="px-5 py-4 font-semibold">{s.staff_no}</td>
                <td className="px-5 py-4">{s.full_name}</td>
                <td className="px-5 py-4">{s.tell}</td>
                <td className="px-5 py-4 capitalize">{s.sex}</td>
                <td className="px-5 py-4">{s.email}</td>
                <td className="px-5 py-4 text-center">
                  <button
                    onClick={() => handleEdit(s)}
                    className="mr-2 rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(s.staff_no)}
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
              {isEditing ? "Edit Staff" : "Add Staff"}
            </h2>
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleInputChange}
              className="mb-3 w-full rounded-xl border border-[#5C4033]/20 px-4 py-3 outline-none transition focus:border-[#5C4033] focus:ring-4 focus:ring-[#5C4033]/10"
            />
            <input
              type="text"
              name="tell"
              placeholder="Telephone"
              value={formData.tell}
              onChange={handleInputChange}
              className="mb-3 w-full rounded-xl border border-[#5C4033]/20 px-4 py-3 outline-none transition focus:border-[#5C4033] focus:ring-4 focus:ring-[#5C4033]/10"
            />
            <select
              name="sex"
              value={formData.sex}
              onChange={handleInputChange}
              className="mb-3 w-full rounded-xl border border-[#5C4033]/20 px-4 py-3 outline-none transition focus:border-[#5C4033] focus:ring-4 focus:ring-[#5C4033]/10"
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="mb-5 w-full rounded-xl border border-[#5C4033]/20 px-4 py-3 outline-none transition focus:border-[#5C4033] focus:ring-4 focus:ring-[#5C4033]/10"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-xl bg-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrEdit}
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
            <p className="mb-6 text-sm text-gray-600">Are you sure you want to delete this staff member?</p>
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
