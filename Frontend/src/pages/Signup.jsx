import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:5500/api/v1/auth/sign-up", {
      name,
      email,
      password
    });

    if(response.data.success){
      navigate("/signin");
    }  
  };
  return (
    <div className="h-screen w-screen flex flex-col md:flex-row justify-between">
      <div className="left text-3xl font-circular-web w-full h-1/3 md:h-full md:w-1/2 bg-yellow-300 flex justify-center items-center">
        SignUp
      </div>
      <div className="right h-full md:w-1/2 bg-blue-100 flex justify-center items-center">
        <div className="bg-white shadow-custom-dark rounded-mb-6 rounded-lg flex justify-center p-5 ">
          <form action="submit" className="w-full max-w-sm p-4">
            <div className="flex flex-col mb-4">
              <label className="font-general text-lg mb-2" htmlFor="email">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 mt-1 border-b border-gray-300 rounded"
                placeholder="Enter your email"
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="font-general text-lg mb-2" htmlFor="email">
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
              <label className="font-general text-lg mb-2" htmlFor="password">
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
                Signup
              </button>
              <p className="text-sm">Already have an account? <a href="/signin" className="text-red-500">SignIn</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
