# Counter API

A RESTful API for a counting system that counts from 1 to 10 with features for controlling the counting process.

## Features

- Start, pause, resume, and restart counting
- Control counting speed (slow, medium, fast)
- Display numerical sequence from 1 to 10
- User authentication and authorization
- Secure API endpoints

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
3. Copy the environment file and configure it
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

### Build

```
npm run build
```

### Run Tests

```
npm test
```

### Linting

```
npm run lint
```

## Project Structure

```
src/
├── api/                  # API controllers
│   ├── external/         # Public endpoints
│   └── internal/         # Authenticated endpoints
├── config/               # Application configuration
├── middleware/           # Express middleware
├── routes/               # Route definitions
├── services/             # Business logic
│   ├── counter/          # Counter service
│   └── security/         # Authentication service
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
└── server.ts            # Application entry point
```

## License

This project is licensed under the MIT License.
