import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/sign-in`, {
      email,
      password
    },{
      withCredentials: true
    })


    if(response.data.success){
      localStorage.setItem("userId", response.data.data.user.id);
      navigate("/dashboard");
    }
  };

  return (
    <div className="h-screen w-screen flex md:flex-row flex-col justify-between">
      <div className="left text-3xl font-circular-web md:w-1/2 h-1/3 md:h-full bg-yellow-300 flex justify-center items-center">
        SignIn
      </div>
      <div className="right h-full md:w-1/2 bg-blue-100 flex justify-center items-center">
        <div className="bg-white p-5 shadow-custom-dark rounded-mb-6 rounded-lg flex justify-center">
          <form action="submit" className="w-full max-w-sm p-4">
            <div className="flex flex-col mb-4">
              <label className="font-general text-md mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 mt-1 border-b border-gray-300 rounded"
                placeholder="Enter your email"
              />
            </div>

            <div className="flex flex-col mb-8">
              <label className="font-general text-md mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 mt-1 border-b border-gray-300 rounded"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex flex-col justify-center items-center gap-2 font-robert-medium mt-4">
              <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={(e) => submitHandler(e)}
              >
                Signin
              </button>
              <p className="text-sm">Don&apos;t have an account? <Link to={'/signup'} className="text-red-500">SignUp</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
