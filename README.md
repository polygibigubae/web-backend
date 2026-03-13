# Spiritual Website Backend

A comprehensive backend system for a spiritual website with role-based authentication, membership management, and admin approval system.

## Features

- **Role-Based Authentication**: Four roles (Super Admin, Admin, Member, Guest)
- **User Registration & Login**: Secure signup and login with JWT tokens
- **Password Security**: Bcrypt hashing for password storage
- **Membership Management**: Digital membership form submission for Members
- **Admin Approval System**: Admins can approve or reject membership applications
- **Role Management**: APIs for managing user roles and status
- **MySQL Database**: Using Sequelize ORM for database operations
- **ES Modules**: Modern JavaScript with ES module syntax

## Tech Stack

- **Node.js** with Express.js
- **MySQL** with Sequelize ORM
- **JWT** for authentication
- **Bcryptjs** for password hashing
- **ES Modules** for modern JavaScript

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory (use `.env.example` as reference):
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=spiritual_website
DB_USER=root
DB_PASSWORD=your_password

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

PORT=3000
NODE_ENV=development
```

3. Create the MySQL database:
```sql
CREATE DATABASE spiritual_website;
```

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Authentication

#### POST `/api/auth/signup`
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "Guest",
      "isActive": true
    },
    "token": "jwt_token_here"
  }
}
```

#### POST `/api/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "Guest"
    },
    "token": "jwt_token_here"
  }
}
```

#### GET `/api/auth/profile`
Get current user profile (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

### Membership

#### POST `/api/members/submit`
Submit a membership form (requires Member role or higher).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "phoneNumber": "+1234567890",
  "address": "123 Main St, City, State",
  "dateOfBirth": "1990-01-01",
  "occupation": "Software Developer",
  "spiritualBackground": "Background information",
  "reasonForJoining": "Reason for joining",
  "additionalInfo": "Any additional information"
}
```

#### GET `/api/members/my-membership`
Get current user's membership application (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

#### GET `/api/members/all`
Get all membership applications (requires Admin or Super Admin).

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `status`: Filter by status (pending, approved, rejected)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

#### POST `/api/members/:id/approve`
Approve a membership application (requires Admin or Super Admin).

**Headers:**
```
Authorization: Bearer <token>
```

#### POST `/api/members/:id/reject`
Reject a membership application (requires Admin or Super Admin).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "rejectionReason": "Reason for rejection (optional)"
}
```

### Role Management

#### GET `/api/roles/users`
Get all users with pagination and filters (requires Admin or Super Admin).

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `role`: Filter by role (Super Admin, Admin, Member, Guest)
- `isActive`: Filter by active status (true/false)
- `search`: Search by email, first name, or last name
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

#### GET `/api/roles/users/:id`
Get user by ID (requires Admin or Super Admin).

**Headers:**
```
Authorization: Bearer <token>
```

#### PATCH `/api/roles/users/:id/role`
Update user role (requires Admin or Super Admin).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "role": "Member"
}
```

**Note:** Admins cannot assign Super Admin or Admin roles. Only Super Admins can.

#### PATCH `/api/roles/users/:id/status`
Activate or deactivate a user (requires Admin or Super Admin).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "isActive": true
}
```

## Roles and Permissions

### Super Admin
- Full access to all endpoints
- Can assign any role (including Super Admin and Admin)
- Can manage all users and memberships

### Admin
- Can manage memberships (approve/reject)
- Can view all users
- Can assign Member or Guest roles only
- Cannot assign Super Admin or Admin roles

### Member
- Can submit membership form
- Can view own membership status
- Cannot access admin functions

### Guest
- Can register and login
- Cannot submit membership form
- Cannot access admin functions

## Database Models

### User
- `id`: Primary key
- `email`: Unique email address
- `password`: Hashed password
- `firstName`: User's first name
- `lastName`: User's last name
- `role`: Enum (Super Admin, Admin, Member, Guest)
- `isActive`: Boolean status
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

### Membership
- `id`: Primary key
- `userId`: Foreign key to User
- `phoneNumber`: Contact number
- `address`: Physical address
- `dateOfBirth`: Date of birth
- `occupation`: User's occupation
- `spiritualBackground`: Background information
- `reasonForJoining`: Reason for joining
- `additionalInfo`: Additional information
- `status`: Enum (pending, approved, rejected)
- `approvedBy`: Foreign key to User (admin who approved)
- `approvedAt`: Approval timestamp
- `rejectionReason`: Reason for rejection (if rejected)
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

## Error Handling

All errors follow a consistent format:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [] // Optional array of validation errors
}
```

## Security Features

- Passwords are hashed using bcryptjs (10 salt rounds)
- JWT tokens for stateless authentication
- Role-based access control middleware
- Input validation on all endpoints
- SQL injection protection via Sequelize ORM
- Password excluded from API responses

## Development

The server runs on port 3000 by default. Make sure MySQL is running and the database is created before starting the server.

## License

ISC
