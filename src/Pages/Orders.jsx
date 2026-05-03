import React, { useState } from "react";

const initialOrders = [
  { id: 1001, item_no: 1, quantity: 2, total: 5.0, status: "Pending" },
  { id: 1002, item_no: 2, quantity: 1, total: 2.5, status: "Completed" },
];

const Orders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    item_no: "",
    quantity: 1,
    total: 2.5,
    status: "Pending",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };

    if (name === "quantity") {
      updated.total = parseFloat(value || 1) * 2.5;
    }

    setFormData(updated);
  };

  const handleAddOrEdit = () => {
    if (!formData.id || !formData.item_no || !formData.quantity) return;

    const newOrder = {
      ...formData,
      id: parseInt(formData.id),
      item_no: parseInt(formData.item_no),
      quantity: parseInt(formData.quantity),
      total: parseFloat((formData.quantity * 2.5).toFixed(2)),
    };

    if (isEditing) {
      setOrders((prev) =>
        prev.map((order) => (order.id === editId ? newOrder : order))
      );
    } else {
      setOrders([...orders, newOrder]);
    }

    setShowModal(false);
    setIsEditing(false);
    setEditId(null);
    setFormData({ id: "", item_no: "", quantity: 1, total: 2.5, status: "Pending" });
  };

  const handleEdit = (order) => {
    setFormData({ ...order });
    setEditId(order.id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#5C4033]/70">Sales</p>
          <h1 className="text-3xl font-extrabold text-[#5C4033]">Orders</h1>
        </div>
        <button
          onClick={() => {
            setFormData({ id: "", item_no: "", quantity: 1, total: 2.5, status: "Pending" });
            setIsEditing(false);
            setShowModal(true);
          }}
          className="rounded-xl bg-[#5C4033] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5C4033]/20 transition hover:bg-[#4A3224]"
        >
          + Create Order
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-[#5C4033]/10 bg-white shadow-xl shadow-[#5C4033]/5">
        <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-[#f8f6f4] text-xs uppercase tracking-wide text-[#5C4033]">
            <tr className="text-left">
              <th className="px-5 py-4 font-bold">Order ID</th>
              <th className="px-5 py-4 font-bold">Item No</th>
              <th className="px-5 py-4 font-bold">Quantity</th>
              <th className="px-5 py-4 font-bold">Total</th>
              <th className="px-5 py-4 font-bold">Status</th>
              <th className="px-5 py-4 text-center font-bold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#5C4033]/10">
            {orders.map((order) => (
              <tr key={order.id} className="text-sm transition hover:bg-[#FFF8F0]">
                <td className="px-5 py-4 font-semibold">{order.id}</td>
                <td className="px-5 py-4">{order.item_no}</td>
                <td className="px-5 py-4">{order.quantity}</td>
                <td className="px-5 py-4 font-semibold">${order.total.toFixed(2)}</td>
                <td className="px-5 py-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-center">
                  <button
                    onClick={() => handleEdit(order)}
                    className="mr-2 rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
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
              {isEditing ? "Edit Order" : "Create Order"}
            </h2>

            {["id", "item_no", "quantity"].map((field) => (
              <input
                key={field}
                type="number"
                name={field}
                placeholder={field.replace("_", " ").toUpperCase()}
                value={formData[field]}
                onChange={handleInputChange}
                className="mb-3 w-full rounded-xl border border-[#5C4033]/20 px-4 py-3 outline-none transition focus:border-[#5C4033] focus:ring-4 focus:ring-[#5C4033]/10"
                disabled={field === "id" && isEditing}
              />
            ))}

            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="mb-5 w-full rounded-xl border border-[#5C4033]/20 px-4 py-3 outline-none transition focus:border-[#5C4033] focus:ring-4 focus:ring-[#5C4033]/10"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>

            {/* <div className="text-sm text-right text-gray-600 mb-2">
              Total: ${formData.total.toFixed(2)}
            </div> */}

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
    </div>
  );
};

export default Orders;
