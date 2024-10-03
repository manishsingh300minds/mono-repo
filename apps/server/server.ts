import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from "./src/routes";

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/v1', routes);

// Start the Express server and listen on the specified port
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
