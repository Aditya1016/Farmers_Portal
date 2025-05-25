import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createUser } from "../services/auth";
const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const create = async (data) => {
    setError("");

    const response = await createUser(data);

    if (response.status === 201) {
      navigate("/signin");
    } else {
      setError("Failed to create account");
    }
  };
  return (
    <div className="h-screen w-screen flex flex-col md:flex-row justify-between">
      <div className="left text-3xl font-circular-web w-full h-1/3 md:h-full md:w-1/2 bg-yellow-300 flex justify-center items-center">
        SignUp
      </div>
      <div className="right h-full md:w-1/2 bg-blue-100 flex justify-center items-center">
        <div className="bg-white shadow-custom-dark rounded-mb-6 rounded-lg flex justify-center p-5 ">
          <form onSubmit={handleSubmit(create)}>
            <div className="space-y-5">
              <input
                label="Name: "
                placeholder="Enter your name"
                {...register("name", {
                  required: true,
                })}
              />
              <input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
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
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
