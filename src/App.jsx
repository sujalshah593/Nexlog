import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { BlogProvider } from "./context/BlogContext"
import { UserProvider } from "./context/UserContext"
import Layout from "./components/layout/Layout"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import CreateBlogPage from "./pages/CreateBlogPage"
import BlogDetailPage from "./pages/BlogDetailPage"
import ProfilePage from "./pages/ProfilePage"
import EditProfilePage from "./pages/EditProfilePage"
import "./App.css"

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <BlogProvider>
          <Router>
            <Layout>
              <Routes>
                <Route  path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/create-blog" element={<CreateBlogPage />} />
                <Route path="/blog/:id" element={<BlogDetailPage />} />
                <Route path="/profile/:id" element={<ProfilePage />} />
                <Route path="/profile/edit" element={<EditProfilePage />} />
              </Routes>
            </Layout>
          </Router>
        </BlogProvider>
      </UserProvider>
    </AuthProvider>
  )
}

export default App
