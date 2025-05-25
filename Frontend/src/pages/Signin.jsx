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
      setError(error.message);
    }
  };

  return (
    <div className="h-screen w-screen flex md:flex-row flex-col justify-between">
      <div className="left text-3xl font-circular-web md:w-1/2 h-1/3 md:h-full bg-yellow-300 flex justify-center items-center">
        SignIn
      </div>
      <div className="right h-full md:w-1/2 bg-blue-100 flex justify-center items-center">
        <div className="bg-white p-5 shadow-custom-dark rounded-mb-6 rounded-lg flex justify-center">
          <form onSubmit={handleSubmit(login)} className="mt-8">
            <div className="space-y-5">
              <input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
                      "Email address must be valid",
                  },
                })}
              />
              <input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                })}
              />
              <button type="Submit" className="w-full">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
