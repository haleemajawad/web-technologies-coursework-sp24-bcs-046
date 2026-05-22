# 🛍️ Sapphire Clone — Full-Stack E-Commerce Platform

> A full-stack e-commerce web application inspired by Sapphire, built with Node.js, Express, MongoDB, and EJS. Features a dynamic product catalog, user authentication, admin panel, and a RESTful JWT-secured API.

## 🌐 Live Demo
**[View Live →](https://sapphire-clone-production.up.railway.app)**

---

## ✨ Features

- **Responsive Landing Page** — mobile-first design with plain HTML/CSS
- **Dynamic Product Catalog** — server-side pagination, search, category & price filters
- **Admin Panel** — full CRUD for products, image uploads via Multer
- **User Authentication** — register/login with bcrypt password hashing, session management
- **Role-Based Access Control** — customer vs admin roles, protected routes
- **RESTful API** — JWT-secured endpoints for products, orders, and user profile
- **Flash Messages** — real-time user feedback across all flows

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express.js |
| Templating | EJS |
| Database | MongoDB Atlas + Mongoose |
| Authentication | bcryptjs, express-session, connect-mongo |
| API Auth | JSON Web Tokens (JWT) |
| File Uploads | Multer |
| Frontend | HTML5, Plain CSS, Vanilla JavaScript |
| Deployment | Railway |

---

## 📁 Project Structure

```
├── models/
│   ├── Product.js
│   ├── User.js
│   └── Order.js
├── routes/
│   ├── admin.js
│   ├── api.js
│   ├── sales.js
│   └── auth.js
├── middleware/
│   └── auth.js
├── views/
│   ├── index/
│   ├── login/
│   ├── products/
│   └── admin/
        ├── add/
│       ├── dashboard/
│       ├── edit/
│       ├── layout/
│       ├── login/
│       └── sales/
├── public/
│   ├── css/
│   ├── js/
│   └── uploads/
├── .env
├── seed.js
└── server.js
```

---

## 🚀 Run Locally

### Prerequisites
- Node.js installed
- MongoDB Compass or Atlas account

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/haleemajawad/web-technologies-coursework-sp24-bcs-046.git

# 2. Navigate to the project folder
cd final-lab

# 3. Install dependencies
npm install

# 4. Create a .env file in the root
touch .env
```

Add these to your `.env` file:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
PORT=3000
```

```bash
# 5. Start the server
npm start
```

Open `http://localhost:3000` in your browser.

---

## 🔑 API Endpoints

### Public
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/products` | Get all products (paginated) |
| GET | `/api/v1/products/:id` | Get single product |
| POST | `/api/v1/auth/login` | Login and receive JWT token |

### Protected (Bearer Token required)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/orders` | Place an order |
| GET | `/api/v1/user/profile` | Get logged-in user profile |

---

## 👤 Default Admin Access

To access the admin panel at `/admin`, register an account and manually set the role to `admin` in the database, or seed one using the instructions below.

---

## 👩‍💻 Author

**Haleema Jawad**
- GitHub: [@haleemajawad](https://github.com/haleemajawad)
- LinkedIn: [haleema-jawad](https://linkedin.com/in/haleema-jawad)

---

## 📄 License

This project was built as coursework for Web Technologies — COMSATS University Islamabad, Lahore Campus (2024–2025).