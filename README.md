
# Website Monitoring System

This is a **Website Monitoring System** built with Node.js and Express.js. The system allows users to monitor the status of websites, check their response time, and notify their respective owners via email if a website goes down.

## Features

- Add websites to monitor.
- Periodically check the status and response time of websites.
- Notify the owner via email if any website goes down.
- Store and manage website data in MongoDB.
- Easily configurable via `.env` file.

---

## Installation

### Prerequisites

1. **Node.js** (>=14.x)
2. **MongoDB** (running locally or via a cloud provider)
3. **Nodemailer-compatible SMTP server** (e.g., Gmail SMTP)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/website-monitoring.git
   cd website-monitoring
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```plaintext
   MONGO_URI=your_mongodb_connection_string
   PORT=8000
   SMTP_HOST=smtp.example.com
   SMTP_PORT=587
   SMTP_USER=your_email@example.com
   SMTP_PASSWORD=your_email_password
   ```
   Replace the placeholders with your actual values.

4. Start the server:
   ```bash
   npm start
   ```

---

## API Endpoints

### 1. **Add a Website**
   - **Endpoint:** `POST /v1/api/monitor/add`
   - **Description:** Adds a new website to the monitoring system.
   - **Request Body:**
     ```json
     {
       "name": "Google",
       "url": "https://www.google.com",
       "owner": "user_id",
       "region": "India"
     }
     ```
   - **Response:**
     ```json
     {
       "success": true,
       "message": "Website added successfully."
     }
     ```

---

### 2. **Update Website Status**
   - **Endpoint:** `POST /v1/api/monitor/update-status`
   - **Description:** Updates the status of websites.
   - **Request Body:**
     ```json
     {
       "data": [
         {
           "id": "website_id",
           "status": false
         }
       ]
     }
     ```
   - **Response:**
     ```json
     {
       "success": true,
       "message": "Website statuses updated successfully."
     }
     ```

---

### 3. **Get All Websites**
   - **Endpoint:** `GET /v1/api/monitor/websites`
   - **Description:** Retrieves all monitored websites.
   - **Response:**
     ```json
     [
       {
         "_id": "website_id",
         "name": "Google",
         "url": "https://www.google.com",
         "region": "India",
         "isUp": true,
         "lastChecked": "2024-11-29T10:15:00Z"
       }
     ]
     ```

---

## Email Notifications

The system uses **Nodemailer** to send email notifications to website owners. When a website is marked as **DOWN**, an email will be sent to the owner's registered email address with the following details:

- Website Name
- URL
- Timestamp of the issue

---

## Project Structure

```
website-monitoring/
├── controllers/
│   ├── monitorController.js
├── models/
│   ├── websiteModel.js
│   ├── userModel.js
├── routes/
│   ├── monitorRoutes.js
├── utils/
│   ├── emailService.js
├── .env
├── server.js
├── README.md
```

---

## How It Works

1. Websites are added via the `/add` API.
2. The system periodically checks the status of each website (every 2 minutes) using `node-cron` and `axios`.
3. If a website is down, its status is updated in the database, and an email is sent to the owner.
4. Administrators can query the status of all websites via the `/websites` API.

---

## Dependencies

- [Express.js](https://expressjs.com/) - Web framework
- [Mongoose](https://mongoosejs.com/) - MongoDB ODM
- [Node-cron](https://www.npmjs.com/package/node-cron) - Task scheduler
- [Axios](https://axios-http.com/) - HTTP client
- [Nodemailer](https://nodemailer.com/about/) - Email service

---

## Future Enhancements

- Add support for SMS notifications.
- Implement a user authentication system for secure access.
- Build a frontend dashboard for real-time monitoring and visualization.
- Introduce health check intervals per website (e.g., 5 minutes for one, 10 for another).

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any changes or improvements.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact

For queries or suggestions, feel free to reach out:

- **Email:** tusharkalra307@gmail.com
- **GitHub:** [tushar-kalra-developer](https://www.linkedin.com/in/your-username)
