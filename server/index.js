import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const JWT_SECRET = "!,ooposccbmt3e!@as90@!f3fy558990./2?2@#$kj3ebipqsccsccs%^&cdc67rg*(67k)rh{}asasa[aa]"

mongoose.set('strictQuery', false);
const app = express();
app.use(express.json());
app.use(cors());


// Database //
const mongoURL = "mongodb+srv://User-CRUD:User-CRUD@cluster0.vukjrli.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
}).then(() => {
    console.log("Connected to Database")
}).catch((e) => console.log(e));


// Register User
import "./UserDetails.js";
const User = mongoose.model("UserDetails");

app.post("/register", async (req, res) => {
    const { username, email, password, userType } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.json({ error: "User Exists" });
        }
        await User.create({
            username,
            email,
            password: encryptedPassword,
            userType,
        });
        res.send({ status: "Created successfully" });
    } catch (error) {
        res.send({ status: "Somthing went wrong!" });
    }
});

// Login User
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.json({ error: "User Not found" });
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email: user.email }, JWT_SECRET, {
            // expiresIn: 10,
        });

        if (res.status(201)) {
            return res.json({ status: "ok", data: token });
        } else {
            return res.json({ error: "Error" });
        }
    }
    res.json({ status: "error", error: "Invaliv Password" });
});

// Fetching user data
app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching user data.' });
    }
});


// View user data 
app.post('/user', async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET, (err, res) => {
            if (err) {
                return "token expired"
            }
            return res;
        });
        console.log(user);
        if (user === "token expired") {
            return res.send({ status: "error", data: "token expired" });
        }

        const userEmail = user.email;
        User.findOne({ email: userEmail })
            .then((data) => {
                res.send({ status: "ok", data: data });
            }).catch((error) => {
                res.send({ status: "error", data: error });
            });
    } catch (error) {

    }
})


// View all users
app.get("/getAllUser", async (req, res) => {
    try {
        const allUser = await User.find({});
        res.send({ status: "okay", data: allUser });
        console.log(allUser);
    } catch (error) {
        console.log(error)
    }
})

// Delete users
app.post("/deleteUser", async (req, res) => {
    const { userId } = req.body;
    try {
        User.deleteOne({ _id: userId }, function (err, res) {
            console.log(err)
        });
        res.send({ status: "ok", data: "Deleted" })
    } catch (error) {
        console.log(error)
    }
})


// Update user details
app.put('/update/:id', async (req, res) => {
    const { username, email, password } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);

    const token = jwt.sign({ email: email }, JWT_SECRET, {
        // expiresIn: 10,
    });

    User.findById(req.params.id)
        .then(user => {
            user.username = username;
            user.email = email;
            user.password = encryptedPassword;

            user.save()
                .then(() => res.json(token))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


// Port running
app.listen(8800, () => {
    console.log("Server Started");
});
