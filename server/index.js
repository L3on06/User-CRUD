import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud-user',
})

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => { 
    res.json("hello User")
})

app.get("/users", (req, res) => { 
    const q = "Select * from users"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post("/users", (req, res) => {
    const q = "INSERT INTO users (`username`, `email`, `password`) Values (?)"
    const values = [
        req.body.username,
        req.body.email,
        req.body.password
    ]

    db.query(q,[values], (err, data) => {
        if(err) return res.json(err)
        return res.json("User created succesfully")
    })
})

app.listen(8800, ()=> {
    console.log('backend!')
});