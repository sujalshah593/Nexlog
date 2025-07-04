export const initialBlogs = [
  {
    id: "1",
    title: "Getting Started with React Hooks",
    content:
      "React Hooks have revolutionized the way we write React components. In this comprehensive guide, we'll explore the most commonly used hooks and how they can simplify your code. From useState for managing component state to useEffect for handling side effects, hooks provide a more functional approach to React development. We'll also dive into custom hooks and how they can help you reuse stateful logic across components.",
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
      "Web development is constantly evolving, and staying up-to-date with the latest trends is crucial for developers. In this post, we'll explore emerging technologies like WebAssembly, Progressive Web Apps, and the Jamstack architecture. We'll also discuss how AI and machine learning are starting to influence web development workflows and what this means for developers in the coming years.",
    image: "/placeholder.svg?height=300&width=600",
    author: { id: "2", name: "Jane Smith", profilePicture: "/placeholder.svg?height=100&width=100" },
    createdAt: "March 14, 2024",
    likes: ["1", "3"],
    comments: [],
    tags: ["Web Development", "Technology", "Future"],
  },
  {
    id: "3",
    title: "Building Scalable APIs with Node.js",
    content:
      "Creating robust and scalable APIs is essential for modern web applications. This guide covers best practices for building APIs with Node.js and Express. We'll discuss proper error handling, authentication strategies, rate limiting, and database optimization techniques. You'll also learn about API versioning, documentation with tools like Swagger, and deployment strategies for production environments.",
    image: "/placeholder.svg?height=300&width=600",
    author: { id: "3", name: "Mike Johnson", profilePicture: "/placeholder.svg?height=100&width=100" },
    createdAt: "March 13, 2024",
    likes: ["1", "2"],
    comments: [
      {
        id: "2",
        content: "Excellent guide! The section on rate limiting was particularly helpful.",
        author: { id: "1", name: "John Doe", profilePicture: "/placeholder.svg?height=100&width=100" },
        createdAt: "March 14, 2024",
      },
    ],
    tags: ["Node.js", "API", "Backend"],
  },
  {
    id: "4",
    title: "CSS Grid vs Flexbox: When to Use Which",
    content:
      "Both CSS Grid and Flexbox are powerful layout systems, but knowing when to use each one can be confusing. This comprehensive comparison will help you understand the strengths and use cases of both. We'll explore practical examples, performance considerations, and browser support. By the end of this post, you'll have a clear understanding of when to reach for Grid versus Flexbox in your projects.",
    image: "/placeholder.svg?height=300&width=600",
    author: { id: "1", name: "John Doe", profilePicture: "/placeholder.svg?height=100&width=100" },
    createdAt: "March 12, 2024",
    likes: ["2"],
    comments: [],
    tags: ["CSS", "Layout", "Frontend"],
  },
  {
    id: "5",
    title: "Introduction to TypeScript",
    content:
      "TypeScript has become increasingly popular in the JavaScript ecosystem, and for good reason. This beginner-friendly introduction covers the basics of TypeScript, including type annotations, interfaces, and generics. We'll also discuss how TypeScript can improve your development experience with better IDE support, catch errors at compile time, and make your code more maintainable.",
    image: "/placeholder.svg?height=300&width=600",
    author: { id: "2", name: "Jane Smith", profilePicture: "/placeholder.svg?height=100&width=100" },
    createdAt: "March 11, 2024",
    likes: ["1", "3"],
    comments: [
      {
        id: "3",
        content: "Perfect timing! I was just starting to learn TypeScript.",
        author: { id: "3", name: "Mike Johnson", profilePicture: "/placeholder.svg?height=100&width=100" },
        createdAt: "March 12, 2024",
      },
    ],
    tags: ["TypeScript", "JavaScript", "Programming"],
  },
  {
    id: "6",
    title: "Docker for Developers",
    content:
      "Docker has transformed how we develop, ship, and run applications. This practical guide introduces Docker concepts and shows you how to containerize your applications. We'll cover Dockerfile best practices, multi-stage builds, docker-compose for local development, and strategies for optimizing container images. Whether you're new to Docker or looking to improve your containerization skills, this post has you covered.",
    image: "/placeholder.svg?height=300&width=600",
    author: { id: "3", name: "Mike Johnson", profilePicture: "/placeholder.svg?height=100&width=100" },
    createdAt: "March 10, 2024",
    likes: ["1"],
    comments: [],
    tags: ["Docker", "DevOps", "Containers"],
  },
  {
    id: "7",
    title: "State Management in React Applications",
    content:
      "Managing state in React applications can be challenging as your app grows. This post explores different state management solutions, from React's built-in useState and useContext to external libraries like Redux, Zustand, and Jotai. We'll discuss when to use each approach, their trade-offs, and provide practical examples to help you make informed decisions about state management in your projects.",
    image: "/placeholder.svg?height=300&width=600",
    author: { id: "1", name: "John Doe", profilePicture: "/placeholder.svg?height=100&width=100" },
    createdAt: "March 9, 2024",
    likes: ["2", "3"],
    comments: [
      {
        id: "4",
        content: "Great comparison of different state management solutions!",
        author: { id: "2", name: "Jane Smith", profilePicture: "/placeholder.svg?height=100&width=100" },
        createdAt: "March 10, 2024",
      },
    ],
    tags: ["React", "State Management", "Redux"],
  },
  {
    id: "8",
    title: "Modern JavaScript Features You Should Know",
    content:
      "JavaScript continues to evolve with new features being added regularly. This post covers the most important modern JavaScript features including destructuring, arrow functions, async/await, modules, and the latest additions like optional chaining and nullish coalescing. We'll provide practical examples and explain how these features can make your code more readable and maintainable.",
    image: "/placeholder.svg?height=300&width=600",
    author: { id: "2", name: "Jane Smith", profilePicture: "/placeholder.svg?height=100&width=100" },
    createdAt: "March 8, 2024",
    likes: ["1", "3"],
    comments: [],
    tags: ["JavaScript", "ES6", "Programming"],
  },
  {
    id: "9",
    title: "Database Design Best Practices",
    content:
      "Good database design is crucial for application performance and maintainability. This comprehensive guide covers database design principles, normalization, indexing strategies, and performance optimization techniques. We'll also discuss when to use SQL vs NoSQL databases, schema design patterns, and common pitfalls to avoid. Whether you're working with PostgreSQL, MongoDB, or other database systems, these principles apply universally.",
    image: "/placeholder.svg?height=300&width=600",
    author: { id: "3", name: "Mike Johnson", profilePicture: "/placeholder.svg?height=100&width=100" },
    createdAt: "March 7, 2024",
    likes: ["1", "2"],
    comments: [
      {
        id: "5",
        content: "The section on indexing was really helpful for optimizing my queries.",
        author: { id: "1", name: "John Doe", profilePicture: "/placeholder.svg?height=100&width=100" },
        createdAt: "March 8, 2024",
      },
    ],
    tags: ["Database", "SQL", "Performance"],
  },
  {
    id: "10",
    title: "Testing React Applications",
    content:
      "Testing is an essential part of building reliable React applications. This guide covers different types of testing including unit tests, integration tests, and end-to-end tests. We'll explore popular testing tools like Jest, React Testing Library, and Cypress. You'll learn how to write effective tests, mock dependencies, and set up continuous integration pipelines to ensure your code quality remains high.",
    image: "/placeholder.svg?height=300&width=600",
    author: { id: "1", name: "John Doe", profilePicture: "/placeholder.svg?height=100&width=100" },
    createdAt: "March 6, 2024",
    likes: ["2"],
    comments: [],
    tags: ["React", "Testing", "Quality Assurance"],
  },
]
