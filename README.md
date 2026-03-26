# 🚀 Scalable E-Commerce Backend (Node.js + MongoDB + JWT)

![Node.js](https://img.shields.io/badge/Node.js-Backend-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-Framework-black?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Status](https://img.shields.io/badge/Project-In%20Progress-blue)

---

## 🧠 Overview

This project is a **production-ready E-commerce Backend** built using **Node.js, Express, and MongoDB**, implementing real-world backend architecture with **JWT authentication, role-based authorization, product management, and cart system**.

Designed to simulate how scalable backend systems like Amazon operate at a conceptual level.

---

## ✨ Features

### 🔐 Authentication & Authorization

* User Signup & Login
* Password hashing using bcrypt
* JWT-based authentication
* Role-based access control (Admin / User)

---

### 📦 Product Management

* Admin can:

  * Add products
  * Update products
  * Delete products
* Public users can:

  * View products
  * Search products

---

### 🔍 Pagination & Search

* Efficient pagination using `skip` & `limit`
* Search using MongoDB `$regex`
* Optimized API responses

---

### 🛒 Cart System (Core Logic)

* Add to cart
* Prevent duplicate products
* Auto-increase quantity
* User-specific cart management

---

## 🏗️ Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

### Security

* bcrypt.js (password hashing)
* JSON Web Tokens (JWT)

---

## 📂 Project Structure

```id="ikj2kh"
ecommerce-backend/
│
├── models/        # Database schemas
├── controllers/   # Business logic
├── routes/        # API routes
├── middleware/    # Auth & role handling
├── config/        # Config files
│
├── app.js         # Entry point
└── .env           # Environment variables
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash id="p0j4af"
git clone https://github.com/YOUR_USERNAME/ecommerce-backend.git
cd ecommerce-backend
```

---

### 2️⃣ Install Dependencies

```bash id="dz1d2q"
npm install
```

---

### 3️⃣ Setup Environment Variables

Create `.env` file:

```env id="u1u2d0"
MONGO_URI=mongodb://127.0.0.1:27017/ecommerceDB
JWT_SECRET=your_secret_key
PORT=5000
```

---

### 4️⃣ Run Server

```bash id="d9b8gw"
node app.js
```

---

## 📡 API Endpoints

### 🔐 Auth

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | `/api/auth/signup` | Register user |
| POST   | `/api/auth/login`  | Login user    |

---

### 📦 Products

| Method | Endpoint            | Access |
| ------ | ------------------- | ------ |
| GET    | `/api/products`     | Public |
| POST   | `/api/products`     | Admin  |
| PUT    | `/api/products/:id` | Admin  |
| DELETE | `/api/products/:id` | Admin  |

---

### 🛒 Cart

| Method | Endpoint    | Description |
| ------ | ----------- | ----------- |
| POST   | `/api/cart` | Add to cart |

---

## 🔁 System Flow

```id="0sxmhd"
User Signup/Login
        ↓
JWT Token Generated
        ↓
Token stored in client
        ↓
Token sent in headers
        ↓
Middleware verifies token
        ↓
Access granted (based on role)
```

---

## 🧠 Key Concepts Implemented

* MVC Architecture
* REST API Design
* JWT Authentication
* Role-Based Authorization
* Pagination & Filtering
* MongoDB Relationships
* Scalable Backend Design

---

## 🚀 Future Improvements

* 🧾 Order Management System
* 💳 Payment Integration (Stripe/Razorpay)
* 📊 Admin Dashboard APIs
* ⚡ Caching (Redis)
* 🚀 Deployment (Render/Vercel)

---

## 👨‍💻 Author

**Ayush Kumar**
Aspiring Full Stack Developer 🚀

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!

---
