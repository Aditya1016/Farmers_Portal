import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, loginUser } from "../services/auth";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { login as authLogin } from "../store/authSlice";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");

    try {
      const response = await loginUser(data);
      if (response.status === 201) {
        const userData = await getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
        }
        navigate("/");
      }
    } catch (error) {
      setError("Failed to sign in");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="h-screen w-screen flex md:flex-row flex-col justify-between">
      <div className="left text-3xl font-circular-web md:w-1/2 h-1/3 md:h-full bg-yellow-300 flex justify-center items-center">
        SignIn
      </div>
      <div className="right h-full md:w-1/2 bg-blue-100 flex justify-center items-center">
        <div className="bg-white p-5 shadow-custom-dark rounded-mb-6 rounded-lg flex justify-center">
          <form onSubmit={handleSubmit(login)} className="m-4">
            <div className="space-y-5 flex flex-col h-[350px] md:w-[350px] justify-around">
              <div className="flex flex-col gap-6">
                <label className="font-robert-regular text-lg">Email: </label>
                <input
                  label="Email: "
                  placeholder="Enter your email"
                  type="email"
                  className="border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                  {...register("email", {
                    required: true,
                    validate: {
                      matchPattern: (value) =>
                        /^([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
                        "Email address must be valid",
                    },
                  })}
                />
              </div>
              <div className="flex flex-col gap-6">
                <label className="font-robert-regular text-lg">
                  Password:{" "}
                </label>
                <input
                  label="Password: "
                  type="password"
                  placeholder="Enter your password"
                  className="border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                  {...register("password", {
                    required: true,
                  })}
                />
              </div>
              <div className="flex flex-col gap-4 items-center">
                <button
                  type="Submit"
                  className="bg-blue-500 text-white font-robert-medium py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                  Sign In
                </button>
                <Link to="/signup" className="text-red-500 ">
                  Don&apos;t have an account? <p className="inline font-bold">Sign Up</p>
                </Link>
                {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
