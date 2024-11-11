## Instructions

1. Run `npm run client:install`
2. Run `npm run server:install`
3. Run `npm run db:reset`
4. Run `npm run server:start` `npm run server:dev` to start an expressjs server on `localhost:3001`
5. In a separate terminal window, run the vite dev environment with `npm run client:dev` client will start on `localhost:5173/`

## Environment Variables
Create a `.env` file in the root directory with:

```bash
STARRED_JOB_URL=https://yon9jygrt9.execute-api.eu-west-1.amazonaws.com
```

## API Endpoints

### Jobs API
- `GET /jobs` - Get paginated list of jobs
- `GET /jobs/<jobId>` - Get specific job details
- `GET /jobs?q=<title>` - Get job recommendations based on title

### Users API
- `GET /users` - Get all users
- `GET /users?include=favorites` - Get all users with favorites
- `GET /users/<userId>/favorites` - Get user favorites
- `POST /users/<userId>/favorite` - Add favorite to user
- `DELETE /users/<userId>/favorite` - DELETE favorite from user

## Features:
- SPA displaying where the viewer can select a user
- View all active jobs
- Filter jobs by title
- add/ remove/ view favorite jobs

## My thoughts
Further Code improvements would be:
 - Dockerize the application, both for development and production builds. I usually find dockerized applications improves overall DX
 - Implement state manager like zustand or redux
 - Rewrite the backend to use ES-modules, now the application lives in both worlds which is suboptimal
 - Implement ORM, it makes life so much easier both with typing, writing database queries and handling database migrations.
 - Frontend could implement something like trpc https://trpc.io/
 - Add necessary unit test, I usually test functions that contains a lot of logic
 - Add better structure around typing, you want one source of truth.
 - For better SEO we would like to SSR all active jobs.
 - Add skeleton loaders
 - Overall UI improvements eg. responsive design, reduce UI jumping, error handling.
 - API-documentation with something like Swagger / OpenAPI

## Other features:
- Signup
- Logout
- Detailed job page where user can view metadata/ apply for job `/job/:jobId`
- Give the user more filter options where you can search on metadata
