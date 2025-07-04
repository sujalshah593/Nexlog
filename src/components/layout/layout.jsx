import Header from "./header.jsx"

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen text-black bg-white">
      <Header />
      <main className="flex-1 ">{children}</main>
    </div>
  )
}

export default Layout
