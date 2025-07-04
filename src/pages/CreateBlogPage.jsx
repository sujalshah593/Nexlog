import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useBlog } from "../context/BlogContext"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"
import Input from "../components/ui/Input"
import ImageUploader from "../components/common/ImageUploader"

const CreateBlogPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    tags: "",
  })
  const { user } = useAuth()
  const { createBlog } = useBlog()
  const navigate = useNavigate()

  if (!user) {
    navigate("/login")
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag)

    createBlog({
      title: formData.title,
      content: formData.content,
      image: formData.image || "/placeholder.svg?height=300&width=600",
      tags: tagsArray,
      authorId: user.id,
    })

    navigate("/")
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleImageUpload = (imageUrl) => {
    setFormData((prev) => ({
      ...prev,
      image: imageUrl,
    }))
  }

  return (
    <div className="min-h-screen white py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="border-gray-500 rounded-xl">
          <div className="p-6 bg-white rounded-xl">
            <h2 className="text-2xl header font-bold mb-6">Create New Blog Post</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="title" className="block header text-sm font-medium">
                  Title
                </label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter your blog title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 extra text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="content" className="block header text-sm font-medium">
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  placeholder="Write your blog content here..."
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full px-3 text-lg extra py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[300px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium header">Blog Image</label>
                <ImageUploader onImageUpload={handleImageUpload} currentImage={formData.image} variant="blog" />
              </div>

              <div className="space-y-2">
                <label htmlFor="tags" className="block header text-sm font-medium">
                  Tags (comma separated)
                </label>
                <Input
                  id="tags"
                  name="tags"
                  placeholder="technology, programming, web development"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-3 py-2 extra text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1 bg-blue-600 extra text-xl hover:bg-blue-700 hover:cursor-pointer text-white">
                  Publish Blog
                </Button>
                <Button type="button" children="" className=" bg-gray-200 hover:bg-gray-300 text-lg extra cursor-pointer " variant="outline" onClick={() => navigate("/")}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default CreateBlogPage
