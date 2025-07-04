import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  MessageCircle,
  Search,
  TrendingUp,
  Clock,
  Eye,
  Bookmark,
  Users,
  Star,
  Calendar,
  BookOpen,
  Mail,
  Trash2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useBlog } from "../context/BlogContext";
import { useUser } from "../context/UserContext";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Avatar from "../components/ui/Avatar";
import Input from "../components/ui/Input";
import Badge from "../components/ui/Badge";

const HomePage = () => {
  const { user } = useAuth();
  const { blogs, toggleLike, deleteBlog } = useBlog();
  const { users } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [expandedBlogIds, setExpandedBlogIds] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);

  // Get all unique tags/categories
  const allTags = Array.from(new Set(blogs.flatMap((blog) => blog.tags)));

  // Get trending blogs (most liked)
  const trendingBlogs = blogs
    .sort((a, b) => b.likes.length - a.likes.length)
    .slice(0, 3);

  // Get popular authors (most followers)
  const popularAuthors = users
    .sort((a, b) => b.followers.length - a.followers.length)
    .slice(0, 4);

  //for expanded blog content
  const toggleExpand = (blogId) => {
    setExpandedBlogIds((prev) =>
      prev.includes(blogId)
        ? prev.filter((id) => id !== blogId)
        : [...prev, blogId]
    );
  };

  // Recent activity
  const recentActivity = blogs
    .flatMap((blog) => [
      ...blog.comments.map((comment) => ({
        type: "comment",
        blog: blog,
        user: comment.author,
        date: comment.createdAt,
      })),
      ...blog.likes
        .map((likeUserId) => {
          const likeUser = users.find((u) => u.id === likeUserId);
          return likeUser
            ? {
                type: "like",
                blog: blog,
                user: likeUser,
                date: blog.createdAt,
              }
            : null;
        })
        .filter(Boolean),
    ])
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  useEffect(() => {
    let filtered = blogs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((blog) =>
        blog.tags.some(
          (tag) => tag.toLowerCase() === selectedCategory.toLowerCase()
        )
      );
    }

    // Sort
    switch (sortBy) {
      case "newest":
        filtered = filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        filtered = filtered.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "most-liked":
        filtered = filtered.sort((a, b) => b.likes.length - a.likes.length);
        break;
      case "most-commented":
        filtered = filtered.sort(
          (a, b) => b.comments.length - a.comments.length
        );
        break;
      case "random":
        filtered = [...filtered].sort(() => Math.random() - 0.5);
        break;
      default:
        break;
    }

    setFilteredBlogs(filtered);
  }, [blogs, searchTerm, selectedCategory, sortBy]);

  const handleLike = (blogId) => {
    if (!user) {
      alert("Please login to like posts");
      return;
    }
    toggleLike(blogId, user.id);
  };

  const handleDelete = (blogId, blogTitle) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${blogTitle}"? This action cannot be undone.`
      )
    ) {
      deleteBlog(blogId);
    }
  };


  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Hero Section - Fixed */}

          {/* Search and Filters */}
          <Card className="mb-6 border-0">
            <div className="p-6  ">
              <div className="flex flex-col  md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2  w-4 h-4" />
                  <Input
                    placeholder="Search blogs, authors, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10  border-2 rounded-xl border-black text-black"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 header text-sm  rounded-xl hover:scale-105  hover:cursor-pointer border text- "
                >
                  <option
                    className="bg-white header text-black hover:bg-gray-300 hover:text-black"
                    value="all"
                  >
                    All Categories
                  </option>
                  {allTags.map((tag) => (
                    <option
                      className="bg-white text-black extra hover:bg-gray-300 hover:text-black"
                      key={tag}
                      value={tag}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#d1d5db";
                        e.target.style.color = "#000000";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#000000";
                        e.target.style.color = "#ffffff";
                      }}
                    >
                      {tag}
                    </option>
                  ))}
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2  header text-sm  rounded-xl hover:scale-105  hover:cursor-pointer border text-black bg-white"
                >
                  <option
                    className="bg-white header text-black"
                    value="newest"
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#d1d5db";
                      e.target.style.color = "#000000";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#000000";
                      e.target.style.color = "#ffffff";
                    }}
                  >
                    Newest First
                  </option>
                  <option
                    className="bg-white extra text-black"
                    value="oldest"
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#d1d5db";
                      e.target.style.color = "#000000";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#000000";
                      e.target.style.color = "#ffffff";
                    }}
                  >
                    Oldest First
                  </option>
                  <option
                    className="bg-white extra text-black"
                    value="most-liked"
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#d1d5db";
                      e.target.style.color = "#000000";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#000000";
                      e.target.style.color = "#ffffff";
                    }}
                  >
                    Most Liked
                  </option>
                  <option
                    className="bg-white extra text-black"
                    value="most-commented"
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#d1d5db";
                      e.target.style.color = "#000000";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#000000";
                      e.target.style.color = "#ffffff";
                    }}
                  >
                    Most Commented
                  </option>
                  <option
                    className="bg-white extra text-black"
                    value="random"
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#d1d5db";
                      e.target.style.color = "#000000";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#000000";
                      e.target.style.color = "#ffffff";
                    }}
                  >
                    Random
                  </option>
                </select>
              </div>
            </div>
          </Card>

          {/* Trending Blogs */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 animate-pulse text-red-500" />
              <h2 className="text-2xl font-bold header text-black">Trending Now</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {trendingBlogs.map((blog) => (
                <Card
                  key={blog.id}
                  className="border-0 hover:shadow-lg transition-shadow"
                >
                  <div className="p-4 bg-white border h-26 transition hover:scale-105 border-blue-400 rounded-lg">
                    <Link to={`/blog/${blog.id}`}>
                      <h3 className="font-semibold mb-2 header text-sm cursor-pointer line-clamp-2 text-black">
                        {blog.title}
                      </h3>
                    </Link>
                    <div className="flex hover:cursor-pointer items-center gap-2 text-sm text-gray-500">
                      <Heart className="w-4 h-4 hover:cursor-pointer fill-red-500 text-red-500" />
                      {blog.likes.length} likes
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Main Blog Feed */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-black header">
              {searchTerm || selectedCategory !== "all"
                ? "Search Results"
                : "Latest Blogs"}
              <span className="text-sm font-normal text-gray-400 ml-2">
                ({filteredBlogs.length} posts)
              </span>
            </h2>
          </div>

          <div className="space-y-6">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <Card
                  key={blog.id}
                  className="overflow-hidden border border-gray-500  hover:shadow-lg transition-shadow"
                >
                  <div className="p-6 bg-white text-black">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={blog.author.profilePicture}
                          alt={blog.author.name}
                          className="w-10 h-10"
                        />
                        <div>
                          <Link
                            to={`/profile/${blog.author.id}`}
                            className="font-semibold hover:text-blue-400 text-black header"
                          >
                            {blog.author.name}
                          </Link>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="w-3 h-3" />
                            {blog.createdAt}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {user && user.id === blog.author.id && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(blog.id, blog.title)}
                            className=" hover:bg-red-500 text-white "
                          >
                            <Trash2 className="w-4 h-4 " />
                          </Button>
                        )}
                      </div>
                    </div>

                    <Link to={`/blog/${blog.id}`}>
                      <h2 className="text-xl font-bold mb-2 hover:underline cursor-pointer text-black header">
                        {blog.title}
                      </h2>
                    </Link>
                    {(expandedBlogIds.includes(blog.id)
                      ? blog.content
                      : blog.content.length > 200
                      ? blog.content.slice(0, 200) + "..."
                      : blog.content
                    )
                      .split("\n")
                      .map((para, idx) => (
                        <p key={idx} className="text-gray-600 extra text-xl mb-2">
                          {para}
                        </p>
                      ))}

                    {blog.content.length > 200 && (
                      <button
                        onClick={() => toggleExpand(blog.id)}
                        className="text-blue-500  hover:cursor-pointer hover:bg-gray-100 rounded-xl py-1 px-3   pb-2 mb-2 text-sm hover:underline"
                      >
                        {expandedBlogIds.includes(blog.id)
                          ? "See less"
                          : "See more"}
                      </button>
                    )}
                    {blog.image && (
                      <img
                        src={blog.image || "/placeholder.svg"}
                        alt={blog.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(blog.id)}
                          className={`flex items-center gap-2 ${
                            user && blog.likes.includes(user.id)
                              ? "text-red-500"
                              : "text-gray-400"
                          }`}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              user && blog.likes.includes(user.id)
                                ? "fill-current"
                                : ""
                            }`}
                          />
                          {blog.likes.length}
                        </Button>
                        <Link to={`/blog/${blog.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-2 text-gray-400"
                          >
                            <MessageCircle className="w-4 h-4" />
                            {blog.comments.length}
                          </Button>
                        </Link>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {blog.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs bg-blue-600/20 text-white border-blue-500/30"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card>
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-300 text-lg">
                    No blogs found matching your criteria
                  </p>
                  <p className="text-gray-400 text-sm">
                    Try adjusting your search or filters
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Popular Authors */}
          <Card className="border-gray-500 rounded-xl">
            <div className="p-4 bg-white text-black rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold text-black header">Popular Authors</h3>
              </div>
              <div className="space-y-3">
                {popularAuthors.map((author) => (
                  <Link key={author.id} to={`/profile/${author.id}`}>
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 cursor-pointer">
                      <Avatar
                        src={author.profilePicture}
                        alt={author.name}
                        className="w-8 h-8"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-sm text-black header">
                          {author.name}
                        </div>
                        <div className="text-sm text-gray-400 extra ">
                          {author.followers.length} followers
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="border-gray-500 rounded-xl ">
            <div className="p-4 bg-white rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-green-400" />
                <h3 className="font-semibold text-black header">Recent Activity</h3>
              </div>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 text-sm">
                    <Avatar
                      src={activity.user.profilePicture}
                      alt={activity.user.name}
                      className="w-6 h-6"
                    />
                    <div className="flex-1">
                      <span className="font-medium header text-black">
                        {activity.user.name}
                      </span>
                      <span className="text-gray-500 extra text-lg">
                        {activity.type === "like"
                          ? " liked "
                          : " commented on "}
                      </span>
                      <Link
                        to={`/blog/${activity.blog.id}`}
                        className="text-blue-400 extra text-lg hover:underline"
                      >
                        {activity.blog.title.slice(0, 30)}...
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Popular Tags */}
          <Card className="border-gray-500 rounded-xl">
            <div className="p-4 bg-white rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-yellow-400" />
                <h3 className="font-semibold text-black header">Popular Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {allTags.slice(0, 10).map((tag) => {
                  const tagCount = blogs.filter((blog) =>
                    blog.tags.includes(tag)
                  ).length;
                  return (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-gray-300 hover:text-black text-white bg-gray-900 border-gray-600 transition-colors"
                      onClick={() => setSelectedCategory(tag)}
                    >
                      {tag} ({tagCount})
                    </Badge>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Newsletter Signup */}
          <Card className="bg-gradient-to-br border-gray-500 rounded-xl from-blue-600/20 to-purple-600/20">
            <div className="p-4 bg-white  rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold text-black header">Stay Updated</h3>
              </div>
              <p className="text-lg text-gray-500 mb-4 extra">
                Get the latest blog posts delivered to your inbox.
              </p>
              <div className="space-y-2">
                <Input
                  placeholder="Enter your email"
                  type="email"
                  className="bg-white border-gray-600 extra"
                />
                <Button
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 extra text-xl"
                  size="lg"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
