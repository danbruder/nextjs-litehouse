# Next.js SQLite App

A simple Next.js application with SQLite database integration, ready for Docker deployment.

## Features

- Next.js 14 with App Router
- SQLite database using `better-sqlite3`
- TypeScript support
- Docker-ready with multi-stage build
- Simple message storage and retrieval API

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

The SQLite database will be automatically created in the `data/` directory on first run.

## Docker Deployment

### Build the Docker image:
```bash
docker build -t nextjs-litehouse .
```

### Run the container:
```bash
docker run -p 3000:3000 nextjs-litehouse
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Persist database data:
To persist the SQLite database across container restarts, mount a volume:
```bash
docker run -p 3000:3000 -v $(pwd)/data:/app/data nextjs-litehouse
```

## Project Structure

```
.
├── app/
│   ├── api/messages/     # API routes for messages
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── lib/
│   └── db.ts          # Database connection and setup
├── data/              # SQLite database files (created automatically)
├── Dockerfile         # Docker configuration
└── package.json       # Dependencies
```

## API Endpoints

- `GET /api/messages` - Get all messages
- `POST /api/messages` - Create a new message (body: `{ "text": "your message" }`)
# nextjs-litehouse
