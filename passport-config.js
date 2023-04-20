const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const jwtSecret = 'your_jwt_secret';

const strategyOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

  // This function is called when a JWT is presented for authentication
  // You can check if the user is authorized to access the requested resource
  // You can also attach the user object to the request object for later use
  // The user object is stored in the JWT payload
const jwtStrategy = new JWTStrategy(strategyOptions, (jwtPayload, next) => {
 // Example code to get the user from the database
  const user = getUserFromDatabase(jwtPayload.userId);

  if (user) {
    // User found, authenticate the request
    next(null, user);
  } else {
    // User not found, reject the request
    next(null, false);
  }
});

passport.use(jwtStrategy);

  const { Strategy, ExtractJwt } = require('passport-jwt');
  const { getUserFromDatabase } = require('./user-db');
    


const requireAuth = passport.authenticate('jwt', { session: false });

// This middleware function checks if the user is authenticated
function isAuthenticated(req, res, next) {
  requireAuth(req, res, (err) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // The user is authenticated, continue to the next middleware
    next();
  });
}
