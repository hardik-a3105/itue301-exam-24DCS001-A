# 1. Project Name
**MedCare Plus: Hospital Appointment System**

# 2. Frontend Setup and Run Command
The frontend is built with React and Vite.
To setup and run the frontend:
1. Open a terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
The frontend will start on `http://localhost:5173`.

# 3. Backend Setup and Run Command
The backend is an Express REST API.
To setup and run the backend:
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   node server.js
   # or
   npm start
   ```
The backend will start on `http://localhost:5000`.

# 4. MongoDB Setup
This project uses MongoDB with Mongoose for data persistence. 
1. Ensure your local MongoDB daemon is running (e.g., `mongodb://localhost:27017`) or that you have a MongoDB Atlas cluster available.
2. The server will automatically connect using the connection string provided in your `.env` file.
3. (Optional) To seed the database with initial Doctors and test data, run:
   ```bash
   cd backend
   node seedDatabase.js
   ```

# 5. Required Environment Variables
You must provide the MongoDB connection string to the backend. Create a `.env` file inside the `backend/` directory (you can use `.env.example` in the root as a template).

`backend/.env` contents should be:
```env
MONGODB_URI=mongodb://localhost:27017/hospital
PORT=5000
```
