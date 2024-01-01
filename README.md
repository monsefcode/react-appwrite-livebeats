# LiveBeat React App with Appwrite

LiveBeat is a React web application that utilizes Appwrite as its backend for authentication and data storage. This README provides instructions on how to set up and run the app locally.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [Git](https://git-scm.com/)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/LiveBeat.git
   ```

2. Navigate to the project directory:

   ```bash
    cd LiveBeat
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory of the project and add the following environment variables:

   ```bash
    VITE_APPWRITE_ENDPOINT="your-appwrite-endpoint"
    VITE_APPWRITE_PROJECTID="your-appwrite-projectId"

    VITE_APPWRITE_EVENTS_DB_ID=""
    VITE_APPWRITE_EVENTS_COLLECTION_ID=""
    VITE_APPWRITE_BUCKETID=""
    VITE_APPWRITE_TEAM_ADMIN_ID=""
   ```

5. Run the app in development mode:

   ```bash
    npm start
   ```

6. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
