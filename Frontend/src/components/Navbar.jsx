import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logoutUser } from "../services/auth";
import { logout } from "../store/authSlice";
import Loading from "../pages/Loading";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await logoutUser();
      console.log("Logout response:", response);
      if (response && response.status === 200) {
        dispatch(logout());
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };
  return loading ? (
    <Loading />
  ) : (
    <div className="flex justify-between items-center px-5 py-2">
      <div>
        <img
          src="/icons/logo.png"
          alt="logo"
          onClick={() => {
            navigate("/");
          }}
          className="size-12 bg-transparent rounded-full object-cover cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out"
        />
      </div>
      <div>
        <ul className="flex space-x-5 px-2 text-lg font-circular-web">
          <li className="text-white cursor-pointer hover:text-gray-200 hover:scale-105 transition-transform duration-300 ease-in-out">
            About Us
          </li>
          <li className="text-white cursor-pointer px-3 rounded-xl hover:bg-slate-100 hover:scale-105 transition-transform duration-300 ease-in-out hover:text-black">
            {user ? (
              <div className="text-red-400" onClick={handleLogout}>
                Sign Out
              </div>
            ) : (
              <Link to={"/merchants/signin"}>Want to Sell?</Link>
            )}
          </li>
          {!user && (
            <li className="bg-green-300 hover:bg-green-500 hover:text-white px-4 rounded-xl hover:scale-105 transition-transform duration-300 ease-in-out">
              <Link to={"/signin"}>Sign In</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
