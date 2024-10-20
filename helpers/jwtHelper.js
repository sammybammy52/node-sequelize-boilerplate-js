const jwt = require('jsonwebtoken');
const JWT_SECRET = 'sammybammy'; // Replace with an actual secret key

const generateToken = (user) => {
 try {
    return jwt.sign(
        {
          id: user.id,
          email: user.email
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
 } catch (error) {
    throw new Error(error.message);
    
 }
};

module.exports = { generateToken };
