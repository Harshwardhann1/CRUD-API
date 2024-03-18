const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

class UnauthorizedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = UnauthorizedError;


// Tech Team

// Implement a basic task queue in Node.js using asynchronous functions and callbacks. Tasks should be executed in parallel up to a certain limit defined by the user.
// Tech Team

// a string as input and returns true if the string is a palindrome (reads the same forwards and backwards), otherwise returns false. Ensure that your solution is case-insensitive and ignores non-alphanumeric characters
// Tech Team

// Develop a RESTful API using Express.js for a simple application,
//  such as a to-do list or a blog. Implement endpoints for CRUD operations 
//  (Create, Read, Update, Delete)
//   for managing resources.
//    Ensure proper error handling, input validation, and authentication/authorization mechanisms.