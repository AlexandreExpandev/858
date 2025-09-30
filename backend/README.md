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
- `POST /api/internal/counter/speed` - Set counting speed
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

## License

This project is licensed under the MIT License.
