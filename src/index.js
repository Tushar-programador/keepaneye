import dotenv from "dotenv";
import connectDB from "./configs/DB_connection.js";
import { app } from "./app.js";
dotenv.config({ path: "./.env" });

// Connect to DB
connectDB().then(()=>{
  app.listen(process.env.PORT || 8000, () => {
    console.log("APP is listen on port ", process.env.PORT);
  });
})
  
  
