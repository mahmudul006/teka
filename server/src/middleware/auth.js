// import User from '../models/User.js';
// import { verifyToken } from '../utils/jwt.js';

// // Middleware to protect routes
// export const authenticateToken = async (req, res, next) => {
//   try {
//     // Get token from header
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

//     if (!token) {
//       return res.status(401).json({ 
//         success: false, 
//         message: 'Access token required' 
//       });
//     }

//     // Verify token
//     const decoded = verifyToken(token);
    
//     // Find user
//     const user = await User.findById(decoded.userId).select('-password');
//     if (!user) {
//       return res.status(401).json({ 
//         success: false, 
//         message: 'User not found' 
//       });
//     }

//     // Add user to request object
//     req.user = { 
//       id: user._id, 
//       username: user.username, 
//       email: user.email,
//       firstName: user.firstName,
//       lastName: user.lastName
//     };
    
//     next();
//   } catch (error) {
//     return res.status(403).json({ 
//       success: false, 
//       message: 'Invalid or expired token' 
//     });
//   }
// }; 