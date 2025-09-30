# Counter API

A RESTful API for counting from 1 to 10 with features for controlling the counting process.

## Features

- Start counting from 1 to 10
- Pause and resume counting
- Restart counting from 1
- Control counting speed (slow, medium, fast)
- Display the numerical sequence

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
3. Create a `.env` file based on `.env.example`
4. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/external/security/auth/login` - Authenticate user and get JWT token

### Counter Operations

- `POST /api/internal/counter/start` - Start counting from 1 to 10
- `POST /api/internal/counter/pause` - Pause the counting process
- `POST /api/internal/counter/resume` - Resume the counting process
- `POST /api/internal/counter/restart` - Restart counting from 1
- `PUT /api/internal/counter/speed` - Set the counting speed (slow, medium, fast)
- `GET /api/internal/counter/status` - Get the current counter status

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

- `src/api` - API controllers
- `src/middleware` - Express middleware
- `src/services` - Business logic
- `src/utils` - Utility functions
- `src/config` - Application configuration
- `src/routes` - API routes

## License

MIT
