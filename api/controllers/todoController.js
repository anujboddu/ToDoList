const mongoose = require("mongoose");
const Task = mongoose.model("Tasks");
var jwt = require('jsonwebtoken');

// var bcrypt = require('bcryptjs');
// var config = require('../config');
var Excel = require('exceljs');
var workbook = new Excel.Workbook();
// var hashedPassword = bcrypt.hashSync(req.body.password, 8)

function currentDate () {
    now = new Date();
    year = "" + now.getFullYear();
    month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
    day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
    hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
    minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
    second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
   }
// get all tasks
exports.getTasks = (req, res) => {

     
  
    Task.find({}, (err, task) => {
  
        if (err)
            res.send(err);
         
           else{
            res.json(task);
            
            console.log('###taskdata',task)
             var worksheet = workbook.addWorksheet('My Sheet');
            workbook.views = [
                    {
                        x: 0, y: 0, width: 10000, height: 20000,
                        firstSheet: 0, activeTab: 1, visibility: 'visible'
                    }
                ];
                
                console.log(worksheet);
                worksheet.columns = [
                    { header: 'Id', key: 'id', width: 10 },
                    { header: 'Name', key: 'name', width: 32 },
                    { header: 'Created Date', key: 'Created_date', width: 10, outlineLevel: 1, type: 'date', formulae: [new Date(2016, 0, 1)] }
                ];
            
                worksheet.addRows(task);
                
            
                fileName = "data_" + currentDate() +".xlsx";
                workbook.xlsx.writeFile(fileName)
                .then(function(err){
                    console.log('file is written')
                   

                });
            };
           
            });
            
            
};


// create a task
exports.createTask = (req, res) => {
    let newTask = new Task(req.body);
    
    //var hashedPassword = bcrypt.hashSync(req.body.password, 8)
    newTask.save( (err, task) => {
        if (err) return res.status(500).send("There was a problem registering the user.")
        res.json(task);
        var token = jwt.sign({ id: user._id }, config.auth-token, {
            expiresIn: 86400 // expires in 24 hours
          });
          res.status(200).send({ auth: true, token: token });
        });
};
// read a single task
exports.readTask = (req, res) => {
    Task.findById(req.params.id, (err, task) => {
        if (err)
            res.send(err);
        res.json(task);
    });
};
// update a particular task
exports.updateTask = (req, res) => {
  Task.findOneAndUpdate(req.params.id, req.body, { new: true }, (err, task) => {
    if (err)
        res.send(err);
    res.json(task);
  });
};
// delete a single task
exports.deleteTask = (req, res) => {
    Task.remove({
        _id: req.params.id
    }, (err, task) => {
        if (err)
            res.send(err);
        res.json({ message: 'Task deleted!!' });
    });
};

// exports.hashedPassword = hashedPassword;