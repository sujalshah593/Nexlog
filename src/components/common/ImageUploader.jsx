import { useState, useRef } from "react"
import { Upload, Camera, X, ImageIcon } from "lucide-react"
import Button from "../ui/Button"
import Card from "../ui/Card"
import Avatar from "../ui/Avatar"

const ImageUploader = ({ currentImage, onImageUpload, userName, variant = "blog", maxSize = 5 }) => {
  const [isUploading, setIsUploading] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file")
      return
    }

    if (file.size > maxSize * 1024 * 1024) {
      alert(`Image size should be less than ${maxSize}MB`)
      return
    }

    setIsUploading(true)

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result
      setPreviewImage(result)

      setTimeout(() => {
        onImageUpload(result)
        setIsUploading(false)
      }, 1500)
    }
    reader.readAsDataURL(file)
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveImage = () => {
    setPreviewImage(null)
    onImageUpload("/placeholder.svg?height=100&width=100")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const displayImage = previewImage || currentImage

  if (variant === "profile") {
    return (
      <Card className="w-full max-w-sm">
        <div className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar src={displayImage} alt={userName} className="w-32 h-32 border-4 border-gray-200" />

              {isUploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              )}

              <Button
                size="sm"
                className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0"
                onClick={handleUploadClick}
                disabled={isUploading}
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>

            <div className="text-center">
              <h3 className="font-semibold text-lg">{userName}</h3>
              <p className="text-sm text-gray-500">Click the camera icon to upload</p>
            </div>

            <div className="flex gap-2 w-full">
              <Button
                onClick={handleUploadClick}
                disabled={isUploading}
                className="flex-1 flex items-center gap-2 bg-transparent"
                variant="outline"
              >
                <Upload className="w-4 h-4 extra" />
                {isUploading ? "Uploading..." : "Upload Photo"}
              </Button>

              {displayImage && displayImage !== "/placeholder.svg?height=100&width=100" && (
                <Button
                  onClick={handleRemoveImage}
                  disabled={isUploading}
                  variant="outline"
                  size="sm"
                  className="px-3 bg-transparent"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

            <div className="text-xs text-gray-400 text-center ">
              <p className="extra">Supported formats: JPG, PNG, GIF</p>
              <p className="extra">Maximum size: {maxSize}MB</p>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <div className="p-6">
        {displayImage ? (
          <div className="space-y-4">
            <div className="relative">
              <img
                src={displayImage || "/placeholder.svg"}
                alt="Upload preview"
                className="w-full h-64 object-cover rounded-lg"
              />
              {isUploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                    <p>Uploading...</p>
                  </div>
                </div>
              )}
              <Button variant="destructive" size="sm" className="absolute top-2 right-2" onClick={handleRemoveImage}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <Button
              variant="outline"
              onClick={handleUploadClick}
              className="w-full bg-transparent"
              disabled={isUploading}
            >
              <Upload className="w-4 h-4 mr-2" />
              Change Image
            </Button>
          </div>
        ) : (
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
            onClick={handleUploadClick}
          >
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 header">Upload Blog Image</h3>
            <p className="text-gray-600 mb-4 extra text-lg">Drag and drop an image here, or click to select</p>
            <Button variant="outline" className="extra text-lg bg-gray-200">
              <Upload className="w-4 h-4 mr-2" />
              Choose Image
            </Button>
            <p className=" text-gray-500 mt-2 extra text-sm">Supports: JPG, PNG, GIF (Max {maxSize}MB)</p>
          </div>
        )}

        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
      </div>
    </Card>
  )
}

export default ImageUploader
