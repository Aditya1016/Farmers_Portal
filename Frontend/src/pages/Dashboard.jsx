import {useNavigate} from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-neutral-100 h-screen grid grid-cols-2 grid-rows-2">
      <div onClick={() => {navigate('/soil-classification')}} className="relative cursor-pointer">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1578589302979-24448e95ef4e?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="logo1"
        />
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 text-white text-xl font-circular-web">
          Soil Classification
        </div>
      </div>

      <div onClick={() => {navigate('/e-mandi')}} className="relative cursor-pointer">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1738873245437-75f54ede32a4?q=80&w=2089&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="logo2"
        />
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 text-white text-xl font-circular-web">
          E - Mandi
        </div>
      </div>

      <div onClick={() => {navigate('/plant-disease-detection')}} className="relative cursor-pointer">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1692481060581-98c224124f12?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="logo3"
        />
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 text-white text-xl font-circular-web">
          Plant Disease Detection
        </div>
      </div>

      <div onClick={() => {navigate('/biowaste-management')}} className="relative cursor-pointer">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1599723288809-65f8af4c1990?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="logo4"
        />
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 text-white text-xl font-circular-web">
          BioWaste Management
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
