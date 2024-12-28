<h1 align="center">
  🗨️ Blog Project with TS 💬
</h1>

## :memo: Objective:

  The goal of this assignment is to develop a backend for a blogging platform where users can write, update, and delete their blogs. 

## 🛠 Technology Used:

  - Backend Development:

    - **TypeScript**
    - **Node.js**
    - **Express.js**
    - **MongoDB with Mongoose**


## 🌐 Live server Preview

  [Blog Project with TS]()

---
## :wrench: Steps by steps commands to initialize the project:

- ```bash
  npn init -y
  ```
- ```bash
  npm install express --save
  ```
- ```bash
  npm install mongoose --save
  ```
- ```bash
  npm install typescript --save-dev
  ```
- ```bash
  npm i cors
  ```
- ```bash
  npm i dotenv
  ```
- ```bash
  tsc -init
  ```

  - In the `tsconfig.json` find & edit

    ```json
    "rootDir": "./src"
    ```

  - find & edit

    ```json
    "outDir": "./dist"
    ```

- Create a folder named `src` > `app` > `config` > `index.ts`, then paste:

  ```ts
  import dotenv from 'dotenv';
  import path from 'path';

  dotenv.config({ path: path.join((process.cwd(), '.env')) });
  //or
  //dotenv.config({path: path.join(__dirname,'.env')});

  export default {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
  };
  ```

  then further configure like this:

  ```ts
  import mongoose from 'mongoose';
  import app from './app';
  import config from './app/config';

  async function main() {
    try {
      await mongoose.connect(config.database_url as string);

      app.listen(config.port, () => {
        console.log(`Example app listening on port ${config.port}`);
      });
    } catch (error) {
      console.log(error);
    }
  }
  ```

- Create a folder named `src` > `app.ts` , paste:

  ```js
  import express, { Application, Request, Response } from "express";
  import cors from "cors";
  const app: Application = express();

  // parsers
  app.use(express.json());
  app.use(cors());

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
  });

  export default app;
  ```

- ```bash
  npm i --save-dev @types/node
  ```
- ```bash
  npm i --save-dev @types/cors
  ```
- ```bash
  npm i --save-dev @types/express
  ```
- use these changes to `app.ts`

  ```javascript
  import express, { Request, Response } from "express";
  const app = express();
  const port = 3000;

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
  });

  export default app;
  ```

- Add `scripts` to json file:

  ```json
      "scripts": {
      "build": "tsc",
  }
  ```

  By doing this terminal can convert the ts to js

  ```terminal
  npm run build
  ```

- Create `src` > `server.ts` , paste:

  ```js
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  ```

- Create `.env` file :

  ```
    PORT = 5000

    DATABASE_URL = mongodb+srv://<db_username>:<db_password>@cluster0.<smth>.mongodb.net/<DBname>?retryWrites=true&w=majority&appName=Cluster0
  ```

- Create `.gitignore` file and add:

  ```
  .env
  node_modules
  dist
  ```

- add the following to `tsconfig.json` :

  ```json
  "include": ["src"], // which files to compile
  "exclude": ["node_modules"], // which files to skip
  ```

- ```bash
  npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
  ```
- ```bash
  npx eslint --init
  ```
- Remodel the `eslint.config.mjs`:

  ```mjs
  import globals from 'globals';
  import pluginJs from '@eslint/js';
  import tseslint from 'typescript-eslint';
  import tsParser from '@typescript-eslint/parser';

  /** @type {import('eslint').Linter.Config[]} */
  export default [
    { files: ['**/*.{js,mjs,cjs,ts}'] },
    {
      languageOptions: {
        globals: globals.node, // Specifies the global variables, making them read-only as required by the flat config system.
        parser: tsParser, // Sets the parser for TypeScript files to ensure ESLint can parse TypeScript syntax correctly.
      },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
      ignores: ['.node_modules/*', 'dist/*'],
      rules: {
        eqeqeq: 'error', // Enforce strict equality
        'no-unused-vars': 'error',
        'no-unused-expressions': 'off', // Disable the original rule
        '@typescript-eslint/no-unused-expressions': 'error', // Use TypeScript-specific rule
        'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
        'no-console': 'warn',
        'no-undef': 'error',
      },
    },
  ];
  ```

- ```bash
  npm remove eslint
  ```
- ```bash
  npm i -D eslint@9.14.0
  ```
- add these scripts to `package.json`

  ```json
  "scripts": {
      "lint": "eslint src/**/*.ts",
      "lint:fix": "eslint src/**/*.ts --fix"
    },
  ```

- To find unused variables
  ```bash
  npm run lint
  ```
- To fix error variables
  ```bash
  npm run lint:fix
  ```
- Add prettier as dev dependencies
  ```bash
  npm i -D --exact prettier
  ```
- create `.prettierrc` and `.prettierignore` file in the root of your project
- Include basic configurations for prettier in the .prettierrc file.

  ```json
  {
    "semi": true,
    "singleQuote": true
  }
  ```

- Also, we need to tell prettier which files to not format So inside `.prettierignore` include the following

  ```
  dist
  coverage
  ```

- Finally we can add scripts for prettier as well in the `package.json` file.

  ```json
  "scripts": {
    "format": "prettier --ignore-path .gitignore --write \"./src/**/*.+(js|ts|json)\"",
    "format:fix": "npx prettier --write src/**/*.ts"
  }
  ```

  Note: For all kinds of format: (skip)

  ```json
  "scripts": {
    "format": "prettier . --write",
    "format:fix": "npx prettier --write src/**/*.ts"
  }
  ```

- You’ll likely run into an issue when a Prettier and ESLint rule overlap. You can try to auto-format your code, but it will show you some conflicts with ESLint.

  The best solution here is to use the `eslint-config-prettier` plugin to disable all ESLint rules that are irrelevant to code formatting, as Prettier is already good at it:

  ```bash
  npm install --save-dev eslint-config-prettier
  ```

- With that installed, let’s go to the `eslint.config.mjs` file, and add prettier at the end of your extends list to disable any other previous rules from other plugins:

  ```mjs
  // eslint.config.mjs
  const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

  module.exports = [
    // Any other config imports go at the top
    eslintPluginPrettierRecommended,
  ];
  ```

- Add TS nodemon like dev dependencies

  ```bash
  npm i ts-node-dev
  ```

- Add the following to `package.json`

  ```json
  "scripts": {
    "start:prod": "node ./dist/server.js",
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  }
  ```

- try the following to build in node:

  ```bash
  npm run start:prod
  ```

  or can try to be faster in development environment by (_works same as nodemon_):

  ```bash
  npm run start:dev
  ```

- Add the following to `.env`:

  ```
  NODE_ENV = development #production
  ```

- Create a `vercel.json` file and add:

  ```json
  {
    "version": 2,
    "builds": [
      {
        "src": "dist/server.js",
        "use": "@vercel/node"
      }
    ],
    "routes": [
      {
        "src": "/(.*)",
        "dest": "dist/server.js"
      }
    ]
  }
  ```

- Run the following command to deploy:

  - To login

    ```bash
    npx vercel login
    ```

    Then login to account with github

  - After login, run the following command

    ```bash
    npx vercel --prod
    ```

---
<br/>

✅ That' all the steps that are required to initialize the project.

---
<br/>

## 🧑🏻‍💻 What this project do?

  The goal of this assignment is to develop a backend for a blogging platform where users can write, update, and delete their blogs. The system will have two roles: **Admin** and **User**. The Admin has special permissions to manage users and their blogs, while users can perform CRUD operations on their own blogs. The backend will include secure authentication, role-based access control, and a public API for viewing blogs with search, sort, and filter functionalities.

<br/>

## Features

### 1\. User Roles

#### Admin:

*   Will be created manually in the database with predefined credentials.
*   Can delete any blog.
*   Can block any user by updating a property `isBlocked`.
*   **Cannot update any blog.**

#### User:

*   Can register and log in.
*   Can create blogs (only when logged in).
*   Can update and delete their own blogs.
*   **Cannot perform admin actions.**

### 2\. Authentication & Authorization

#### Authentication:

*   Users must log in to perform write, update, and delete operations.

#### Authorization:

*   Admin and User roles must be differentiated and secured.

### 3\. Blog API

*   A public API for reading blogs:
    *   Includes blog title, content, author details & other necessary information.
    *   Supports **search**, **sorting**, and **filtering** functionalities.

<br/>

## Models

  

**User Model:**

*   `name`: string – The full name of the user.
*   `email`: string – The email address of the user, used for authentication and communication.
*   `password`: string – The password for the user, securely stored.
*   `role`: "admin" | "user" – The role of the user, determining their access level. Default is "user".
*   `isBlocked`: boolean – A flag indicating whether the user is blocked or not. Default is false.
*   `createdAt`: Date – The timestamp when the user was created.
*   `updatedAt`: Date – The timestamp of the last update to the user.

  

**Blog Model:**

*   `title`: string – The title of the blog post.
*   `content`: string – The main body or content of the blog post.
*   `author`: ObjectId – A reference to the `User` model, indicating the author of the blog post.
*   `isPublished`: boolean – A flag indicating whether the blog post is published. Default is true (published).
*   `createdAt`: Date – The timestamp when the blog post was created.
*   `updatedAt`: Date – The timestamp of the last update to the blog post.

<br/> 

## API Endpoints

### 1\. Authentication

#### 1.1 Register User

**POST** `/api/auth/register`

**Description:** Registers a new user with the platform. It validates user data and saves it to the database.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**

*   **Success (201):**

      ```json
      {
        "success": true,
        "message": "User registered successfully",
        "statusCode": 201,
        "data": {
          "_id": "string",
          "name": "string",
          "email": "string"
        }
      }
      ```

*   **Failure (400):**

      ```json
      {
        "success": false,
        "message": "Validation error",
        "statusCode": 400,
        "error": { "details" },
        "stack": "error stack"
      }
      ```

####   

#### 1.2 Login User

**POST** `/api/auth/login`

**Description:** Authenticates a user with their email and password and generates a JWT token.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**

*   **Success (200):**

      ```json
      {
        "success": true,
        "message": "Login successful",
        "statusCode": 200,
        "data": {
          "token": "string"
        }
      }
      ```

*   **Failure (401):**

      ```json
      {
        "success": false,
        "message": "Invalid credentials",
        "statusCode": 401,
        "error": { "details" },
        "stack": "error stack"
      }
      ```

###   

### 2\. Blog Management

#### 2.1 Create Blog

**POST** `/api/blogs`

**Description:** Allows a logged-in user to create a blog by providing a title and content.

**Request Header:**`Authorization: Bearer <token>`

**Request Body:**

```json
{
  "title": "My First Blog",
  "content": "This is the content of my blog."
}
```

**Response:**

*   **Success (201):**

      ```json
      {
        "success": true,
        "message": "Blog created successfully",
        "statusCode": 201,
        "data": {
          "_id": "string",
          "title": "string",
          "content": "string",
          "author": { "details" }
        }
      }
      ```

####   

#### 2.2 Update Blog

**PATCH** `/api/blogs/:id`

**Description:** Allows a logged-in user to update their own blog by its ID.

**Request Header:**`Authorization: Bearer <token>`

**Request Body:**

```json
{
  "title": "Updated Blog Title",
  "content": "Updated content."
}
```

**Response:**

*   **Success (200):**

      ```json
      {
        "success": true,
        "message": "Blog updated successfully",
        "statusCode": 200,
        "data": {
          "_id": "string",
          "title": "string",
          "content": "string",
          "author": { "details" }
        }
      }
      ```

####   

#### 2.3 Delete Blog

**DELETE** `/api/blogs/:id`

**Description:** Allows a logged-in user to delete their own blog by its ID.

**Request Header:**`Authorization: Bearer <token>`

**Response:**

*   **Success (200):**

      ```json
      {
        "success": true,
        "message": "Blog deleted successfully",
        "statusCode": 200
      }
      ```

####   

#### 2.4 Get All Blogs (Public)

**GET** `/api/blogs`

**Description:** Provides a public API to fetch all blogs with options for searching, sorting, and filtering.

**Query Parameters**:

*   `search`: Search blogs by title or content (e.g., `search=blogtitle`).
*   `sortBy`: Sort blogs by specific fields such as `createdAt` or `title` (e.g., `sortBy=title`).
*   `sortOrder`: Defines the sorting order. Accepts values `asc` (ascending) or `desc` (descending). (e.g., `sortOrder=desc`).
*   `filter`: Filter blogs by author ID (e.g., `filter=authorId`).

  

**Example Request URL**:

```sql
/api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&filter=60b8f42f9c2a3c9b7cbd4f18
```

In this example:

*   `search=technology`: Filters blogs containing the term "technology" in the title or content.
*   `sortBy=createdAt`: Sorts the blogs by the `createdAt` field.
*   `sortOrder=desc`: Sorts in descending order (newest blogs first).
*   `filter=60b8f42f9c2a3c9b7cbd4f18`: Filters blogs authored by the user with the given `authorId`.

  

**Response:**

*   **Success (200):**

      ```json
      {
        "success": true,
        "message": "Blogs fetched successfully",
        "statusCode": 200,
        "data": [
          {
            "_id": "string",
            "title": "string",
            "content": "string",
            "author": { "details" }
          }
        ]
      }
      ```

###   

### 3\. Admin Actions

#### 3.1 Block User

**PATCH** `/api/admin/users/:userId/block`

**Description:** Allows an admin to block a user by updating the `isBlocked` property to `true`.

**Request Header:**`Authorization: Bearer <admin_token>`

**Response:**

*   **Success (200):**

      ```json
      {
        "success": true,
        "message": "User blocked successfully",
        "statusCode": 200
      }
      ```

####   

#### 3.2 Delete Blog

**DELETE** `/api/admin/blogs/:id`

**Description:** Allows an admin to delete any blog by its ID.

**Request Header:**`Authorization: Bearer <admin_token>`

**Response:**

*   **Success (200):**

      ```json
      {
        "success": true,
        "message": "Blog deleted successfully",
        "statusCode": 200
      }
      ```

<br/>

  

## Bonus Section

### 1\. Error Handling

Error handling is crucial in ensuring that an application responds gracefully to unexpected situations, providing users with meaningful feedback while maintaining system stability. A well-structured error response format helps in identifying and diagnosing issues effectively.

#### Common Error Response Format

To maintain consistency across all API endpoints, the following error response structure will be used:

```json
{
  "success": false,
  "message": "Error message describing the issue",
  "statusCode": 400, // or other relevant HTTP status code
  "error": {"details": "Additional error details, if applicable"},
  "stack": "error stack trace, if available"
}
```

#### Types of Errors Handled

The following common errors will be managed with appropriate responses:

*   **Zod Validation Error** (`ZOD_ERROR`): Errors arising from invalid data inputs based on Zod schema validation.
*   **Not Found Error** (`NOT_FOUND_ERROR`): When requested resources (e.g., a user, item, or page) are not found.
*   **Validation Error** (`VALIDATION_ERROR`): General validation errors (e.g., incorrect data format, missing required fields).
*   **Authentication Error** (`AUTH_ERROR`): Issues related to failed authentication (e.g., invalid token or expired session).
*   **Authorization Error** (`AUTHORIZATION_ERROR`): When the user lacks the necessary permissions to access a resource.
*   **Internal Server Error** (`INTERNAL_SERVER_ERROR`): Unhandled errors or unexpected server issues.

By consistently implementing these error handling mechanisms, we ensure a smooth user experience and easier debugging for developers.

  
---
<br/>

🧑🏻‍💼 That's all the short description of these projects. Thank you for the reading! ✌️