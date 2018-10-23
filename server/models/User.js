const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        robotId: String,
    }
);

module.exports = UserSchema;
