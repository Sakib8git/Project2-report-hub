import React, { useState } from "react";
import { imageUplode } from "../../utils";

const StaffModal = ({
  isOpen,
  close,
  title,
  fields,
  formData,
  setFormData,
  onConfirm,
}) => {
  const [uploading, setUploading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;
    setUploading(true);
    try {
      const imageUrl = await imageUplode(imageFile);
      setFormData((prev) => ({ ...prev, photo: imageUrl }));
    } catch (err) {
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.role
    ) {
      alert("Please fill all required fields");
      return;
    }
    onConfirm();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium capitalize mb-1">
                {field}
              </label>
              {field === "role" ? (
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="staff">Staff</option>
                </select>
              ) : field === "photo" ? (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border px-3 py-2 rounded"
                  />
                  {uploading && (
                    <p className="text-sm text-gray-500">Uploading...</p>
                  )}
                  {formData.photo && (
                    <img
                      src={formData.photo}
                      alt="Preview"
                      className="h-16 w-16 rounded-full object-cover mt-2"
                    />
                  )}
                </>
              ) : (
                <input
                  type={field === "password" ? "password" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              )}
            </div>
          ))}

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={close}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffModal;
