const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
// var bcrypt = require('bcryptjs');
// var hashedPassword = require('../controllers/todoController')
const Schema = mongoose.Schema;
TaskSchema = new Schema({
    name: {
        type: String,
        Required: 'Task label is required!'
    },
    Created_date: {
        type: Date,
        default: Date.now
    }
    // password : {
    //     type: hashedPassword,
    // }
    
});
module.exports = mongoose.model('Tasks', TaskSchema);
