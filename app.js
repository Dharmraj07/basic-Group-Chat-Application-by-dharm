const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/login", (req, res) => {
  res.send(`
    <form onsubmit="localStorage.setItem('username', document.getElementById('username').value)" action="/" method="GET">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username">
      <input type="submit" value="Submit">
    </form>
  `);
});

app.get("/", (req, res) => {
  const messages = fs.readFileSync("messages.txt", "utf8");

  res.send(`
 
 <form action="/chat" method='post' >
 <p>${messages}</p>
 <input type="hidden" id="user" name="user"  >
   <label for="message">Message:</label>
   <input type="text" id="message" name="message">
   <button type="submit">Send</button>
 </form>
 
 <script>
   const username = localStorage.getItem('username');
   const welcomeMessage = document.getElementById('user');
   welcomeMessage.value=username;
 </script>

`);
});

app.post("/chat", (req, res) => {
  const { user, message } = req.body;
  console.log(user, message);

  const data = `${user}: ${message}.\n`;

  fs.appendFile("messages.txt", data, (err) => {
    if (err) throw err;
    console.log("Message written to file");
  });
  const messages = fs.readFileSync("messages.txt", "utf8");

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
