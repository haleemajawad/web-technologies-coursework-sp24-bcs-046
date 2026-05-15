# Sapphire Storefront and Admin Panel (Assignment 4)

## Overview

This project is a small Node.js + Express application for a Sapphire-style storefront with a protected admin panel. It includes:

- Public product listing pages (`/` and `/products`)
- Product filtering and pagination
- Admin login (`/admin/login`) with protected routes
- Admin product management: add, edit, delete
- Image uploads for inventory items
- MongoDB storage via Mongoose

## Features

- Filter products by category, price range, and search query
- Display product cards with images on the public products page
- Admin dashboard showing stock and category summary
- Upload product images using the admin UI
- Seed data setup for testing and demo content

## Admin Credentials

- Username: `sapphire`
- Password: `123456`

## Setup Instructions

1. Install dependencies:

```bash
cd "c:\Users\Haleema Jawad\Desktop\sem 5\web technologies work\assignment 4"
npm install
```

2. Start MongoDB locally:

```powershell
Start-Service mongodb
```

If MongoDB is not installed as a Windows service, run `mongod` manually with a valid `dbpath`.

3. Seed the database with sample products:

```bash
node seed.js
```

4. Run the app:

```bash
node server.js
```

5. Open the app in your browser:

```text
http://localhost:3000
```

## File Structure

- `server.js` — main Express application, routing, authentication, and file upload handling
- `seed.js` — sample product data seeding script
- `models/product.js` — Mongoose schema for product documents
- `views/` — EJS templates for public pages and admin screens
- `public/` — static assets including CSS, images, JS, and uploaded product photos
- `readme.md` — this documentation

## Notes

- The admin panel is protected by a simple session-based login.
- Uploaded images are stored in `public/uploads` and served statically.
- If product images do not appear, confirm the `imageUrl` value in the database and that the file exists under `public/uploads`.
- The seed script currently uses external image URLs for demo data.

## Troubleshooting

- If the app logs `Failed to lookup view`, verify that the `views` directory contains the expected EJS files.
- If MongoDB times out, ensure the MongoDB service is running and the database URL is correct.
- If the admin login fails, use the credentials above and check `server.js` for the current hardcoded values.
