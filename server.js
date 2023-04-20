const express = require('express');
const bodyParser = require('body-parser');

const app = express();
 // Enable JSON parsing in the middleware
app.use(bodyParser.json());

const passport = require('passport');
// Import the passport configuration
require('./passport-config'); 
// Import the JWT strategy
const jwtStrategy = require('./passport-config'); 
// Create a middleware to authenticate with JWT
const isAuthenticated = passport.authenticate('jwt', { session: false }); 
// Initialize passport middleware
app.use(passport.initialize()); 
// Import the user database
const { users } = require('./user-db'); 
const jwt = require('jsonwebtoken');
// Set the secret for JWT
const jwtSecret = 'your_jwt_secret'; 

//POST request for login
app.post('/login', (req, res) => { 
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find(u => u.username === username && u.password === password); // Check if the user exists in the database

  if (user) {
    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' }); // Create a JWT token with the user ID
    res.json({ token }); // Send the JWT token in the response
  } else {
    res.status(401).json({ message: 'Invalid credentials' }); // Send error response for invalid login credentials
  }
});

app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => { // Handle GET request for protected resource with JWT authentication middleware
  return res.json({ message: 'This is a protected resource' }); // Send the protected resource as response
});

app.post('/add', isAuthenticated, (req, res) => { // Handle POST request for addition with JWT authentication middleware
  const { num1, num2 } = req.body;

  if (!num1 || !num2) { // Check if both numbers are present
    res.status(400).json({ message: 'Both numbers are required' }); // Send error response for missing numbers
    return;
  }

  const result = parseFloat(num1) + parseFloat(num2); // Calculate the sum
  res.json({ result }); // Send the result in the response
});

app.post('/sub', isAuthenticated, (req, res) => { // Handle POST request for subtraction with JWT authentication middleware
  const { num1, num2 } = req.body;

  if (!num1 || !num2) { // Check if both numbers are present
    res.status(400).json({ message: 'Both numbers are required' }); // Send error response for missing numbers
    return;
  }

  const result = parseFloat(num1) - parseFloat(num2); // Calculate the difference
  res.json({ result }); // Send the result in the response
});

app.post('/mul', isAuthenticated, (req, res) => { // Handle POST request for multiplication with JWT authentication middleware
  const { num1, num2 } = req.body;

  if (!num1 || !num2) { // Check if both numbers are present
    res.status(400).json({ message: 'Both numbers are required' }); // Send error response for missing numbers
    return;
  }

  const result = parseFloat(num1) * parseFloat(num2); // Calculate the product
  res.json({ result }); // Send the result in the response
});

app.post('/div', isAuthenticated, (req, res) => {
  const { num1, num2 } = req.body;

  // Check if both numbers are provided
  if (!num1 || !num2) {
    res.status(400).json({ message: 'Both numbers are required' });
    return;
  }

  // Check if the second number is zero
  if (num2 === 0) {
    res.status(400).json({ message: 'Cannot divide by zero' });
    return;
  }

  // Calculate the result of the division and send the response
  const result = parseFloat(num1) / parseFloat(num2);
  res.json({ result });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

