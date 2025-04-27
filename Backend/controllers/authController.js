import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../Repository/authRepository.js";

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        await createUser(name, email, hashedPassword);
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error during registration:", error.message);
        res.status(500).json({ error: true, message: "Registration failed" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("Login attempt with email:", email); // Debugging log

        const user = await findUserByEmail(email);
        if (!user) {
            console.error("User not found for email:", email); // Debugging log
            return res.status(401).json({ error: true, message: "Invalid credentials" });
        }

        console.log("User found:", user); // Debugging log
        console.log("Stored password hash:", user.password_hash); // Updated log to use correct field

        const isPasswordValid = await bcrypt.compare(password, user.password_hash); // Use correct field
        console.log("Password comparison result:", isPasswordValid); // Debugging log

        if (!isPasswordValid) {
            console.error("Invalid password for email:", email); // Debugging log
            return res.status(401).json({ error: true, message: "Invalid credentials" });
        }

        const token = user.token || "default-token"; // Ensure token exists
        console.log("Generated token:", token); // Debugging log

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error during login:", error); // Improved error log
        res.status(500).json({ error: true, message: "Login failed", details: error.message }); // Include error details
    }
};
