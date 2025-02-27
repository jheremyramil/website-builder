# Next.js with GrapesJS Integration and Laravel API Backend

This project integrates **Next.js** as the frontend framework with **GrapesJS** for building and editing pages, and **Laravel** as the backend API for storing and retrieving page content.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
  - [Frontend (Next.js)](#frontend-nextjs)
  - [Backend (Laravel)](#backend-laravel)
- [Running the Project](#running-the-project)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

---

## Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v16+)
- **npm** or **yarn**
- **PHP** (v8.0+)
- **Composer**
- **MySQL** (or another preferred database)
- **Postman** or **cURL** (for testing API requests)

---

## Project Setup

### Frontend (Next.js)

1. **Clone the repository** and navigate to the project directory:
   Download the file, and navigate to your downloaded project

   ```bash
   cd nextjs-grapesjs-laravel
   ```

2. Navigate to the **frontend** directory:

   ```bash
   cd frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Configure environment variables:

   - Copy **env.example** to **.env**

   ```bash
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api

   # Generate secret random secret key
   SANCTUM_SECRET=
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```
6. Access the application: Open your browser and visit **http://localhost:3000**.

### Backend Laravel (PHP)

1. Navigate to the **backend** directory:
   ```bash
   cd ../backend
   ```
2. Install dependencies:
   ```bash
   composer install
   ```
3. Set up the environment file:

   - Copy **env.example** to **.env**

   ```bash
   cp .env.example .env
   ```

   - Update database credentials in the **.env** file

   ```bash
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=backend
   DB_USERNAME=root
   DB_PASSWORD=
   ```

4. Generate the application key:

   ```bash
   php artisan key:generate
   ```

5. Run database migrations:

   ```bash
   php artisan migrate
   ```

6. Run database seeders:

   ```bash
   php artisan db:seed
   ```

7. Create a symlink This makes storage/app/public accessible via public/storage.

   ```bash
   php artisan storage:link
   ```

8. Start the Laravel development server:
   ```bash
   php artisan serve
   ```
9. Verify the API: The Laravel API will be available at **http://localhost:8000/api**

---

## Running the Project

### Start the Laravel API server:

```bash
cd backend
php artisan serve
```

### Start the Next.js development server:

```bash
cd frontend
npm run dev
```

### Access the application: Open your browser and visit http://localhost:3000.

---

## Usage

- Use the GrapesJS editor in the frontend to build and edit page content.
- Save your work via the Save button, which sends the page data to the Laravel API.
- Reload the application to see stored content restored from the backend.

---

## API Endpoints

The Laravel backend exposes the following endpoints:

- GET /page/{templateId}/content: Retrieve stored page content for a specific template.
- POST /page/{templateId}/content: Save page content for a specific template
