import { Dialog, DialogPanel, DialogTitle, Button } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function ProfileModal({
  isOpen,
  close,
  initialData,
  onConfirm,
}) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      displayName: initialData?.displayName || "",
    },
  });

  const [preview, setPreview] = useState(initialData?.photoURL || "");

  const submitForm = (data) => {
    // handle file upload
    if (data.photo && data.photo[0]) {
      data.photoURL = URL.createObjectURL(data.photo[0]); // preview URL (later backend upload)
    } else {
      data.photoURL = initialData?.photoURL || "";
    }

    onConfirm(data);
    reset();
    close();
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <DialogTitle
              as="h3"
              className="text-lg font-bold text-gray-800 mb-4"
            >
              Update Profile
            </DialogTitle>

            <form onSubmit={handleSubmit(submitForm)}>
              {/* Name */}
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  {...register("displayName", { required: true })}
                  className="border px-3 py-2 rounded w-full"
                />
              </div>

              {/* Photo Upload */}
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">
                  Profile Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("photo")}
                  className="border px-3 py-2 rounded w-full"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      setPreview(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                />
              </div>

              {/* Preview */}
              {preview && (
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-1">Preview:</p>
                  <img
                    src={preview}
                    alt="preview"
                    className="h-20 w-20 rounded-full object-cover border"
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-3 mt-4">
                <Button
                  type="button"
                  onClick={close}
                  className="bg-gray-400 px-4 py-2 rounded text-white hover:bg-gray-600"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-lime-500 px-4 py-2 rounded text-white hover:bg-lime-700"
                >
                  Save
                </Button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
