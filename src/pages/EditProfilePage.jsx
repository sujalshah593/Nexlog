import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { ArrowLeft, Save } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"
import Input from "../components/ui/Input"
import ImageUploader from "../components/common/ImageUploader"

const EditProfilePage = () => {
  const { user, updateProfile } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    profilePicture: "",
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate("/login")
      return
    }

    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      const currentUserData = JSON.parse(savedUser)
      setFormData({
        name: currentUserData.name || user.name,
        bio: currentUserData.bio || user.bio,
        profilePicture: currentUserData.profilePicture || user.profilePicture,
      })
    } else {
      setFormData({
        name: user.name,
        bio: user.bio,
        profilePicture: user.profilePicture,
      })
    }
  }, [user, navigate])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleImageUpload = (imageUrl) => {
    setFormData((prev) => ({
      ...prev,
      profilePicture: imageUrl,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      updateProfile(formData)
      navigate(`/profile/${user.id}`)
    } catch (error) {
      alert("Failed to update profile")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <Link to={`/profile/${user.id}`}>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Profile
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Edit Profile</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">Profile Picture</h2>
            <ImageUploader
              currentImage={formData.profilePicture}
              onImageUpload={handleImageUpload}
              userName={formData.name}
              variant="profile"
            />
          </div>

          <div>
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Profile Information</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="bio" className="block text-sm font-medium">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      placeholder="Tell us about yourself..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px]"
                      maxLength={500}
                    />
                    <div className="text-xs text-gray-500 text-right">{formData.bio.length}/500 characters</div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="submit" disabled={isSaving} className="flex items-center gap-2">
                      <Save className="w-4 h-4" />
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                    <Link to={`/profile/${user.id}`}>
                      <Button type="button" variant="outline">
                        Cancel
                      </Button>
                    </Link>
                  </div>
                </form>
              </div>
            </Card>
          </div>
        </div>

        <Card className="mt-8">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">Profile Preview</h3>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <img
                src={formData.profilePicture || "/placeholder.svg"}
                alt={formData.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-lg">{formData.name || "Your Name"}</h4>
                <p className="text-gray-600">{formData.bio || "Your bio will appear here..."}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default EditProfilePage
