import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./services/auth";
import { login, logout } from "./store/authSlice";
import Navbar from "./components/Navbar"; 
import Loading from "./pages/Loading";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        dispatch(logout());
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  return !loading ? (
    <main>
      <Navbar />
      <Outlet />
    </main>
  ) : (
    <Loading />
  );
};

export default App;
