import Button from "../components/Button"
import { Link } from "react-router-dom"
const GetStarted = () => {
  return (
    <div className="h-screen w-screen overflow-hidden">
  <img
    className="h-full w-full object-cover"
    src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    alt="start-image"
  />
  <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center pb-10">
    <Link to={"/signup"}>
      <Button />
    </Link>
  </div>
</div>

  )
}

export default GetStarted