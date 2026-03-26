# Pipeline Builder (Frontend)

This is a node-based pipeline UI built with **Next.js** and **React Flow**.

When you click **Submit**, the frontend sends the current graph (`nodes` + `edges`) to the backend endpoint:
`POST /pipelines/parse`
and shows the result (node/edge counts and whether the graph is a DAG).

## Prerequisites

- Node.js (Next.js requires Node 18+)
- npm
- Python (only needed if you want to run the backend API locally)

## Run the backend (required for “Submit”)

1. From the repo root:
   `cd backend`
2. Install dependencies:
   `pip install fastapi uvicorn`
3. Start the server (runs on `http://localhost:8000`):
   `uvicorn main:app --reload --port 8000`

Health check:
- `GET http://localhost:8000/` (returns `{"Ping":"Pong"}`)

## Run the frontend

1. From the repo root:
   `cd frontend`
2. Install frontend deps:
   `npm install`
3. Start dev server:
   `npm run dev`
4. Open:
   `http://localhost:3000`

## Environment variable

The frontend uses this variable to locate the backend:

- `NEXT_PUBLIC_API_BASE_URL` (optional)
  - Default: `http://localhost:8000`

Example (PowerShell):
`$env:NEXT_PUBLIC_API_BASE_URL="http://localhost:8000"`

Then run `npm run dev`.

## Useful npm scripts

- `npm run dev` - start Next.js on port `3000`
- `npm run build` - build for production
- `npm run start` - run the production build (also on port `3000`)
- `npm run lint` - run Next.js linting
