const express = require('express') // Importing the express module
const app = express() // const... creating the app
const Todo = require('./todo')
const port = process.env.PORT || 3000;
const bodyparser = require('body-parser');
const db = require('./db/db');
app.use(bodyparser.json());

app.get('/', (req, res) => res.send('Hello World!'))

// Login
app.post("/login", async (req, res) => {
    const body = req.body;
    const email = body.email;
    const pass = body.pass;

    const result = await db.find({"email": email, "pass": pass});
    if(result.length == 1) {
        res.json({msg: "Login successfull", status: 200})
    } else {
        res.json({msg: "Login Failed", status: 400})
    }
})

// register
app.post("/register", async (req, res) => {
    const body = req.body;

    const result = await db.create(body);
    res.status(201).json({msg: "user registered successfully"})
})

app.listen(port, () => console.log(`App listening on port ${port}!`))