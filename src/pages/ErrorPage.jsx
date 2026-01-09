import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Button from "../components/Shared/Button/Button";
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white">
      <div className="container flex flex-col items-center justify-center min-h-screen px-2 py-6 mx-auto">
        {/* ✅ Lottie Animation */}
        <div className="w-84 h-84 mb-6">
          <DotLottieReact
            src="https://lottie.host/0737b6f2-61d0-42e1-bade-3ab5728314aa/mggbgGkXy5.lottie"
            loop
            autoplay
          />
        </div>

        {/* Error Content */}
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <h1 className=" text-2xl font-semibold text-gray-800 md:text-3xl">
            404
          </h1>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
            Page Not Found
          </h1>
          <p className="mt-4 text-gray-500">Here are some helpful links:</p>

          {/* Buttons */}
          <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
            <Button label={"⬅️Go Back"} onClick={() => navigate(-1)} />
            <Button label={"Take Me Home"} onClick={() => navigate("/")} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
