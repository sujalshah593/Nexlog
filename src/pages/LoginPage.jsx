import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"
import Input from "../components/ui/Input"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const success = login(email, password)
    if (success) {
      navigate("/")
    } else {
      alert("Invalid credentials")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <div className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold header">Welcome Back</h2>
            <p className="text-gray-600 extra text-lg">Sign in to your BlogSpace account</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm header font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="extra"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm header font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="extra"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-4 mt-6">
              <Button type="submit" className="w-full bg-blue-500 text-white header hover:bg-blue-600">
                Sign In
              </Button>
              <p className="text-sm text-center header text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-600 hover:underline ">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}

export default LoginPage
