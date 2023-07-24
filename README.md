
# Task Management REST API

Solution for Code Challenge with Typescript and Firebase.
  
## Deployed App Link
- https://atom-challenge-api.onrender.com

### API
- GET /tasks
- POST /tasks
  - Body: title (string), description (string), status (string='pending'|'completed')
- UPDATE /tasks/:taskId
  - Body: title (string), description (string), status (string='pending'|'completed')
- DELETE /tasks/:taskId

## How to run ?
Run the following:
- npm install
- npm start

## Stack
 - Typescript
 - Express
 - Eslint
 - Prettier
 - Husky
 - Jest
 - Firebase

## References for app development
 - https://blog.logrocket.com/organizing-express-js-project-structure-better-productivity/
 - https://dev.to/mr_ali3n/folder-structure-for-nodejs-expressjs-project-435l
 - https://blog.logrocket.com/unit-integration-testing-node-js-apps/
 - https://www.browserstack.com/guide/unit-testing-for-nodejs-using-jest
 - https://medium.com/@ben.dev.io/clean-architecture-in-node-js-39c3358d46f3