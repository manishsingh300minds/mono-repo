import express, { Request, Response } from 'express';

// Create an Express app
const app = express();

// Use environment variable PORT or default to 3000
const port = process.env.PORT || 3000;

// Define a route for the root URL
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express');
});

// Start the Express server and listen on the specified port
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
