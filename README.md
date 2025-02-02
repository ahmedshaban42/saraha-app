Saraha-App

Saraha App is an anonymous messaging platform that allows users to send messages without revealing their identity. It provides a secure and scalable backend for handling anonymous messages.

🚀 Features
- 🔒 **JWT-based authentication** with OTP-based email verification & password hashing.
- 🔐 **Enhanced security** with automatic session termination upon sensitive account updates.
- 🛠 **Middleware** for authentication, authorization, and request validation using Joi.
- 📜 **Centralized error handling** for consistent debugging and user feedback.
- 🌐 **Built using modern web technologies** to ensure high performance and scalability.

🛠 Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Security:** JWT, bcrypt, CryptoJS
- **Validation:** Joi
- **Tools:** Postman, Docker (Basic Knowledge)

📌 Installation & Setup

1. Clone the repository:**
   ```bash
   git clone https://github.com/ahmedshaban42/saraha-app.git
   cd saraha-app
   ```

2. Install dependencies:**
   ```bash
   npm install
   ```

3. Create a `.env` file** and add the necessary environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Run the application:**
   ```bash
   npm start
   ```

5. API Documentation (if applicable)
   - You can use **Postman** to test the API endpoints.
   - If Swagger is implemented, open `http://localhost:5000/api-docs`.

 📷 Screenshots (Optional)
Add some screenshots here to showcase the app UI (if available).

 🤝 Contribution
Feel free to fork the repository and submit pull requests. Contributions are welcome!

 📜 License
This project is licensed under the MIT License.

---
Made by Ahmed Shaban.
