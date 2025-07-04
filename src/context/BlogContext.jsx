import { createContext, useContext, useState, useEffect } from "react"

const BlogContext = createContext()

// Initial blogs data
const initialBlogs = [
  {
    id: "1",
    title: "Getting Started with React Hooks",
    content:
      "React Hooks have revolutionized the way we write React components. In this comprehensive guide, we'll explore the most commonly used hooks and how they can simplify your code. From useState for managing component state to useEffect for handling side effects, hooks provide a more functional approach to React development.",
    image: "/placeholder.svg?height=300&width=600",
    author: { id: "1", name: "John Doe", profilePicture: "/placeholder.svg?height=100&width=100" },
    createdAt: "March 15, 2024",
    likes: ["2", "3"],
    comments: [
      {
        id: "1",
        content: "Great explanation of hooks! This really helped me understand useEffect better.",
        author: { id: "2", name: "Jane Smith", profilePicture: "/placeholder.svg?height=100&width=100" },
        createdAt: "March 16, 2024",
      },
    ],
    tags: ["React", "JavaScript", "Frontend"],
  },
  {
    id: "2",
    title: "The Future of Web Development",
    content:
      "Web development is constantly evolving, and staying up-to-date with the latest trends is crucial for developers. In this post, we'll explore emerging technologies like WebAssembly, Progressive Web Apps, and the Jamstack architecture.",
    image: "/placeholder.svg?height=300&width=600",
    author: { id: "2", name: "Jane Smith", profilePicture: "/placeholder.svg?height=100&width=100" },
    createdAt: "March 14, 2024",
    likes: ["1", "3"],
    comments: [],
    tags: ["Web Development", "Technology", "Future"],
  },
  // Add more initial blogs here...
]

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState(initialBlogs)

  useEffect(() => {
    const savedBlogs = localStorage.getItem("blogs")
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs))
    } else {
      localStorage.setItem("blogs", JSON.stringify(initialBlogs))
    }
  }, [])

  const createBlog = (blogData) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const author = users.find((u) => u.id === blogData.authorId)

    if (!author) return

    const newBlog = {
      id: Date.now().toString(),
      title: blogData.title,
      content: blogData.content,
      image: blogData.image,
      author: {
        id: author.id,
        name: author.name,
        profilePicture: author.profilePicture,
      },
      createdAt: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      likes: [],
      comments: [],
      tags: blogData.tags,
    }

    const updatedBlogs = [newBlog, ...blogs]
    setBlogs(updatedBlogs)
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs))
  }

  const toggleLike = (blogId, userId) => {
    const updatedBlogs = blogs.map((blog) => {
      if (blog.id === blogId) {
        const isLiked = blog.likes.includes(userId)
        return {
          ...blog,
          likes: isLiked ? blog.likes.filter((id) => id !== userId) : [...blog.likes, userId],
        }
      }
      return blog
    })
    setBlogs(updatedBlogs)
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs))
  }

  const addComment = (blogId, comment) => {
    const updatedBlogs = blogs.map((blog) => {
      if (blog.id === blogId) {
        return {
          ...blog,
          comments: [...blog.comments, comment],
        }
      }
      return blog
    })
    setBlogs(updatedBlogs)
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs))
  }

  const deleteBlog = (blogId) => {
    const updatedBlogs = blogs.filter((blog) => blog.id !== blogId)
    setBlogs(updatedBlogs)
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs))
  }

  return (
    <BlogContext.Provider value={{ blogs, createBlog, toggleLike, addComment, deleteBlog }}>
      {children}
    </BlogContext.Provider>
  )
}

export const useBlog = () => {
  const context = useContext(BlogContext)
  if (context === undefined) {
    throw new Error("useBlog must be used within a BlogProvider")
  }
  return context
}
