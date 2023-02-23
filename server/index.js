import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud-user',
});

db.connect(function (error) {
    if (error) {
        console.log("Error connecting to DATABASE");
    } else {
        console.log("Successfully connected to DATABASE");
    }
});

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => { 
    res.json("hello User")
})


// View all users //
app.get("/users", (req, res) => {
    const q = "SELECT * FROM users";
    db.query(q, function (error, data) {
        if (error) {
            console.log("Error Connection To View Users");
        } else {
              return res.json(data);
        }
    });
});

// Add users //
app.post("/users", (req, res) => {
    const q = "INSERT INTO users SET ?"
    const values = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    db.query(q, values, (error) => {
        if (error) {
            res.send({ status: false, message: "User created Failed" });
        } else {
            res.send({ status: false, message: "User created Successfully" });
        }
    });
});

// Delete User //
app.delete("/users/:id", (req, res) => {
    const userId = req.params.id
    const q = "DELETE FROM users WHERE id = ?"

    db.query(q, [userId], (err, data) => {
        if (err) return res.json(err)
        return res.json("User deletet succesfully");
    })
})

// Update User // 
app.put("/users/:id", (req, res) => {
    const userId = req.params.id;
    const q = "UPDATE users SET `username` = ?, `email` = ?, `password` = ? WHERE id = ?";

    const values = [
        req.body.username,
        req.body.email,
        req.body.password
    ];

    db.query(q, [...values,userId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    })
})


app.listen(8800, () => {
    console.log("Connected to backend.");
  });