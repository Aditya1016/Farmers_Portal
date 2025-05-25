import { useNavigate } from "react-router-dom";
import MandiMap from "../components/MandiMap";
import { useSelector } from "react-redux";

const Emandi = () => {
  const user = useSelector((state) => state.auth.userData);
  const navigate = useNavigate()
  if (!user) {
    navigate("/signin");
  }

  console.log("User data in Emandi:", user.user._id);
  return (
    <div className="w-full h-full">
        <MandiMap id={user.user._id} />
    </div>
  )
}

export default Emandi