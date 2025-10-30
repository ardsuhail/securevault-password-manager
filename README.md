# 🔐 SecureVault – Password Manager

**SecureVault** is a modern and secure password manager built with **Next.js**, **MongoDB**, and **NextAuth**.  
It allows users to safely **store, manage, and access** their passwords with encrypted storage and Google authentication.  
Designed with a **clean, responsive UI** using Tailwind CSS.

---

## 🚀 Features

- 🔑 **Google Authentication** using NextAuth  
- 🔒 **Encrypted password storage** in MongoDB  
- 🧠 **User-friendly dashboard** to manage credentials  
- 💻 **Responsive design** for all devices  
- 🧭 **Global state management** using React Context API  
- ⚙️ **Modern UI** with gradients, glass effects, and animations  

---

## 🧰 Tech Stack

| Category | Technology |
|-----------|-------------|
| Frontend | Next.js 15, React, Tailwind CSS |
| Backend | Next.js API Routes |
| Database | MongoDB with Mongoose |
| Authentication | NextAuth.js (Google Provider) |
| Deployment | Vercel |

---

## 📦 Installation & Setup

Follow these steps to run the project locally 👇

```bash
# 1️⃣ Clone the repository
git clone https://github.com/your-username/securevault-password-manager.git

# 2️⃣ Go into the project folder
cd securevault-password-manager

# 3️⃣ Install dependencies
npm install

# 4️⃣ Add your environment variables in .env.local
# Example:
# GOOGLE_ID=your_google_client_id
# GOOGLE_SECRET=your_google_secret
# NEXTAUTH_SECRET=your_nextauth_secret
# MONGODB_URI=your_mongodb_connection_string

# 5️⃣ Run the app
npm run dev
