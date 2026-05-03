import React, { useState } from "react";

const initialItems = [
  { item_id: 1, name: "Espresso", price: 2.5, category: "Hot", quantity: 10 },
  { item_id: 2, name: "Iced Latte", price: 3.0, category: "Cold", quantity: 5 },
];

const Items = () => {
  const [items, setItems] = useState(initialItems);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Hot",
    quantity: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrEdit = () => {
    const { name, price, category, quantity } = formData;
    if (!name || !price || !category || !quantity) return;

    if (isEditing) {
      setItems((prev) =>
        prev.map((item) =>
          item.item_id === editId
            ? {
                ...item,
                name,
                category,
                price: parseFloat(price),
                quantity: parseInt(quantity),
              }
            : item
        )
      );
    } else {
      const newItem = {
        item_id: items.length + 1,
        name,
        price: parseFloat(price),
        category,
        quantity: parseInt(quantity),
      };
      setItems([...items, newItem]);
    }

    setFormData({ name: "", price: "", category: "Hot", quantity: "" });
    setShowModal(false);
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      price: item.price.toString(),
      category: item.category,
      quantity: item.quantity.toString(),
    });
    setEditId(item.item_id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.item_id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#5C4033]/70">Menu</p>
          <h1 className="text-3xl font-extrabold text-[#5C4033]">Items</h1>
        </div>
        <button
          onClick={() => {
            setFormData({ name: "", price: "", category: "Hot", quantity: "" });
            setShowModal(true);
            setIsEditing(false);
          }}
          className="rounded-xl bg-[#5C4033] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5C4033]/20 transition hover:bg-[#4A3224]"
        >
          + Add Item
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#5C4033]/10 bg-white shadow-xl shadow-[#5C4033]/5">
        <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-[#f8f6f4] text-xs uppercase tracking-wide text-[#5C4033]">
            <tr>
              <th className="px-5 py-4 text-left font-bold">Item ID</th>
              <th className="px-5 py-4 text-left font-bold">Name</th>
              <th className="px-5 py-4 text-left font-bold">Category</th>
              <th className="px-5 py-4 text-left font-bold">Price ($)</th>
              <th className="px-5 py-4 text-left font-bold">Quantity</th>
              <th className="px-5 py-4 text-center font-bold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#5C4033]/10">
            {items.map((item) => (
              <tr key={item.item_id} className="text-sm transition hover:bg-[#FFF7F0]">
                <td className="px-5 py-4 font-semibold">{item.item_id}</td>
                <td className="px-5 py-4">{item.name}</td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-[#FFF8F0] px-3 py-1 text-xs font-semibold text-[#5C4033]">{item.category}</span>
                </td>
                <td className="px-5 py-4 font-semibold">${item.price.toFixed(2)}</td>
                <td className="px-5 py-4">{item.quantity}</td>
                <td className="px-5 py-4 text-center">
                  <button
                    onClick={() => handleEdit(item)}
                    className="mr-2 rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.item_id)}
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="mb-5 text-xl font-bold text-[#5C4033]">
              {isEditing ? "Edit Item" : "Add New Item"}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                placeholder="Item Name"
                value={formData.name}
                onChange={handleInputChange}
                className="rounded-xl border border-[#5C4033]/20 px-4 py-3 outline-none transition focus:border-[#5C4033] focus:ring-4 focus:ring-[#5C4033]/10"
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="rounded-xl border border-[#5C4033]/20 px-4 py-3 outline-none transition focus:border-[#5C4033] focus:ring-4 focus:ring-[#5C4033]/10"
              >
                <option value="Hot">Hot</option>
                <option value="Cold">Cold</option>
                <option value="Snack">Snack</option>
              </select>
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleInputChange}
                className="rounded-xl border border-[#5C4033]/20 px-4 py-3 outline-none transition focus:border-[#5C4033] focus:ring-4 focus:ring-[#5C4033]/10"
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="rounded-xl border border-[#5C4033]/20 px-4 py-3 outline-none transition focus:border-[#5C4033] focus:ring-4 focus:ring-[#5C4033]/10"
              />
            </div>
            <div className="mt-6 flex justify-end gap-3">
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

export default Items;
