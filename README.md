# 🤖 Codezy AI 

Welcome to **Codezy AI**, your intelligent AI-powered chatbot built using the **Google Gemini API**. Codezy AI delivers real-time, natural, and contextual conversations—perfect for productivity, learning, or casual interaction.

<img width="1919" height="904" alt="image" src="https://github.com/user-attachments/assets/cabc1fb0-1709-44e8-aacf-034831b75819" />


## ✨ Features

- 🧠 Gemini-Powered Intelligence – Uses Google's Gemini API to generate human-like responses.
- 💬 Modern Chat UI – Smooth, responsive, and mobile-friendly interface.
- 🗂 Contextual Conversations – Remembers previous user messages for smarter replies.
- 🌍 Multilingual Support – Chat in multiple languages seamlessly.
- 🔐 Secure API Integration – Environment-based API key protection.
- 🎨 Customizable – Easy to tweak branding, layout, and themes.

## 🚀 Live Demo

👉 [Try Codezy AI Online](https://codezy-ai-6wui.vercel.app/)

*(Replace with your actual deployment link)*

## 📸 Screenshots

### 💬 Chat Interface  
<img width="1419" height="826" alt="image" src="https://github.com/user-attachments/assets/c31be79e-bb29-49f7-b047-50a5850ee820" />
<img width="1594" height="908" alt="image" src="https://github.com/user-attachments/assets/b59c656c-b6e8-4f69-a304-85f74e4aed2d" />
<img width="1598" height="905" alt="image" src="https://github.com/user-attachments/assets/776d32e7-fe07-43ef-971b-e41d4bfc7764" />
<img width="1596" height="906" alt="image" src="https://github.com/user-attachments/assets/a89c0dfb-1f8e-472d-abfa-557d20b51c1a" />

## 🛠️ Tech Stack

- **Frontend**: React JS / Vite / Next.js (your choice)
- **Styling**: Tailwind CSS
- **AI Engine**: [Google Gemini API](https://ai.google.dev/)
- **Deployment**: Vercel / Netlify / Firebase

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone (https://github.com/sujalshah593/Nexlog.git)
cd codezy-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file in root

```env
VITE_GEMINI_API_KEY=your_google_gemini_api_key
```

### 4. Start development server

```bash
npm run dev
```

Visit `http://localhost:5173` to view it locally.

## 🔑 Gemini API Setup

1. Go to [Google AI Studio](https://makersuite.google.com/app) and log in.
2. Generate a Gemini API key.
3. Add it to your `.env` file as shown above.

## 🧠 Sample API Request

```ts
const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + import.meta.env.VITE_GEMINI_API_KEY, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    contents: [{ parts: [{ text: userMessage }] }]
  }),
});
const data = await response.json();
```

## 📁 Project Structure

```
codezy-ai/
├── public/              # Static assets (icons, images)
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page routing (if using Next.js)
│   ├── utils/           # API functions
│   └── App.jsx          # Main App file
├── .env                 # Environment variables
├── package.json         # Project metadata
└── README.md            # This file
```

## ✅ Best Practices

- Never expose your API key publicly (use `.env`).
- Use backend proxy for better security (optional).
- Optimize message length to stay within token limits.
- Deploy only via trusted platforms like Vercel, Netlify.

## 🛠 Future Improvements

- 🗣 Add voice input/output (Web Speech API)
- 💾 Store chat history using Firebase or Supabase
- 👤 Add authentication (Firebase Auth)
- 📱 Make it a PWA for mobile install

## 🙌 Acknowledgements

- [Google Gemini API](https://ai.google.dev/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

## 📄 License

This project is licensed under the **MIT License**. Feel free to modify and use it in your own projects.

## 👤 Author

Made with ❤️ by **Sujal Shah**  
GitHub: [@sujalshahdev](https://github.com/sujalshahdev)
