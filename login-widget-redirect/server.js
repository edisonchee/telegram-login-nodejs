const express = require('express');
const app = express();

app.get('/login', (req, res) => {
  // you'll get your user's data in req.query
  console.log(req.query);
})

// remember to setup a reverse proxy in your web server so your express app can be reached
app.listen(9999, () => { console.log("Server started on port 9999") });