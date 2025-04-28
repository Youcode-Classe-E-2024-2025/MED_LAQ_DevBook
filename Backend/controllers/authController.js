import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../Repository/authRepository.js";

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        console.log("Registration attempt with email:", email); 

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            console.error("Email already registered:", email); 
            return res.status(409).json({ error: true, message: "Email already registered" });
        }


        const password_hash = await bcrypt.hash(password, 12);
        const user = await createUser(username, email, password_hash);
        const token = user.token || "default-token";
        console.log("Generated token:", token); 

        res.status(200).json({ 
            message: "Registration successful", 
            token, 
            user: { id: user.id, name: username, email }
        });
    } catch (error) {
        console.error("Error during registration:", error); 
        res.status(500).json({ error: true, message: "Registration failed", details: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("Login attempt with email:", email); 

        const user = await findUserByEmail(email);
        if (!user) {
            console.error("User not found for email:", email); 
            return res.status(401).json({ error: true, message: "Invalid credentials" });
        }

        console.log("User found:", user); 
        console.log("Stored password hash:", user.password_hash); // Updated log to use correct field

        const isPasswordValid = await bcrypt.compare(password, user.password_hash); // Use correct field
        console.log("Password comparison result:", isPasswordValid); 

        if (!isPasswordValid) {
            console.error("Invalid password for email:", email); 
            return res.status(401).json({ error: true, message: "Invalid credentials" });
        }

        const token = user.token || "default-token"; // Ensure token exists
        console.log("Generated token:", token); 

        res.status(200).json({ 
            message: "Login successful", 
            token, 
            user: { id: user.id, name: user.username, email: user.email } // Include user data
        });
    } catch (error) {
        console.error("Error during login:", error); 
        res.status(500).json({ error: true, message: "Login failed", details: error.message }); // Include error details
    }
};

export const logout = (req, res) => {
    res.status(200).json({ message: "Logout successful" });
};
