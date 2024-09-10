# Ticketing System API

This is a Ticketing System API built using **TypeScript**, **Express**, **TypeORM**, **PostgreSQL**, and **JWT** for authentication. It allows users to register, login, create and manage events, purchase tickets, and view purchase history.

## Features

- User registration and login with JWT authentication.
- Event management (create, update, view events).
- Ticket purchase and ticket categories (VIP, General Admission).
- View ticket purchase history.
- Secured routes with JWT authentication.
- API documentation with Swagger.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v14 or later)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Docker](https://www.docker.com/get-started) (Optional for containerization)
- [TypeORM](https://typeorm.io/#/) for database management

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/oliver280294/ticketing-system-api.git
cd ticketing-system-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
```bash
Create a .env file at the root of the project with the following values:

# Database configuration
DATABASE_URL=your_db_url
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

# JWT Secret
JWT_SECRET=yourSuperSecretKey

# Server Port
PORT=3000
```

### 4. Running the Project

```bash
npm run build
npm run start
```

## Swagger API Documentation
Swagger UI is available to interact with the API and view documentation:

Navigate to http://localhost:3000/api-docs to access Swagger UI.
