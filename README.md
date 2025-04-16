# Secure Rest API

A backend application powered by Node.js, Express, and Mongoose for secure authentication and integrated payment processing.

---

## 🚀 Features

- User authentication (JWT-based)
- Password hashing with bcrypt
- Secure API with environment-based configuration
- Payment gateway integration
- MongoDB database connection

---

## 📁 Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/gandib/secure-rest-api.git
cd secure-rest-api
```

### 2. Install Dependencies

```bash
npm install
```

Create a .env file in the root directory of the project and configure the following variables:

# App Environment

NODE_ENV=development # or production

# Server Port

PORT=5000

# Database Connection

DATABASE_URL=mongodb://localhost:27017/your-db-name

# Password Hashing

DCRYPT_SALT_ROUNDS=10 # Number of salt rounds for bcrypt

# JWT Secrets & Expiry

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRE_IN=15m # Access token expiration time
JWT_REFRESH_EXPIRE_IN=7d # Refresh token expiration time

# Payment Integration

Here using Amarpay payment system

PAYMENT_URL=https://payment.api.com/initiate
PAYMENT_VERIFY_URL=https://payment.api.com/verify
STORE_ID=your_store_id
SIGNATURE_KEY=your_signature_key
