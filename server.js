import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectToDB from "./src/config/db.js"
const PORT = process.env.PORT || 5000;


connectToDB()
  .then(() => {
    app.listen(PORT, (err) => {
      if (err) {
        throw new Error('Error while starting server');
      }
      console.log('Server running on port', PORT);
    });
  })
  .catch((err) => {
    console.error('Error while connecting to DB:', err);
    process.exit(1);
  });
