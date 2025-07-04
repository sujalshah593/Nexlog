import { Link } from "react-router-dom"
import { PlusCircle } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import Button from "../ui/Button"
import Avatar from "../ui/Avatar"

const Header = () => {
  const { user } = useAuth();

  return (
    <header
      className="bg-white shadow-sm border-b border-b-gray-300  sticky top-0 z-[100] backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-extrabold text-blue-500 header">
          Nexlog
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/create-blog">
                <Button className="flex items-center gap-2 bg-blue-500 header text-white hover:bg-'[#12678b]' hover:cursor-pointer">
                  <PlusCircle className="w-4 h-4" />
                  Create Blog
                </Button>
              </Link>
              <div className="relative group">
                <Link to={`/profile/${user.id}`}>
                  <Avatar src={user.profilePicture} alt={user.name} className="w-8 h-8 cursor-pointer" />
                </Link>
               
              </div>
            </>
          ) : (
            <div className="flex gap-2">
              <Link to="/login">
                <Button variant="outline" className="bg-blue-600 text-white">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-blue-600 text-white hover:bg-blue-700">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
