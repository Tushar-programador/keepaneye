import {} from "dotenv/config";
// Centralized access to the configuration
export const port = process.env.PORT || 5000;
export const mongoURI = process.env.MONGO_URI;
console.log(mongoURI);
export const jwtSecret = process.env.JWT_SECRET;
export const emailService = process.env.EMAIL_SERVICE;
export const smsService = process.env.SMS_SERVICE;
