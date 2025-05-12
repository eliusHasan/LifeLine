# 🩺 Lifeline - A Blogging Platform

Lifeline is a full-stack blogging application where users can share posts, read content, and manage their profiles. Built with the MERN stack.
## 🌐 Live Demo

Frontend: [https://lifelineapps.netlify.app](https://lifelineapps.netlify.app)  
Backend: [https://lifeline-zenc.onrender.com](https://lifeline-zenc.onrender.com)

## ⚠️ Browser Cookie Notice
This app uses HTTP-only cookies for authentication (SameSite=None; Secure) because the frontend (Netlify) and backend (Render) are hosted on different domains.

**✅ Firefox**

Works fine by default. No special settings needed.

**⚠️ Chrome, Edge, and other Chromium-based browsers**

To make login and authentication work properly:
-You must enable third-party cookies in browser settings.
-Otherwise, your browser will silently block cookies and cause 401 Unauthorized errors during API requests.

## ✨ Features
- User authentication (Login/Register with JWT)
- Create blog posts
- View other users' profiles and blogs
- Upload profile images and write bio


## ⚙️ Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Auth**: JWT + Cookies
- **Hosting**: Netlify (frontend), Render (backend)

## 🏗️ Setup Instructions

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/lifeline.git
cd lifeline
```
2. **Backend Setup:**

```bash
cd backend
npm install
```

3. **Add environment variables:**

```bash
MONGO_URI=
PORT=
JWT_SECRET=
JWT_EXPIRES_IN=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

4. **Start backend:**

```bash
npm start
```

5. **Frontend Setup :**
   Go to the frontend directory and run:

```bash
npm install
npm run dev
```

## 🗃️ Database Models
**🧑 User Schema**
```bash
{
  name: String,
  email: String,
  mobile: String,
  address: String,
  password: String (hashed),
  profileImage: String,
  aboutMe: String,
  socials: {
    facebook: String,
    linkedIn: String,
    instagram: String,
    twitter: String
  },
  createdAt: Date,
  updatedAt: Date
}

```
**📝 Blog Schema**
```bash
{
  title: String,
  content: String,
  category: String,
  coverImage: String,
  authorID: ObjectId (ref: "User"),
  createdAt: Date,
  updatedAt: Date
}
```



