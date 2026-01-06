# Technical Summary — Umbra

## 1. Architecture Overview

Umbra follows a client-server architecture:

- Frontend (React) handles UI and encryption/decryption.
- Backend (Node + Express) manages authentication, authorization, and encrypted data storage.
- MongoDB stores encrypted notes and metadata.

Encryption is done on the client side before sending data to the server.

---

## 2. Design Decisions

- **Client-side encryption** ensures the server never accesses plaintext notes.
- **JWT-based authentication** ensures secure stateless sessions.
- **Role-based access control** is implemented for shared notes.
- **Modular backend routes** improve maintainability.

---

## 3. Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcrypt

---

## 4. Security / Cybersecurity Features

- Password hashing using bcrypt
- Token-based authentication using JWT
- Authorization validation on every protected route
- Permission-based access to shared notes (read/edit control)
- Encrypted note content stored in the database
- Browser-native Web Crypto API used for client-side encryption and decryption
- CORS protection for API access control


These features ensure confidentiality, integrity, and controlled access.

---


## 5. AI Tools Used

- ChatGPT (for explanations, suggestions, debugging assistance and some UI enhancement);
- AntiGravity (for enhancing notification experience )

No AI tool generated production code directly.

---

## 6. Third-Party APIs & Libraries

### Frontend
- react
- react-dom
- react-router-dom
- axios
- tailwindcss
- react-icons
- react-markdown

### Backend
- express
- mongoose
- jsonwebtoken
- bcrypt
- cors
- dotenv
- nodemailer


---

## 7. External Services Used

- SMTP email service (via nodemailer)

---

## 8. Mentor / Guidance Disclosure

- Mentors provided  conceptual guidance about encryption and sharing feature.
- No mentor wrote or modified the project code.

---

