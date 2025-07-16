// import bcrypt from 'bcryptjs';

// // Simple in-memory user storage (In production: use real database)
// const users = [
//   {
//     id: 1,
//     username: 'admin',
//     email: 'admin@example.com',
//     // Password: 'password' (hashed)
//     password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
//   },
//   {
//     id: 2,
//     username: 'john',
//     email: 'john@example.com',
//     // Password: '123456' (hashed)
//     password: '$2a$10$7hxS8KNJPOzYzgOhXUHsmu6qCEBzrjFRLOjYhQKVeEQcOCVoGY0V6'
//   }
// ];

// // Find user by username
// export const findUserByUsername = (username) => {
//   return users.find(user => user.username === username);
// };

// // Find user by ID
// export const findUserById = (id) => {
//   return users.find(user => user.id === parseInt(id));
// };

// // Verify password
// export const verifyPassword = async (plainPassword, hashedPassword) => {
//   return await bcrypt.compare(plainPassword, hashedPassword);
// };

// // Hash password (for creating new users)
// export const hashPassword = async (password) => {
//   return await bcrypt.hash(password, 10);
// }; 