# Umbra

## Project Overview

**Umbra** is a secure full-stack web application that allows users to create, store, and share encrypted notes with fine-grained access control. The system focuses on privacy, ownership, and controlled collaboration.

The core design principle of Umbra is **client-side encryption** — note content is encrypted in the browser before being sent to the backend, ensuring that the server never stores plaintext note data.

---

## Problem Statement

Most digital note-taking platforms store user data in plaintext on centralized servers, exposing users to privacy and security risks. Umbra addresses this by ensuring:

- Notes are encrypted before storage.
- Only authorized users can access shared content.
- The backend never processes decrypted note content.

---

## Features

- Client-side encryption using the browser’s Web Crypto API  
- Secure authentication using JWT and bcrypt  
- Create, update, and delete encrypted notes  
- Share notes with read/edit permissions  
- Permission-based access control  
- Responsive UI built with Tailwind CSS  
- Email notifications for certain user actions  

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- Web Crypto API (native browser)

### Backend
- Node.js
- Express.js
- MongoDB (via Mongoose)
- JSON Web Tokens (JWT)
- bcrypt
- nodemailer

---

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local instance)

### Installation

```bash
git clone https://github.com/Arsh271/Umbra.git
cd Umbra

## Frontend Setup
cd Frontend
npm install
npm run dev

## Backend Setup
cd Backend
npm install
npm start


## Create a .env file inside the Backend directory:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
PORT=3001
```

## Usage

1. Register or log in to your account.
2. Create a new note - encryption happens automatically in your browser.
3. View your notes - decryption also happens locally.
4. Share notes with other users and assign read or edit permissions.

## DEMO VIDEO

- Video Link: https://drive.google.com/drive/folders/1dC0erGfrt4_Fo4C-Hol3LJcpr16KXS4s?usp=sharing

## AI Disclosure

- ChatGPT (for explanations, suggestions, debugging assistance and some UI enhancement);
- AntiGravity (for enhancing notification experience )


---

## Credits & Attributions

- React, Tailwind CSS, Express, MongoDB, JWT, bcrypt, nodemailer.

- React Icons for UI icons.

- Web Crypto API for browser-native cryptography.


## Mentor / Guidance Disclosure

- Mentors provided  conceptual guidance about encryption and sharing feature.
- No mentor wrote or modified the project code.