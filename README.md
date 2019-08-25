# BACK-END SERVER

## Server

https://weight-lift-be.herokuapp.com/

## Dependencies

- "axios": "^0.19.0",
- "bcryptjs": "^2.4.3",
- "cors": "^2.8.5",
- "dotenv": "^8.0.0",
- "email-validator": "^2.0.4",
- "express": "^4.17.1",
- "helmet": "^3.18.0",
- "jsonwebtoken": "^8.5.1",
- "knex": "^0.17.6",
- "pg": "^7.11.0",
- "sqlite3": "^4.0.9"

## devDependencies

- "cross-env": "^5.2.0",
- "jest": "^24.8.0",
- "nodemon": "^1.19.1",
- "supertest": "^4.0.2"

## Table of Contents

- [Auth Routes](#auth-routes)
- [Users Routes](#users-routes)
- [Journals Routes](#journal-routes)
- [Exercises Routes](#exercise-routes)

# DATA STRUCTURES

`Users`

```
{
  "id": 1,                                  // Integer (primary key provided by server and autoincrements)
  "username": "admin",                      // String, required
  "password": "password",                   // String, required
  "firstName": "admin",                     // String, required
  "lastName": "admin",                      // String, required
  "email": "admin@gmail.com"                // String, required
}
```

`Journals`

```
{
  "id": 1,                                  // Integer (primary key provided by server and autoincrements)
  "date": "June 24, 2019",                  // String, required
  "region": "legs",                         // String
  "userId": 1                               // Integer, required (foreign key reference to "users" table)
}
```

`Exercises`

```
{
  "id": 1,                                  // Integer (primary key provided by server and autoincrements)
  "journalId": 1,                           // Integer, required (foreign key reference to "users" table)
  "userId": 1,                              // Integer, required
  "name": "deadlift",                       // String
  "reps": 10,                               // Integer
  "sets": 5,                                // Integer
  "weight": 200                             // Integer
}
```

# DUMMY USER ACCOUNTS

```
  username: sammy
  password: password

  username: tina
  password: password

  username: billy
  password: password

  username: admin
  password: password

```

# SUMMARY OF API ENDPOINTS

| Table     | Method | Endpoint                              | Description                                                                                                                                                                                    |
| --------- | ------ | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| auth      | POST   | /api/auth/register                    | Creates a new `user` profile using the information sent inside the `body` of the request and returns a message along with the new `user` and a JSON Web Token in the `body` of the response.   |
| auth      | POST   | /api/auth/login                       | Uses the credentials sent inside the `body` to authenticate the user. On successful login, returns a message with the `user` profile and a JSON Web Token token in the `body` of the response. |
| users     | GET    | /api/restricted/users                 | Retrieves an array of `user` objects and returns a message with the array in the `body` of the response.                                                                                       |
| users     | GET    | /api/restricted/users/:id             | Retrieves a single `user` object and returns a message with the object inside the `body` of the response.                                                                                      |
| journals  | GET    | /api/restricted/journals              | Retrieves an array of `journal` objects and returns a message with the array in the `body` of the response.                                                                                    |
| journals  | GET    | /api/restricted/journals/:id          | Retrieves a single `journal` object using the id sent in the URL parameters of the request and returns a message with the object inside the `body` of the response.                            |
| journals  | POST   | /api/restricted/journals              | Uses the information sent inside the `body` to create a new `journal` for a specified user by included `userId` and returns a message along with the new `journal`.                            |
| journals  | PUT    | /api/restricted/journals/:id          | Uses the information sent inside the `body` to update a single `journal` using the id sent in the URL parameters of the request and returns a message along with the updated `journal`.        |
| journals  | DELETE | /api/restricted/journals/:id          | Removes a `journal` in the database using the id sent in the URL parameters of the request.                                                                                                    |
| exercises | GET    | /api/restricted/exercises             | Retrieves an array of `exercise` objects and returns a message with the array in the `body` of the response.                                                                                   |
| exercises | GET    | /api/restricted/exercises/journal/:id | Retrieves a single `journal` object's `exercises` using the id sent in the URL parameters of the request and returns a message with the `exercises` inside the `body` of the response.         |
| exercises | GET    | /api/restricted/exercises/:id         | Retrieves a single `exercise` object and returns a message with the object in the `body` of the response.                                                                                      |
| exercises | POST   | /api/restricted/exercises             | Uses the information sent inside the `body` to create a new `exercise` for a specified user by included `userId` and returns a message along with the new `exercise`.                          |
| exercises | PUT    | /api/restricted/exercises/:id         | Uses the information sent inside the `body` to update a single `exercise` using the id sent in the URL parameters of the request and returns a message along with the updated `exercise`.      |
| exercises | DELETE | /api/restricted/exercises/:id         | Removes an `exercise` in the database using the id sent in the URL parameters of the request.                                                                                                  |

# AUTH ROUTES

## **REGISTER**

### **Registers a user**

_Method Url:_ `/api/auth/register`

_HTTP method:_ **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name        | type   | required | description    |
| ----------- | ------ | -------- | -------------- |
| `username`  | String | Yes      | Must be unique |
| `password`  | String | Yes      |                |
| `firstName` | String | Yes      |                |
| `lastName`  | String | Yes      |                |
| `email`     | String | Yes      | Must be unique |

_example:_

```
{
  "username": "trevor",
  "password": "password",
  "firstName": "trevor",
  "lastName": "turner",
  "email": "trevor@gmail.com"
}
```

#### Response

##### 200 (OK)

> If you successfully register a user the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
    "error": false,
    "message": "Account successfully created.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo2LCJ1c2VybmFtZSI6InRyZXZvciIsImlhdCI6MTU2MTQwMTU3MSwiZXhwIjoxNTYxNDg3OTcxfQ.oflH8T88CZhObzBj3oRCBkqKeau-8jLC9yeDO8JJZ94",
    "user": {
        "id": 6,
        "username": "trevor",
        "firstName": "trevor",
        "lastName": "turner",
        "email": "trevor@gmail.com",
        "created_at": "2019-06-24 18:39:31",
        "updated_at": "2019-06-24 18:39:31"
    }
}
```

##### 406 (Not Acceptable)

> If you are missing a username, password, first name, last name, or email for registration, the endpoint will return an HTTP response with a status code `406` and a body as below.

```
{
    "error": true,
    "user": {},
    "message": "Include required credentials and try again."
}
```

##### 409 (Conflict)

> If the submitted username or email is a duplicate of what is already in the database, the endpoint will return an HTTP response with a status code `409` and a body as below.

```
{
    "error": true,
    "usernameError": true or false if username exists,
    "emailError": true or false if email exists,
    "message": "Username and email already exist."
}
```

##### 404 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "user": {},
  "message": "Error creating account in the database."
}
```

##### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "user": {},
  "message": "Error with your request."
}
```

---

## **LOGIN**

### **Logs a user in**

_Method Url:_ `/api/auth/login`

_HTTP method:_ **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name       | type   | required | description                                                           |
| ---------- | ------ | -------- | --------------------------------------------------------------------- |
| `username` | String | Yes      | Must match a username in the database                                 |
| `password` | String | Yes      | Must match a password in the database corresponding to above username |

_example:_

```
{
  "username": "admin",
  "password": "password"
}
```

#### Response

##### 200 (OK)

> If you successfully login, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
    "error": false,
    "message": "Login successful.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo2LCJ1c2VybmFtZSI6InRyZXZvciIsImlhdCI6MTU2MTQwMjMxNSwiZXhwIjoxNTYxNDg4NzE1fQ.XNIVmIStN8XT7vxuXz-E0Z0b8-J3tsm1KktDFR2VR8Q",
    "user": {
        "id": 6,
        "username": "trevor",
        "firstName": "trevor",
        "lastName": "turner",
        "email": "trevor@gmail.com",
        "created_at": "2019-06-24 18:39:31",
        "updated_at": "2019-06-24 18:39:31"
    }
}
```

##### 406 (Not Acceptable)

> If you are missing a username or password for login, the endpoint will return an HTTP response with a status code `406` and a body as below.

```
{
  "error": true,
  "user": {},
  "message": "Please include a username and password and try again."
}
```

##### 404 (Not Found)

> If you send in an email address that does not match one in the database or the passwords do not match, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "user": {},
  "message": "Sorry, you could not be logged in."
}
```

##### 500 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "user": {},
  "message": "Error with your request."
}
```

---

# USERS ROUTES

## **GET USERS**

### **Get all users**

_Method Url:_ `/api/restricted/users`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Response

##### 200 (OK)

> If users are found in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
    "error": false,
    "message": "The users were found in the database",
    "users": [
        {
            "id": 1,
            "username": "admin",
            "firstName": "admin",
            "lastName": "admin",
            "email": "admin@gmail.com",
            "created_at": "2019-06-23 23:19:17",
            "updated_at": "2019-06-23 23:19:17"
        },
        {
            "id": 2,
            "username": "sammy",
            "firstName": "Sammy",
            "lastName": "Stewart",
            "email": "sammy@gmail.com",
            "created_at": "2019-06-23 23:19:17",
            "updated_at": "2019-06-23 23:19:17"
        }
}
```

##### 404 (Not Found)

> If there are no users in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "user": [],
  "message": "The users could not be found in the database."
}
```

##### 500 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "user": [],
  "message": "There was an error processing your request."
}
```

---

## **GET USER**

### **Get user by user ID**

_Method Url:_ `/api/restricted/users/:id`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Parameters

| name      | type    | required | description           |
| --------- | ------- | -------- | --------------------- |
| `user_id` | Integer | Yes      | ID of a specific user |

#### Response

##### 200 (OK)

> If a user with the specified ID in the URL parameters is found in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
    "error": false,
    "message": "Your profile was retrieved successfully.",
    "user": {
        "id": 6,
        "username": "trevor",
        "firstName": "trevor",
        "lastName": "turner",
        "email": "trevor@gmail.com",
        "created_at": "2019-06-24 18:39:31",
        "updated_at": "2019-06-24 18:39:31"
    }
}
```

##### 404 (Bad Request)

> If the requested profile does not exist, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "user": {},
  "message": "Your profile could not be found in the database."
}
```

##### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "user": {},
  "message": "There was an error processing your request."
}
```

---

# JOURNAL ROUTES

## **GET JOURNALS**

### **Get all journals**

_Method Url:_ `/api/restricted/journals`

_HTTP method:_ **[GET]**

#### \_Note: Seeded journals have ids 155-168

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Response

##### 200 (OK)

> If journals are found in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
    "error": false,
    "message": "The journals were found in the database",
    "journals": [
        {
            "id": 155,
            "date": "1561231957525",
            "region": "Legs",
            "userId": 1,
            "created_at": "2019-06-23 23:19:17",
            "updated_at": "2019-06-23 23:19:17"
        },
        {
            "id": 156,
            "date": "1561131957525",
            "region": "Back",
            "userId": 1,
            "created_at": "2019-06-23 23:19:17",
            "updated_at": "2019-06-23 23:19:17"
        }
    ]
}
```

##### 404 (Not Found)

> If there are no journals in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "journals": [],
  "message": "The journals could not be found in the database."
}
```

##### 500 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "journals": [],
  "message": "There was an error processing your request."
}
```

---

## **GET JOURNAL**

### **Get journal by journal ID**

_Method Url:_ `/api/restricted/journals/:id`

_HTTP method:_ **[GET]**

#### \_Note: Seeded journals have ids 155-168

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Parameters

| name | type    | required | description              |
| ---- | ------- | -------- | ------------------------ |
| `id` | Integer | Yes      | ID of a specific journal |

#### Response

##### 200 (OK)

> If the journal is found in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
    "error": false,
    "message": "The journal was found in the database",
    "journal": {
        "id": 155,
        "date": "1561231957525",
        "region": "Legs",
        "userId": 1,
        "created_at": "2019-06-23 23:19:17",
        "updated_at": "2019-06-23 23:19:17"
    }
}
```

##### 404 (Not Found)

> If the journal cannot be found in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "journal": {},
  "message": "The journal could not be found in the database."
}
```

##### 500 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "journal": {},
  "message": "There was an error processing your request."
}
```

---

## **CREATE JOURNAL**

### **Create new journal for user**

_Method Url:_ `/api/restricted/journals/`

_HTTP method:_ **[POST]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Body

| name     | type    | required | description                         |
| -------- | ------- | -------- | ----------------------------------- |
| `date`   | String  | Yes      | i.e. "Jan 20, 2019"                 |
| `region` | String  | Yes      |                                     |
| `userId` | Integer | Yes      | Foreign key reference to user table |

_example_

```
{
	"date": "June 24, 2019",
	"region": "legs",
	"userId": 6
}
```

#### Response

##### 200 (OK)

> If the journal is successfully created, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
    "error": false,
    "message": "The journal was created in the database.",
    "journal": [
        {
            "id": 169,
            "date": "June 24, 2019",
            "region": "legs",
            "userId": 6,
            "created_at": "2019-06-24 19:39:16",
            "updated_at": "2019-06-24 19:39:16"
        }
    ]
}
```

##### 406 (Not Acceptable)

> If the required data to create the journal is not sent in the body, the endpoint will return an HTTP response with a status code `406` and a body as below.

```
{
  "error": true,
  "journal": [],
  "message": "Please include all required fields and try again."
}
```

##### 404 (Not Found)

> If the journal cannot be created, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "journal": [],
  "message": "The journal could not be created in the database."
}
```

##### 500 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "journal": [],
  "message": "There was an error processing your request."
}
```

---

## **UPDATE Journal**

### **Update journal by journal ID**

_Method Url:_ `/api/restricted/journals/:id`

_HTTP method:_ **[PUT]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Parameters

| name | type    | required | description              |
| ---- | ------- | -------- | ------------------------ |
| `id` | Integer | Yes      | ID of a specific journal |

#### Body

| name     | type    | required | description                         |
| -------- | ------- | -------- | ----------------------------------- |
| `date`   | String  | Yes      | i.e. "Jan 20, 2019"                 |
| `region` | String  | Yes      |                                     |
| `userId` | Integer | Yes      | Foreign key reference to user table |

_example_

```
{
	"date": "June 24, 2019",
	"region": "back",
	"userId": 6
}
```

#### Response

##### 200 (OK)

> If the journal is successfully updated the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
    "error": false,
    "message": "The journal was updated in the database.",
    "journal": {
        "id": 169,
        "date": "June 24, 2019",
        "region": "back",
        "userId": 6,
        "created_at": "2019-06-24 19:39:16",
        "updated_at": "2019-06-24 19:39:16"
    }
}
```

##### 404 (Not Found)

> If no journal for the specified user can be found in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "journal": [],
  "message": "The journal could not be updated in the database."
}
```

##### 500 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "journal": [],
  "message": "There was an error processing your request."
}
```

---

## **DELETE JOURNAL**

### **Delete journal by journal ID**

_Method Url:_ `/api/restricted/journals/:id`

_HTTP method:_ **[DELETE]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Parameters

| name | type    | required | description              |
| ---- | ------- | -------- | ------------------------ |
| `id` | Integer | Yes      | ID of a specific journal |

#### Response

##### 200 (OK)

> If the journal is found in the database and deleted, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "error": false,
  "message": "The journal was deleted from the database."
}
```

##### 404 (Not Found)

> If no journals for the specified id can be found in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "message": "The journal could not be deleted in the database."
}
```

##### 500 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "message": "There was an error processing your request."
}
```

---

# EXERCISE ROUTES

## **GET EXERCISES**

### **Get all exercises**

_Method Url:_ `/api/restricted/exercises`

_HTTP method:_ **[GET]**

#### \_Note: Seeded exercises have ids 22-41

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Response

##### 200 (OK)

> If exercises are found in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
    "error": false,
    "message": "The exercises were retrieved successfully.",
    "exercises": [
        {
            "id": 22,
            "journalId": 1,
            "userId": 1,
            "name": "Squats",
            "reps": 10,
            "sets": 5,
            "weight": "200"
        },
        {
            "id": 23,
            "journalId": 3,
            "userId": 2,
            "name": "Overhead Press",
            "reps": 10,
            "sets": 5,
            "weight": "100"
        }
  ]
}
```

##### 404 (Not Found)

> If there are no exercises in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "journals": [],
  "message": "The exercises could not be found."
}
```

##### 500 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "message": "There was a problem with your request."
}
```

---

## **GET EXERCISES BY JOURNAL ID**

### **Get all exercises by journal id**

_Method Url:_ `/api/restricted/exercises/journal/:id`

_HTTP method:_ **[GET]**

#### \_Note: Seeded exercises have ids 22-41

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Parameters

| name | type    | required | description              |
| ---- | ------- | -------- | ------------------------ |
| `id` | Integer | Yes      | ID of a specific journal |

#### Response

##### 200 (OK)

##### example_url: /api/restricted/exercises/journal/1

> If exercises are found in the database for a journal, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
    "error": false,
    "message": "Your exercises were retrieved successfully.",
    "exercises": [
        {
            "id": 22,
            "journalId": 1,
            "userId": 1,
            "name": "Squats",
            "reps": 10,
            "sets": 5,
            "weight": "200"
        },
        {
            "id": 24,
            "journalId": 1,
            "userId": 1,
            "name": "Deadlift",
            "reps": 10,
            "sets": 5,
            "weight": "200"
        }
    ]
}
```

##### 404 (Not Found)

> If there are no exercises for that journal in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "exercises": [],
  "message": "Your exercises could not be found."
}
```

##### 500 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "exercises": [],
  "message": "There was a problem with your request."
}
```

---

## **GET EXERCISES BY ID**

### **Get all exercises by id**

_Method Url:_ `/api/restricted/exercises/:id`

_HTTP method:_ **[GET]**

#### \_Note: Seeded exercises have ids 22-41

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Parameters

| name | type    | required | description               |
| ---- | ------- | -------- | ------------------------- |
| `id` | Integer | Yes      | ID of a specific exercise |

#### Response

##### 200 (OK)

> If the exercise is found in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

#### example_URL: /api/restricted/exercises/22

```
{
    "error": false,
    "message": "Your exercise was retrieved successfully.",
    "exercise": [
        {
            "id": 22,
            "journalId": 1,
            "userId": 1,
            "name": "Squats",
            "reps": 10,
            "sets": 5,
            "weight": "200"
        }
    ]
}
```

##### 404 (Not Found)

> If there is no exercise found by the paramater id, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "exercises": [],
  "message": "Your exercise could not be found."
}
```

##### 500 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "exercises": [],
  "message": "There was a problem with your request."
}
```

---

---

## **CREATE EXERCISE**

### **Create new exercise for user**

_Method Url:_ `/api/restricted/exercises/`

_HTTP method:_ **[POST]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Body

| name        | type    | required | description |
| ----------- | ------- | -------- | ----------- |
| `journalId` | Integer | Yes      |             |
| `userId`    | Integer | Yes      |             |
| `name`      | String  | Yes      |             |
| `reps`      | Integer | Yes      |             |
| `sets`      | Integer | Yes      |             |
| `weight`    | Integer | Yes      |             |

_example_

```
{
	"journalId": 1,
	"userId": 6,
	"name": "hammer curls",
	"reps": 12,
	"sets": 4,
	"weight": 45
}
```

#### Response

##### 200 (OK)

> If the exercise is successfully created, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
    "error": false,
    "message": "Your exercise was created successfully.",
    "exercise": {
        "id": 43,
        "journalId": 1,
        "userId": 6,
        "name": "hammer curls",
        "reps": 12,
        "sets": 4,
        "weight": "45"
    }
}
```

##### 404 (Not Found)

> If the exercise cannot be created, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "exercise": [],
  "message": "Your exercise could not be created."
}
```

##### 500 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "exercise": [],
  "message": "There was a problem with your request."
}
```

---

## **UPDATE EXERCISE**

### **Update exercise for user**

_Method Url:_ `/api/restricted/exercises/:id`

_HTTP method:_ **[PUT]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Parameters

| name | type    | required | description               |
| ---- | ------- | -------- | ------------------------- |
| `id` | Integer | Yes      | ID of a specific exercise |

#### Body

| name        | type    | required | description |
| ----------- | ------- | -------- | ----------- |
| `journalId` | Integer | Yes      |             |
| `userId`    | Integer | Yes      |             |
| `name`      | String  | Yes      |             |
| `reps`      | Integer | Yes      |             |
| `sets`      | Integer | Yes      |             |
| `weight`    | Integer | Yes      |             |

_example_

#### example_url: /api/restricted/exercises/43

```
{
	"journalId": 1,
	"userId": 6,
	"name": "alternating hammer curls",
	"reps": 10,
	"sets": 3,
	"weight": 40
}
```

#### Response

##### 200 (OK)

> If the exercise is successfully updated, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
    "error": false,
    "message": "Your exercise was updated successfully.",
    "exercise": [
        {
            "id": 43,
            "journalId": 1,
            "userId": 6,
            "name": "alternating hammer curls",
            "reps": 10,
            "sets": 3,
            "weight": "40"
        }
    ]
}
```

##### 404 (Not Found)

> If the exercise cannot be updated, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "exercise": {},
  "message": "Your exercise could not be created."
}
```

##### 406 (Conflict)

> If there are no items in the request, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "exercise": {},
  "message": "Please include required exercise details and try again."
}
```

##### 500 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "exercise": {},
  "message": "There was a problem with your request."
}
```

---

## **DELETE EXERCISE**

### **Delete exercise by exercise ID**

_Method Url:_ `/api/restricted/exercise/:id`

_HTTP method:_ **[DELETE]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Parameters

| name | type    | required | description               |
| ---- | ------- | -------- | ------------------------- |
| `id` | Integer | Yes      | ID of a specific exercise |

#### Response

##### 200 (OK)

> If the exercise is found in the database and deleted, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
    "error": false,
    "message": "Your exercise was deleted successfully.",
    "numDeleted": 1
}
```

##### 404 (Not Found)

> If the exercise for the specified id cannot be found in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "message": "The journal could not be deleted in the database."
}
```

##### 500 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "message": "There was an error processing your request."
}
```

---
