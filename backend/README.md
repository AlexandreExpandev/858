# Counter API

A RESTful API for a counting system that counts from 1 to 10 with various control features.

## Features

- Start counting from 1 to 10
- Pause and resume counting
- Restart counting from 1
- Control counting speed (slow, medium, fast)
- Display the numerical sequence
- User authentication and authorization

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Copy the example environment file:
   ```
   cp .env.example .env
   ```
4. Configure environment variables in `.env`

### Development

Start the development server:

```
npm run dev
```

### Production Build

Build the application:

```
npm run build
```

Start the production server:

```
npm start
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
- `PUT /api/internal/counter/speed` - Update counting speed
- `GET /api/internal/counter/status` - Get counter status

## Project Structure

```
src/
├── api/                  # API controllers
├── config/               # Application configuration
├── constants/            # Application constants
├── middleware/           # Express middleware
├── routes/               # Route definitions
├── services/             # Business logic
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
└── server.ts            # Application entry point
```

## License

This project is licensed under the MIT License.
