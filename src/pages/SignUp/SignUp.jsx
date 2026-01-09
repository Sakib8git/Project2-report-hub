import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { imageUplode } from "../../utils";

const SignUp = () => {
  const { createUser, updateUserProfile, loading, logOut } = useAuth();
  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // useForm handeler
  // const onSubmit = async (data) => {
  //   const { name, image, email, password } = data;
  //   const imageFile = image[0];
  //   try {
  //     const imageURL = await imageUplode(imageFile);
  //     const result = await createUser(email, password);
  //     // await saveOrUpdateUser({ name, email, image: imageURL });
  //     await updateUserProfile(name, imageURL);
  //     // navigate(from, { replace: true });
  //     toast.success("Signup Successful");
  //     navigate("/login");
  //     logOut();
  //     console.log(result);
  //   } catch (err) {
  //     console.log(err);
  //     toast.error(err?.message);
  //   }
  // };
  // form submit handler
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const form = event.target;
  //   const name = form.name.value;
  //   const email = form.email.value;
  //   const password = form.password.value;

  //   try {
  //     //2. User Registration
  //     const result = await createUser(email, password);

  //     //3. Save username & profile photo
  //     await updateUserProfile(
  //       name,
  //       "https://lh3.googleusercontent.com/a/ACg8ocKUMU3XIX-JSUB80Gj_bYIWfYudpibgdwZE1xqmAGxHASgdvCZZ=s96-c"
  //     );
  //     console.log(result);

  //     navigate(from, { replace: true });
  //     toast.success("Signup Successful");
  //   } catch (err) {
  //     console.log(err);
  //     toast.error(err?.message);
  //   }
  // };

  // Handle Google Signin
  // const handleGoogleSignIn = async () => {
  //   try {
  //     //User Registration using google
  //     await signInWithGoogle()

  //     navigate(from, { replace: true })
  //     toast.success('Signup Successful')
  //   } catch (err) {
  //     console.log(err)
  //     toast.error(err?.message)
  //   }
  // }
  const onSubmit = async (data) => {
    const { name, image, email, password } = data;
    const imageFile = image[0];
    try {
      const imageURL = await imageUplode(imageFile);
      const result = await createUser(email, password);

      await updateUserProfile(name, imageURL);

      // ✅ Save citizen in DB
      const citizenData = {
        name,
        email,
        image: imageURL,
        role: "citizen",
        status: "normal",
        action: "unblock",
        createdAt: new Date(),
      };

      await fetch(`${import.meta.env.VITE_API_URL}/citizen`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(citizenData),
      });

      toast.success("Signup Successful");
      navigate("/login");
      logOut();
      console.log(result);
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to ReportHub</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=""
          action=""
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
                {...register("name", {
                  required: "Name is required",
                  maxLength: 20,
                })}
              />
              {errors.name && (
                <p className="text-red-500 mt-1">{errors.name.message}</p>
              )}
            </div>
            {/* Image */}
            <div>
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Profile Image
              </label>
              <input
                name="image"
                type="file"
                id="image"
                accept="image/*"
                className="block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-lime-50 file:text-lime-700
      hover:file:bg-lime-100
      bg-gray-100 border border-dashed border-lime-300 rounded-md cursor-pointer
      focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400
      py-2"
                {...register("image")}
              />
              <p className="mt-1 text-xs text-gray-400">
                PNG, JPG or JPEG (max 2MB)
              </p>
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: emailPattern,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                type="password"
                autoComplete="new-password"
                id="password"
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: passwordPattern,
                    message: "Enter a valid Password",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-sky-500 w-full rounded-md py-3 text-white"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Signup with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        {/* <div
          onClick={handleGoogleSignIn}
          className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div> */}
        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:underline hover:text-lime-500 text-gray-600"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;
