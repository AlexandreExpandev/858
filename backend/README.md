# Counting App Backend

A Node.js backend application that provides an API for counting from 1 to 10 with various control features.

## Features

- Start, pause, resume, and restart counting from 1 to 10
- Control counting speed (slow, medium, fast)
- Get current counter status
- User authentication
- API endpoints for all counting operations

## Tech Stack

- Node.js
- Express.js
- TypeScript
- JWT Authentication
- Winston Logger
- Zod Validation

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies
   ```
   npm install
   ```
3. Copy the example environment file
   ```
   cp .env.example .env
   ```
4. Start the development server
   ```
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/external/security/login` - User login
- `POST /api/external/security/register` - User registration

### Counter Operations

- `POST /api/internal/counter/start` - Start counting
- `POST /api/internal/counter/pause` - Pause counting
- `POST /api/internal/counter/resume` - Resume counting
- `POST /api/internal/counter/restart` - Restart counting
- `PUT /api/internal/counter/speed` - Set counting speed
- `GET /api/internal/counter/status` - Get counter status

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production build
- `npm run lint` - Run linting
- `npm test` - Run tests

## Project Structure

```
src/
├── api/                    # API controllers
│   ├── external/           # Public endpoints
│   └── internal/           # Authenticated endpoints
├── config/                 # Application configuration
├── middleware/             # Express middleware
├── routes/                 # Route definitions
├── services/               # Business logic
├── types/                  # TypeScript type definitions
├── utils/                  # Utility functions
└── server.ts              # Application entry point
```
