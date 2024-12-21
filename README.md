# Exercise Tracker

This is a solution to the [Exercise Tracker](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/exercise-tracker) challenge from freeCodeCamp's Back End Development and APIs certification.

## Features

- Allows users to create a new user with a unique username.
- Enables users to log exercises, including:
  - A description of the exercise.
  - The duration (in minutes).
  - The date (defaults to the current date if not provided).
- Provides a `GET` endpoint to retrieve a user's exercise log, including optional parameters to filter logs by date range and limit the number of results.

## API Endpoints

1. **Create a User**  
   **POST** `/api/users`  
   Request Body:
   ```json
   {
     "username": "exampleuser"
   }
   ```

   Response:
   ```json
   {
    "username": "exampleuser",
    "_id": "64b5d96bf5a8c31a4b5e7f72"
    }
   ```

2. **Add Exercise**  
   **POST** `/api/users/:_id/exercises`  
   Request Body:
   ```json
   {
    "description": "Running",
    "duration": 30,
    "date": "2024-12-21"
    }
   ```
   Response:
   ```json
   {
    "username": "exampleuser",
    "description": "Running",
    "duration": 30,
    "date": "Sat Dec 21 2024",
    "_id": "64b5d96bf5a8c31a4b5e7f72"
    }
   ```
3. **Get User Logs**  
   **GET** `/api/users/:_id/logs?from=&to=&limit=`
   Query Parameters:
    - `from` (optional): Start date in `YYYY-MM-DD` format.
    - `to` (optional): End date in `YYYY-MM-DD` format.
    - `limit` (optional): Maximum number of results to return.

    Example Response:
    ```json
    {
      "username": "exampleuser",
      "count": 1,
      "log": [
        {
          "description": "Running",
          "duration": 30,
          "date": "Sat Dec 21 2024"
        }
      ]
    }
    ```
## How to Run Locally
1. Clone the repository:
```bash
git clone https://github.com/ashangunatilake/Exercise-Tracker.git
```

2. Navigate to the project directory:
```bash
cd Exercise-Tracker
```

3. Install dependencies:
```bash
npm install
```

4. Set up your environment variables:
- Create a .env file in the root directory.
- Add the following line to the .env file, replacing <your_mongo_uri> with your MongoDB Atlas connection string:
```env
MONGO_URI=<your_mongo_uri>
```

5. Start the server:
```bash
npm start
```
    
