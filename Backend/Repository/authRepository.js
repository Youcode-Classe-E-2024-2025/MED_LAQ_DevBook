import { db } from "../Config.js";

export const createUser = (username, email, password) => {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)";
    db.query(query, [username, email, password], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

export const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], (err, results) => {
      if (err) {
        console.error("Database query error:", err.message); 
        return reject(err);
      }
      console.log("Query results for email:", email, results); 
      resolve(results[0]);
    });
  });
};
