import "dotenv/config"
import app from "./app";
import connectDB from "./config/db";

const port = process.env.PORT || 3000;

const start = async () => {
    await connectDB();
  };
  
  start();

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
