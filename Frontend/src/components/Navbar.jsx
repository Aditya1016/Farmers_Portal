import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-5 py-2">
      <div>
        <img
          src="https://static.vecteezy.com/system/resources/previews/023/654/784/non_2x/golden-logo-template-free-png.png"
          alt="logo"
          className="size-12 bg-transparent rounded-full object-cover cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out"
        />
      </div>
      <div>
        <ul className="flex space-x-5 px-2 text-lg font-circular-web">
          <li className="text-white cursor-pointer hover:text-gray-200 hover:scale-105 transition-transform duration-300 ease-in-out">
            About Us
          </li>
          <li className="text-white cursor-pointer px-3 rounded-xl hover:bg-slate-100 hover:scale-105 transition-transform duration-300 ease-in-out hover:text-black">
            <Link to={"/merchants/signin"}>Want to Sell?</Link>
          </li>
          <li className="bg-green-300 hover:bg-green-500 hover:text-white px-4 rounded-xl hover:scale-105 transition-transform duration-300 ease-in-out">
            <Link to={"/signin"}>Sign In</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
