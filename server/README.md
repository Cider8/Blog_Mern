This is the backend API for the Autosave_Blog project using MERN stack.
It is built with Node.js, Express.js, and MongoDB (via Mongoose).
The API provides endpoints to create, read, update, and delete (CRUD) blog posts.

Deployed on: Render

# Features

- Use postman for Api testing in CRUD operation for blog
- MongoDB Atlas integration using Mongoose
- Middleware support (cors, express.json)
- Environment variables with dotenv
-Ready for deployment on Render / Vercel Functions

backend/
|── config/
│   └── db.js          # Database connection
├── controllers/
│   └── blogController.js # Business logic for blog routes
├── models/
│   └── blogModel.js   # Blog schema (Mongoose)
├── routes/
│   └── blogRoutes.js  # Blog endpoints
├── server.js          # App entry point
├── package.json
└── .env      # Environment variable sample

# Example of API testing
### Example: Create a Blog (POST /blogs)
Request body:
```json
{
  "title": "My First Blog",
  "content": "This is an example blog post",
}
after that 
get response too, which will be also update my dataCollection


# Push code in Github