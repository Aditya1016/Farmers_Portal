import {Link} from 'react-router-dom'
const Navbar = () => {
        
  return (
    <div className="flex justify-between items-center px-5 py-2">
        <div>
            <img src="https://static.vecteezy.com/system/resources/previews/023/654/784/non_2x/golden-logo-template-free-png.png" alt="" className="size-12 bg-transparent rounded-full object-cover"/>
        </div>
        <div>
            <ul className="flex space-x-5 px-2 text-lg font-circular-web">
                <li className='text-white'>About Us</li>
                <li className="bg-green-300 hover:bg-green-400 px-4 rounded-3xl"><Link to={"/signin"}>Sign In</Link></li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar