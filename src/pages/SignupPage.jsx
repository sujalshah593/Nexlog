import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"
import Input from "../components/ui/Input"

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
  })
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const success = signup(formData)
    if (success) {
      navigate("/")
    } else {
      alert("Email already exists")
    }
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <div className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold header">Join BlogSpace</h2>
            <p className="text-gray-600 extra text-xl">Create your account to start blogging</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block header text-sm font-medium">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="extra text-lg"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium header">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="extra text-lg"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium header">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="extra text-lg"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="bio" className="block text-sm font-medium header">
                  Bio (Optional)
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  placeholder="Tell us about yourself"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border extra text-lg border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[80px]"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-4 mt-6">
              <Button type="submit" className="w-full header bg-blue-500 text-white hover:bg-blue-600">
                Create Account
              </Button>
              <p className="text-sm text-center header text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}

export default SignupPage
