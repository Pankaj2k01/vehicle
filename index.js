const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyparser = require('body-parser');
const db = require('./db/db');
const mongo_url = 'mongodb+srv://yadavpankaj092785:O5CKKPf56NJaGDyi@cluster0.dp7un9n.mongodb.net/authtest'
app.use(bodyparser.json());

app.get('/', (req, res) => res.send('Hello World!'));

// Login
app.post("/login", async (req, res) => {
    const body = req.body;
    const email = body.email;
    const pass = body.pass;

    const result = await db.find({"email": email, "pass": pass});
    if(result.length == 1) {
                // Login successful, redirect to main activity
                res.json({msg: "Login successful", status: 200, user: result[0]});
            } else {
                res.json({msg: "Login failed", status: 400});
            }
        });
        
        // Register
        app.post("/register", async (req, res) => {
            const body = req.body;
            const name = body.name;
            const email = body.email;
            const pass = body.pass;
        
            const result = await db.create({name, email, pass});
            if(result.length == 1) {
                res.json({msg: "User registered successfully", status: 201, user: result[0]});
            } else {
                res.json({msg: "User registration failed", status: 400});
            }
        });
        
        app.listen(port, () => console.log(`App listening on port ${port}!`));