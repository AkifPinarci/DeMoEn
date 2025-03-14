# DeMoEn - Movie Language Learning Platform

DeMoEn is an innovative platform that helps users learn new languages through movies. The platform analyzes movie subtitles, categorizes words based on their frequency and difficulty levels, and provides a personalized learning experience for users.

## Features

- Movie-based language learning
- Word difficulty categorization based on frequency
- Personalized word tracking (known, learning, and ignored words)
- User progress monitoring
- Movie difficulty assessment
- JWT-based authentication

## Tech Stack

- **Backend**: Node.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **API Framework**: Express.js

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd DeMoEn
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

4. Start the server:

```bash
npm start
```

## API Documentation

### Authentication Endpoints

#### Register User

```http
POST /api/users/register
```

CURL Request:

```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }'
```

Response:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "known_words": [],
  "learning_words": [],
  "ignored_words": [],
  "watched_movies": []
}
```

### Movie Endpoints

#### Add Movie

```http
POST /api/movies
```

CURL Request:

```bash
curl -X POST http://localhost:3000/api/movies \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "The Matrix",
    "difficulty": 1,
    "language": "English",
    "subtitle": [
      {
        "word": "example",
        "count": 5,
        "level": "A1"
      }
    ]
  }'
```

Response:

```json
{
  "title": "The Matrix",
  "difficulty": 1,
  "language": "English",
  "subtitle": [
    {
      "word": "example",
      "count": 5,
      "level": "A1"
    }
  ],
  "_id": "movie_id_here"
}
```

#### Get All Movies

```http
GET /api/movies
```

CURL Request:

```bash
curl -X GET http://localhost:3000/api/movies \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

Response:

```json
[
  {
    "language": "English",
    "releaseDate": "2024-01-01"
  },
  {
    "language": "Spanish",
    "releaseDate": "2024-01-02"
  }
]
```

#### Get Movie by Title

```http
GET /api/movies/:title
```

CURL Request:

```bash
curl -X GET http://localhost:3000/api/movies/The%20Matrix \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

Response:

```json
{
  "title": "The Matrix",
  "difficulty": 1,
  "language": "English",
  "subtitle": [
    {
      "word": "example",
      "count": 5,
      "level": "A1"
    }
  ]
}
```

### Word Management Endpoints

#### Add Word

```http
POST /api/words
```

CURL Request:

```bash
curl -X POST http://localhost:3000/api/words \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "word": "example",
    "meaning": "a representative form or pattern",
    "level": "A1"
  }'
```

Response:

```json
{
  "word": "example",
  "meaning": "a representative form or pattern",
  "level": "A1",
  "_id": "word_id_here"
}
```

#### Get Word by Word

```http
GET /api/words/:word
```

CURL Request:

```bash
curl -X GET http://localhost:3000/api/words/example \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

Response:

```json
{
  "word": "example",
  "meaning": "a representative form or pattern",
  "level": "A1"
}
```

#### Get Words by Level

```http
GET /api/words/level/:level
```

CURL Request:

```bash
curl -X GET http://localhost:3000/api/words/level/A1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

Response:

```json
[
  {
    "word": "example",
    "meaning": "a representative form or pattern",
    "level": "A1"
  },
  {
    "word": "hello",
    "meaning": "used as a greeting",
    "level": "A1"
  }
]
```

### User Word Management Endpoints

#### Add Word to Known Words

```http
POST /api/users/:id/known_words
```

CURL Request:

```bash
curl -X POST http://localhost:3000/api/users/user_id_here/known_words \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "word": "example"
  }'
```

Response:

```json
{
  "message": "Word added to known words successfully",
  "known_words": ["example"]
}
```

#### Remove Word from Known Words

```http
DELETE /api/users/:id/known_words
```

CURL Request:

```bash
curl -X DELETE http://localhost:3000/api/users/user_id_here/known_words \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "word": "example"
  }'
```

Response:

```json
{
  "message": "Word removed from known words successfully",
  "known_words": []
}
```

#### Add Word to Learning Words

```http
POST /api/users/:id/learning_words
```

CURL Request:

```bash
curl -X POST http://localhost:3000/api/users/user_id_here/learning_words \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "word": "example"
  }'
```

Response:

```json
{
  "message": "Word added to learning words successfully",
  "learning_words": ["example"]
}
```

#### Remove Word from Learning Words

```http
DELETE /api/users/:id/learning_words
```

CURL Request:

```bash
curl -X DELETE http://localhost:3000/api/users/user_id_here/learning_words \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "word": "example"
  }'
```

Response:

```json
{
  "message": "Word removed from learning words successfully",
  "learning_words": []
}
```

#### Calculate Known Words from Movie

```http
POST /api/users/calculate_known_words
```

CURL Request:

```bash
curl -X POST http://localhost:3000/api/users/calculate_known_words \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "userId": "user_id_here",
    "movieId": "movie_id_here"
  }'
```

Response:

```json
{
  "knownWordsCount": 100,
  "totalWordsCount": 200,
  "knownWordsPercentage": 50
}
```

## Data Models

### Movie Schema

```javascript
{
  title: String,
  difficulty: Number,
  language: String,
  subtitle: [{
    word: String,
    count: Number,
    level: String
  }]
}
```

### User Schema

```javascript
{
  name: String,
  email: String,
  password: String,
  role: String,
  known_words: Array,
  learning_words: Array,
  ignored_words: Array,
  watched_movies: Array
}
```

### Word Schema

```javascript
{
  word: String,
  meaning: String,
  level: String
}
```

## Security

- All sensitive routes are protected with JWT authentication
- Passwords are hashed using bcrypt
- Role-based authorization for admin functions

## Error Handling

The API returns appropriate HTTP status codes:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
