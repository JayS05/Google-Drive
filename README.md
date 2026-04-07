# 📁 Google Drive Clone
> A cloud-based file storage system built with Node.js, MongoDB, and JWT authentication — inspired by Google Drive.

---

## 📌 What is this?

A full-stack web application that replicates core Google Drive features:
- Upload, download, and delete files securely
- User authentication with JWT
- Personal file storage for each user
- Folder management system
- Clean and responsive UI

---

## 🏗️ Project Structure

```
google-Drive/
├── public/              # Frontend (HTML, CSS, JS)
├── routes/              # API routes
├── models/              # MongoDB schemas
├── middleware/          # JWT authentication middleware
├── uploads/             # Uploaded files storage
├── .env                 # Environment variables
├── server.js            # Main server file
└── package.json         # Dependencies
```

---

## ⚙️ How It Works

```
User registers/logs in
        ↓
JWT token generated → stored in browser
        ↓
User uploads file → saved to server
        ↓
File metadata saved to MongoDB
        ↓
User can view, download, delete files
        ↓
All files are private to each user
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/jayS05/Google-Drive.git
cd Google-Drive
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4. Run the application
```bash
node server.js
```

### 5. Open in browser
```
http://localhost:3000
```

---

## 🖥️ Features

| Feature | Description |
|---|---|
| 📤 File Upload | Upload any file type securely |
| 📥 File Download | Download your files anytime |
| 🗑️ File Delete | Remove unwanted files |
| 📂 Folder Management | Organize files in folders |
| 🔐 Authentication | Secure login and register with JWT |
| 👤 User Specific | Each user sees only their own files |

---

## 🤖 Tech Stack

| Component | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Authentication | JWT (JSON Web Tokens) |
| File Handling | Multer |

---

## 📦 Dependencies

```
express
mongoose
jsonwebtoken
bcryptjs
multer
dotenv
```

---

## 🔐 Authentication Flow

```
Register → Password hashed with bcrypt
        → Saved to MongoDB

Login   → Password verified
        → JWT token generated
        → Token sent to client

Request → Token verified by middleware
        → User gets access to their files
```

---

## 💡 Usage

1. Register a new account
2. Login with your credentials
3. Upload files using the upload button
4. View all your uploaded files
5. Download or delete files as needed

---

## ⚠️ Important Notes

- Never share your `.env` file — it contains secret keys
- `.env` is excluded from GitHub via `.gitignore`
- `uploads/` folder is also excluded from GitHub

---

## 🙋 Author

**Jaydatta** — [github.com/jayS05](https://github.com/jayS05)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
