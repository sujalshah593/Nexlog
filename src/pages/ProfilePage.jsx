import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  UserPlus,
  UserMinus,
  ArrowLeft,
  Edit,
  Trash2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useBlog } from "../context/BlogContext";
import { useUser } from "../context/UserContext";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Avatar from "../components/ui/Avatar";
import { LogOut } from 'lucide-react';

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser, logout } = useAuth();
  const { blogs, deleteBlog } = useBlog();
  const { users, followUser, unfollowUser } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("posts");
    const [expandedBlogIds, setExpandedBlogIds] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div class="loader">
            <li class="ball"></li>
            <li class="ball"></li>
            <li class="ball"></li>
          </div>
        </div>
      </div>
    );
  }

  const profileUser = users.find((u) => u.id === id);
  const userBlogs = blogs.filter((blog) => blog.author.id === id);

  if (!profileUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 header">User not found</h1>
          <p className="text-gray-600 mb-6 extra">
            The profile you're looking for doesn't exist.
          </p>
          <Link to="/">
            <Button className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 extra" />
              Go back home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

    const toggleExpand = (blogId) => {
    setExpandedBlogIds((prev) =>
      prev.includes(blogId)
        ? prev.filter((id) => id !== blogId)
        : [...prev, blogId]
    );
  };

  const isOwnProfile = currentUser?.id === profileUser.id;
  const isFollowing =
    currentUser && profileUser.followers.includes(currentUser.id);

  const handleFollow = () => {
    if (!currentUser) {
      alert("Please login to follow users");
      return;
    }

    if (isFollowing) {
      unfollowUser(profileUser.id, currentUser.id);
    } else {
      followUser(profileUser.id, currentUser.id);
    }
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

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/">
          <Button  className="mb-6 hover:cursor-pointer extra text-xl border border-gray-500 hover:bg-gray-200 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>

        {/* Profile Header */}
        <Card className="mb-8">
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar
                src={profileUser.profilePicture}
                alt={profileUser.name}
                className="w-32 h-32"
              />

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2 header">{profileUser.name}</h1>
                <p className="text-gray-600 mb-4 extra text-lg">{profileUser.bio}</p>

                <div className="flex justify-center md:justify-start gap-6 mb-4">
                  <div className="text-center">
                    <div className="font-bold text-2xl extra">{userBlogs.length}</div>
                    <div className="text-gray-600 text-sm header">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-2xl extra">
                      {profileUser.followers.length}
                    </div>
                    <div className="text-gray-600 text-sm header">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-2xl extra">
                      {profileUser.following.length}
                    </div>
                    <div className="text-gray-600 text-sm header">Following</div>
                  </div>
                </div>

                {!isOwnProfile && currentUser && (
                  <Button
                    onClick={handleFollow}
                    variant={isFollowing ? "outline" : "default"}
                    className="flex items-center gap-2 extra text-lg"
                  >
                    {isFollowing ? (
                      <>
                        <UserMinus className="w-4 h-4" />
                        Unfollow
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        Follow
                      </>
                    )}
                  </Button>
                )}
                {isOwnProfile && (
                  <div className="flex items-center gap-3">
                    <Link to="/profile/edit">
                      <Button className="flex header border border-gray-400 hover:bg-gray-200 hover:cursor-pointer items-center gap-2">
                        <Edit className="w-4 h-4" />
                        Edit Profile
                      </Button>
                    </Link>
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      className="flex items-center gap-2 border-red-500  header hover:bg-red-600  hover:text-white hover:cursor-pointer bg-red-500 text-white"
                    >
                      Logout{" "}<LogOut />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Profile Content */}
        <div className="w-full">
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab("posts")}
              className={`px-4 py-2 font-medium ${
                activeTab === "posts"
                  ? "border-b-2 border-blue-500 text-blue-600 header"
                  : "text-gray-500 hover:text-gray-700 header hover:cursor-pointer hover:bg-gray-700 rounded-t-xl"
              }`}
            >
              Posts ({userBlogs.length})
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`px-4 py-2 font-medium ${
                activeTab === "about"
                  ? "border-b-2 border-blue-500 text-blue-600 header"
                  : "text-gray-500 hover:cursor-pointer header hover:bg-gray-300 rounded-t-xl hover:text-gray-700"
              }`}
            >
              About
            </button>
          </div>

          {activeTab === "posts" && (
            <div className="space-y-6">
              {userBlogs.length > 0 ? (
                userBlogs.map((blog) => (
                  <Card key={blog.id}>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={blog.author.profilePicture}
                            alt={blog.author.name}
                            className="w-10 h-10"
                          />
                          <div>
                            <div className="font-semibold header">
                              {blog.author.name}
                            </div>
                            <div className="text-lg extra text-gray-500">
                              {blog.createdAt}
                            </div>
                          </div>
                        </div>
                        {isOwnProfile && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(blog.id, blog.title)}
                            className="text-black hover:text-white hover:cursor-pointer hover:bg-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <Link to={`/blog/${blog.id}`}>
                        <h3 className="text-xl font-bold hover:underline mb-2  header cursor-pointer">
                          {blog.title}
                        </h3>
                      </Link>
                      
                      <p className="text-gray-600  mb-4 extra text-xl line-clamp-3">
                        {blog.content}
                      </p>
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
                          <div className="flex items-center gap-2 text-gray-600">
                            <Heart className="w-4 h-4" />
                            {blog.likes.length}
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <MessageCircle className="w-4 h-4" />
                            {blog.comments.length}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {blog.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card>
                  <div className="text-center py-12">
                    <p className="text-gray-500">No posts yet</p>
                    {isOwnProfile && (
                      <Link to="/create-blog">
                        <Button className="mt-4">Create your first post</Button>
                      </Link>
                    )}
                  </div>
                </Card>
              )}
            </div>
          )}

          {activeTab === "about" && (
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6">
                  About {profileUser.name}
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Bio</h4>
                    <p className="text-gray-600">
                      {profileUser.bio || "No bio available"}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Joined</h4>
                    <p className="text-gray-600">{profileUser.joinedDate}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Stats</h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="font-bold text-lg">
                          {userBlogs.length}
                        </div>
                        <div className="text-sm text-gray-600">Total Posts</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="font-bold text-lg">
                          {userBlogs.reduce(
                            (acc, blog) => acc + blog.likes.length,
                            0
                          )}
                        </div>
                        <div className="text-sm text-gray-600">Total Likes</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="font-bold text-lg">
                          {userBlogs.reduce(
                            (acc, blog) => acc + blog.comments.length,
                            0
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          Total Comments
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
