# ⚙️ Productivity Dashboard – Backend

This is the **Node.js + Express** backend for the Productivity Dashboard project.  
It handles **authentication**, **CRUD operations**, **weather API requests**, and **data persistence** with PostgreSQL.

---

## 🛠 Tech Stack

- **Node.js**
- **Express**
- **PostgreSQL**
- **JWT Authentication**
- **Bcrypt** (password hashing)
- **Nodemailer** (email verification)
- **Dotenv** (environment variables)

---

## ⚙️ Setup & Installation

### 1 Navigate to the server folder

```bash
cd server
```
### 2 Install dependencies

```bash
npm install
```
### 3 Configure environment variables
Create a .env file inside the server folder:

PORT=5000
POSTGRES_URI=postgresql://username:password@localhost:5432/productivity_dashboard
JWT_SECRET_KEY=your_jwt_secret
REFRESH_TOKEN_SECRET_KEY=your_refresh_secret
EMAIL_USER=example@example.com
EMAIL_PASS=example_password

### 4 Database Setup
## Create the database
Make sure PostgreSQL is installed and running. Then:
```bash
createdb productivity_dashboard
```
## Run schema.sql
```bash
psql -d productivity_dashboard -f db/schema.sql
```

### 5 Start the development server
```bash
npm start
```
