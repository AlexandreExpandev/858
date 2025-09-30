# Counter API

A RESTful API for counting from 1 to 10 with features for controlling the counting process.

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
2. Install dependencies:
   ```
   npm install
   ```
3. Copy `.env.example` to `.env` and configure environment variables
4. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/external/security/auth/login` - User login
- `POST /api/external/security/auth/register` - User registration

### Counter Operations

- `POST /api/internal/counter/start` - Start counting
- `POST /api/internal/counter/pause` - Pause counting
- `POST /api/internal/counter/resume` - Resume counting
- `POST /api/internal/counter/restart` - Restart counting
- `POST /api/internal/counter/speed` - Set counting speed
- `GET /api/internal/counter/status` - Get current counter status

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

## Development

- Build the project: `npm run build`
- Run tests: `npm test`
- Lint code: `npm run lint`

## License

MIT
