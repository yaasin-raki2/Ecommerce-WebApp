const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const usersRepo = require("./repositories/users");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ["iusdyf56kqdsjdfqskjd4cyj6è"] }));

app.get("/signup", (req, res) => {
    res.send(`
        <div>
            Your id is : ${req.session.userId}
            <form method="POST">
                <input name="email" placeholder="email">
                <input name="password" placeholder="password">
                <input name="passwordConfirmation" placeholder="password Confirmation">
                <button>Sign up</button>
            </form>
        </div>
    `);
});
 
app.post("/signup", async (req, res) => {
    const { email, password, passwordConfirmation } = req.body;

    const existingUser = await usersRepo.getOneBy({ email });

    if (existingUser) {
        return res.send("Email in use");
    }

    if (password !== passwordConfirmation) {
        return res.send("Passwords must match");
    }

    const user = await usersRepo.create({ email, password });

    req.session.userId = user.id;

    res.send("Account created");
});

app.get("/signout", (req, res) => {
    req.session = null;
    res.send("You've been signned out");
});

app.get("/signin", (req, res) => {
    res.send(`
        <div>
            <form method="POST">
                <input name="email" placeholder="email">
                <input name="password" placeholder="password">
                <button>Sign In</button>
            </form>
        </div>
    `);
});

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const user = await usersRepo.getOneBy({ email });

    if (!user) {
        res.send('Email not found');
    }

    const validPassword = await usersRepo.comparePasswords(user.password, password);

    if (!validPassword) {
        res.send('Invalid Password');
    }

    req.session.Id = user.id;
    res.send('you are signed in !!!');
})

app.listen(3000, () => {
    console.log("Listening...");
});
