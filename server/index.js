const express = require('express');
const multer = require('multer');
const cors = require('cors');

function createUploadServer(port = 5000) { // Default port is 5000
  const app = express();
  app.use(cors());

  const uploads = multer({ dest: __dirname + "/uploads" });

  app.post("/uploads", uploads.array("file"), (req, res) => {
    console.log(req.body);
    console.log(req.files);   

    res.json({ status: "files received" });
  });

  app.listen(port,   
 () => {
    console.log(`Server running on port ${port}`);
  });

  return app; // Return the Express app instance
}

// You can now start the server by calling the function:
// Use default port 5000"