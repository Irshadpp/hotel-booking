# Hotel Booking Application

This project is a hotel booking application built using React Native (Expo) for the client-side and Node.js for the backend. It uses MongoDB as the database and Docker Compose for easy containerization and orchestration.

---

## Features

- React Native frontend with Expo
- Node.js backend with Express
- MongoDB database
- Dockerized setup for development
- Support for Expo tunnels for external testing on mobile devices

---

## Prerequisites

Make sure you have the following installed on your system:

1. [Docker](https://docs.docker.com/get-docker/)
2. [Docker Compose](https://docs.docker.com/compose/install/)

---

## Setup Instructions

### Step 1: Clone the Repository

```bash
git clone https://github.com/Irshadpp/hotel-booking.git
cd hotel-booking
```

### Step 2: Directory Structure
Ensure the directory structure looks like this:

```bash
hotel-booking-app/
├── client/            # React Native (Expo) frontend
├── server/            # Node.js backend
├── docker-compose.yml # Docker Compose configuration
└── README.md          # This file
```

###  Step 3: Configure Environment Variables

Since using docker-compose.yaml dont have to setup ENV, Its already given

If you want you own ENV please follow these steps:

Backend (server)
Create a .env file in the server folder with the following content:
```bash
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/hotel_booking
PORT=4000
```

## Running the Application

### Step 1: Build and Start the Containers
Run the following command from the project root:

```bash
docker-compose up --build
```

This will:
Build and start the backend (Node.js) service on port 4000.
Build and start the frontend (React Native with Expo) service on port 8081.

### Step 2: Access the Application

Backend API
The backend server will be available at: http://localhost:4000.
React Native Frontend
Look for a the URL (e.g., http://localhost:8081) in the logs. 
Open this URL in:
Your browser to run the web version (Please wait for a few time, it will take a little to load the application initially).
The Expo Go app on your mobile device for testing.

You can use these user credentials to test the functionalities:

User 1
email: user@gmail.com
password: User@123

User 2
email: example@gmail.com
password: User@123