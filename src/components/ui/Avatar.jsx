const Avatar = ({ src, alt, className = "", children }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full ${className}`}
    >
      {src ? (
        <img src={src || "/placeholder.svg"} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="text-gray-500 font-medium">{children || (alt ? alt.charAt(0).toUpperCase() : "?")}</span>
      )}
    </div>
  )
}

export default Avatar
