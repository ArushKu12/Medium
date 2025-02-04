# Medium Clone Project

A full-stack web application that clones core Medium functionalities using React for the frontend and Hono for the backend.

## Project Structure

```
medium-clone/
├── frontend/     # React application
└── backend/      # Hono server
```

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm (v9 or higher)
- PostgreSQL database

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the backend directory
   - Add your Prisma connection pooling URL:
   ```
   DATABASE_URL="your_connection_pooling_url_here"
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The server will start running on `http://localhost:3000` (or your configured port)

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The React application will start running on `http://localhost:5173`

## Deployment

### Backend Deployment

To deploy the backend:

```bash
cd backend
npm run deploy
```

## Development

- Frontend development server runs on port 5173
- Make sure both servers are running simultaneously during development

## Scripts

Backend:
- `npm run dev`: Start development server
- `npm run deploy`: Deploy the application

Frontend:
- `npm run dev`: Start development server
- `npm run build`: Build for production

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

