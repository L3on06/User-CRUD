import mongoose from 'mongoose';

const UserDetailsSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 4,
        maxlength: 10,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        minlength: 8,
        maxlength: 40,
        required: true,
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 100,
        required: true,
    },
    userType: String,
}, {
    collection: "UserDetails",
});

mongoose.model("UserDetails", UserDetailsSchema);