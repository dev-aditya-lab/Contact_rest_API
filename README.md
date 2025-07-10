# 📄 Node.js Contact Manager API Documentation

A simple Node.js + Express + MongoDB based **Contact Manager API** with **User Authentication** using JWT and **secure cookie login**.

---

## 🚀 Technologies Used

* **Node.js & Express** for backend server
* **MongoDB & Mongoose** for database
* **JWT** for user authentication
* **bcryptjs** for password hashing
* **CORS** for handling cross-origin requests
* **cookie-parser** for managing HTTP cookies
* **dotenv** for managing environment variables

---

## 🗂️ Project Structure (API Routes)

| Feature       | Method | Route                   | Description                       |
| ------------- | ------ | ----------------------- | --------------------------------- |
| Register      | POST   | `/api/user/register`    | Register a new user               |
| Login         | POST   | `/api/user/login`       | Authenticate user, set JWT cookie |
| All Contacts  | GET    | `/api/contact/all`      | Get all contacts (admin level)    |
| New Contact   | POST   | `/api/contact/new`      | Add a new contact                 |
| By ID         | GET    | `/api/contact/:id`      | Get contact by ID                 |
| Update        | PUT    | `/api/contact/:id`      | Update contact by ID              |
| Delete        | DELETE | `/api/contact/:id`      | Delete contact by ID              |
| User Contacts | GET    | `/api/contact/user/:id` | Get contacts for specific user    |

---

## 🔐 User Auth APIs

### 📌 Register User

**Endpoint:** `POST /api/user/register`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

**Success Response:**

```json
{
  "message": "User registered successfully",
  "success": true,
  "user": { ... }
}
```

---

### 📌 Login User

**Endpoint:** `POST /api/user/login`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

**Success Response:**

* Sets `token` in `httpOnly` cookie
* Returns basic user info

```json
{
  "message": "User logged in successfully",
  "success": true,
  "user": {
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "<jwt_token>"
}
```

---

## 📇 Contact APIs

### ✅ Get All Contacts

**Endpoint:** `GET /api/contact/all`

### ✅ Create New Contact

**Endpoint:** `POST /api/contact/new`

**Request Body:**

```json
{
  "name": "Client A",
  "email": "client@example.com",
  "phone": "9999999999",
  "type": "work"
}
```

### ✅ Get Contact by ID

**Endpoint:** `GET /api/contact/:id`

### ✅ Update Contact by ID

**Endpoint:** `PUT /api/contact/:id`

**Request Body:** (same as create)

### ✅ Delete Contact by ID

**Endpoint:** `DELETE /api/contact/:id`

### ✅ Get Contacts by User ID

**Endpoint:** `GET /api/contact/user/:id`

---


---

## ⚙️ Environment Variables (.env)

```env
PORT=5000
MONGO_URI=<your-mongodb-url>
JWT_SECRET=<your-jwt-secret>
NODE_ENV=development
```
---

---

> Made with ❤️ using Node.js and Express by Aditya Gupta 
