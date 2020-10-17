const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const authRouter = require('./routes/admin/auth.js');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ["iusdyf56kqdsjdfqskjd4cyj6è"] }));
app.use(authRouter);

app.listen(3000, () => {
    console.log("Listening...");
});
