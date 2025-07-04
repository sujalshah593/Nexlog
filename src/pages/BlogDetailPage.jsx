import { useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Heart, MessageCircle, ArrowLeft, Trash2 } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useBlog } from "../context/BlogContext"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"
import Input from "../components/ui/Input"
import Avatar from "../components/ui/Avatar"

const BlogDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { blogs, toggleLike, addComment, deleteBlog } = useBlog()
  const [newComment, setNewComment] = useState("")

  const blog = blogs.find((b) => b.id === id)

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog not found</h1>
          <Link to="/">
            <Button>Go back home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleLike = () => {
    if (!user) {
      alert("Please login to like posts")
      return
    }
    toggleLike(blog.id, user.id)
  }

  const handleComment = (e) => {
    e.preventDefault()
    if (!user) {
      alert("Please login to comment")
      return
    }
    if (!newComment.trim()) return

    addComment(blog.id, {
      id: Date.now().toString(),
      content: newComment,
      author: user,
      createdAt: new Date().toLocaleDateString(),
    })
    setNewComment("")
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) {
      deleteBlog(blog.id)
      navigate("/")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <Card className="mb-8">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Avatar src={blog.author.profilePicture} alt={blog.author.name} className="w-12 h-12" />
              <div>
                <Link to={`/profile/${blog.author.id}`} className="font-semibold text-lg hover:text-blue-600">
                  {blog.author.name}
                </Link>
                <p className="text-gray-500">{blog.createdAt}</p>
              </div>
            </div>
            {user && user.id === blog.author.id && (
              <div className="flex justify-end mb-4">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Post
                </Button>
              </div>
            )}
            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            {blog.image && (
              <img
                src={blog.image || "/placeholder.svg"}
                alt={blog.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{blog.content}</p>
            </div>
            <div className="flex items-center gap-4 mt-6 pt-4 border-t">
              <Button
                variant="ghost"
                onClick={handleLike}
                className={`flex items-center gap-2 ${user && blog.likes.includes(user.id) ? "text-red-500" : ""}`}
              >
                <Heart className={`w-5 h-5 ${user && blog.likes.includes(user.id) ? "fill-current" : ""}`} />
                {blog.likes.length} Likes
              </Button>
              <div className="flex items-center gap-2 text-gray-600">
                <MessageCircle className="w-5 h-5" />
                {blog.comments.length} Comments
              </div>
            </div>
          </div>
        </Card>

        {/* Comments Section */}
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Comments ({blog.comments.length})</h2>
            {user && (
              <form onSubmit={handleComment} className="mb-6">
                <div className="flex gap-3">
                  <Avatar src={user.profilePicture} alt={user.name} className="w-8 h-8" />
                  <div className="flex-1 flex gap-2">
                    <Input
                      placeholder="Write a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit">Post</Button>
                  </div>
                </div>
              </form>
            )}

            <div className="space-y-4">
              {blog.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar src={comment.author.profilePicture} alt={comment.author.name} className="w-8 h-8" />
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Link
                          to={`/profile/${comment.author.id}`}
                          className="font-semibold text-sm hover:text-blue-600"
                        >
                          {comment.author.name}
                        </Link>
                        <span className="text-xs text-gray-500">{comment.createdAt}</span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              {blog.comments.length === 0 && (
                <p className="text-gray-500 text-center py-8">No comments yet. Be the first to comment!</p>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default BlogDetailPage
