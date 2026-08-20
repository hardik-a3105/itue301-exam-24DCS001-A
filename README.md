# Hospital Appointment System

## Project Setup

### Required Environment Variables
Create a `.env` file in the `backend/` directory with the following contents:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

### Backend Setup and Run Command
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   node server.js
   # or
   npm start
   ```

### Frontend Setup and Run Command
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm run dev
   ```

### MongoDB Setup
Ensure your MongoDB cluster is running and your IP is whitelisted. Replace the `MONGODB_URI` placeholder in your `.env` file with your actual connection string.
