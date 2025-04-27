import { db } from "../Config.js";

export const createUser = (name, email, password) => {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(query, [name, email, password], (err, results) => {
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
        console.error("Database query error:", err.message); // Debugging log
        return reject(err);
      }
      console.log("Query results for email:", email, results); // Debugging log
      resolve(results[0]);
    });
  });
};
