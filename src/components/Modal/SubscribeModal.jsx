import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// import toast from "react-hot-toast";
// import axios from "axios";

const SubscribeModal = ({ isOpen, onClose, profile }) => {
  const { _id, name, status, email, image } = profile;
  const axiosSecure = useAxiosSecure();

  const handlepayment = async () => {
    const paymentInfo = {
      citizenId: _id,
      name,
      email,
      status,
      image,
      charge: 1000,
    };

    const { data } = await axiosSecure.post(
      `/create-checkout-session`,
      paymentInfo
    );
    // console.log(data.url);
    window.location.href = data.url;
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={onClose}
    >
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <DialogTitle
              as="h3"
              className="text-lg font-semibold text-gray-800 mb-4"
            >
              Subscription Payment
            </DialogTitle>

            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Name:</strong> {name}
              </p>
              <p>
                <strong>Email:</strong> {email}
              </p>
              <p>
                <strong>Status:</strong> {status}
              </p>
              <p>
                <strong>Charge:</strong> 1000 tk
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-700"
                onClick={() => {
                  handlepayment();
                  onClose();
                }}
              >
                Confirm Payment
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default SubscribeModal;
