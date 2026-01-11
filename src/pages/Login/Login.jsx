import { Link, Navigate, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Login = () => {
  const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const from = location.state || "/";

  if (loading) return <LoadingSpinner />;
  if (user) return <Navigate to={from} replace={true} />;

  // form submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      //User Login
      await signIn(email, password);

      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };
  // inside Login component

  // helper function to auto-fill credentials
  const fillCredentials = (role) => {
    const form = document.querySelector("form");
    if (!form) return;

    if (role === "staff") {
      form.email.value = "qalafigo@mailinator.com";
      form.password.value = "Anik1122";
    } else if (role === "admin") {
      form.email.value = "admin@sakib.com";
      form.password.value = "Anik1122";
    } else if (role === "user") {
      form.email.value = "demo@user.com";
      form.password.value = "Anik1122";
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();

      const citizenData = {
        name: result.user.displayName,
        email: result.user.email,
        image: result.user.photoURL,
        role: "citizen",
        status: "normal",
        action: "unblock",
        createdAt: new Date(),
      };

      await axiosSecure.post("/citizen", citizenData);

      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err?.message);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="flex flex-col glassy max-w-md p-6 rounded-md sm:p-10  ">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Log In</h1>
          <p className="text-sm text-gray-400">
            Sign in to access your account
          </p>
        </div>
        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          noValidate=""
          action=""
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                id="password"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
              />
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
        <div className="space-y-1">
          <button className="text-xs hover:underline hover:text-sky-500 text-gray-400 cursor-pointer">
            Forgot password?
          </button>
        </div>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer rounded-lg"
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <p className="px-6 text-sm text-center text-gray-400">
          Don&apos;t have an account yet?{" "}
          <Link
            state={from}
            to="/signup"
            className="hover:underline text-sky-400 hover:text-sky-500 "
          >
            Sign up
          </Link>
          .
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <button
            type="button"
            onClick={() => fillCredentials("staff")}
            className="custom-btn2 px-3"
          >
            Demo Staff
          </button>
          <button
            type="button"
            onClick={() => fillCredentials("admin")}
            className="custom-btn px-3"
          >
            Demo Admin
          </button>
          <button
            type="button"
            onClick={() => fillCredentials("user")}
            className="custom-btn2 p-3"
          >
            Demo User
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
