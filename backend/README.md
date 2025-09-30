# Counter App Backend

A Node.js backend application for a counting system that counts from 1 to 10 with various control features.

## Features

- Start counting from 1 to 10
- Pause and resume counting at any point
- Restart counting from 1
- Control counting speed (slow, medium, fast)
- Display the numerical sequence clearly

## Tech Stack

- Node.js
- Express.js
- TypeScript
- JWT Authentication
- Zod for validation

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
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
└── server.ts            # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example`
4. Start the development server
   ```
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/external/auth/login` - User login
- `POST /api/external/auth/register` - User registration

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

### Lint

```
npm run lint
```

### Test

```
npm test
```

## License

MIT
