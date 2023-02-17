# Florin County Council Server
The Florin Events App is a web application that consists of both a frontend and a backend. The backend is responsible for processing requests and serving data to the frontend, while the frontend is responsible for rendering the user interface.

The server is built using Node.js and Express, a popular framework for building web applications. The server communicates with a PostgreSQL database, where all event and user data is stored.

## Installing Required Libraries
To install the required libraries, follow these steps:

1. Open a terminal.
2. Navigate to the `<project-directory>` directory.
3. Type `npm install`.

## Setting Up The Environment
In the `<project-directory>` directory, create a file named .env.
Add the following lines to the file:
```bash
PORT=3000
DB_URL=postgres://<db-username>:<db-password>@<hostname>/<db-name>
CLOUD_NAME=<cloud-name>
CLOUDINARY_API_KEY=<cloudinary-api-key>
CLOUDINARY_API_SECRET=<cloudinary-api-secret>
```
Replace the placeholders of DB_URL with the appropriate values.

## Setting Up The Database
To set up the database, follow these steps:
1. Open a terminal.
2. Navigate to the `<project-directory>` directory.
3. Type `npm run setup-db`.

Once completed, the terminal should read: `Set-up complete.`

## Running the Server
To run the server, follow these steps:

1. Open a terminal.
2. Navigate to the `<project-directory>` directory.
3. Type `npm start`.

## Interacting with the API

API URL base: `http://localhost:3000/`

The API has the following routes and functionalities:

### /events
- / GET Returns a JSON object containing all events. The user must be authenticated to access this endpoint.
- /:id GET Returns a JSON object representing a single event from the collection, selected by :id.
- /search/:string GET Returns a JSON object containing all events that match the search string. The user must be authenticated to access this endpoint.
- / POST Accepts a multipart/form-data request and creates a new event. The request must include a file upload with the key "file".
/interested/:id PATCH Updates a specific event, incrementing the "interested" count. The request must include the event ID in the URL parameter :id.
- /not_interested/:id PATCH Updates a specific event, decrementing the "interested" count. The request must include the event ID in the URL parameter :id.
- /attend/:id PATCH Updates a specific event, incrementing the "attendee" count. The request must include the event ID in the URL parameter :id.
- /not_attending/:id PATCH Updates a specific event, decrementing the "attendee" count. The request must include the event ID in the URL parameter :id.
- /:id DELETE Deletes a specific event, selected by :id.

### /users
- /authorize GET Returns a JSON object containing the user's authorization status. The user must be authenticated to access this endpoint.
- /events GET Returns a JSON object containing all events associated with the user. The user must be authenticated to access this endpoint.
- /register POST Accepts a JSON object and creates a new user.
- /login POST Accepts a JSON object containing the user's credentials and logs the user in.
- /logout POST Logs the user out. The user must be authenticated to access this endpoint.

Use an API testing platform such as Hoppscotch or Postman to test the API.

## Known Bugs
Please note that there may be some bugs in the project, including the following:

1. More error handling may be needed.