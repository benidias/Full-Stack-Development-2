
import express from "express";
const router = express.Router();

router.get("/error", (req, res) => {
  const message = req.query.message || "An unknown error occurred.";
  
  res.send(`
    <html>
      <head>
        <title>Error</title>
        <style>
          body {
            background-color: #f8d7da;
            color: #721c24;
            font-family: Arial, sans-serif;
            padding: 40px;
            text-align: center;
          }
          .container {
            border: 1px solid #f5c6cb;
            background-color: #f8d7da;
            padding: 20px;
            border-radius: 8px;
            display: inline-block;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Error</h1>
          <p>${message}</p>
          <a href="/">Go back</a>
        </div>
      </body>
    </html>
  `);
});

export default router;
