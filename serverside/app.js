const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const student = require("./models/student");
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // can connect from any host.
  res.setHeader("Access-Control-Allow-Methods","GET, POST, DELETE, PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  console.log("This line will always called!!");
  next();
});

mongoose
  .connect("mongodb://localhost:27017/IT6203", { 
   useNewUrlParser: true, 
   useUnifiedTopology: true 
  })
  .then(() => {
    console.log("Mongo DB Successfully Connected.");
  })
  .catch(() => {
    console.log("Error connecting mongo DB.");
  });

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.post("/students", (req, res, next) => {
 
  const aStudent = new student({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    specialization: req.body.specialization,
    education: req.body.education,
    interest: req.body.interest,
    selfIntro: req.body.selfIntro
  });

  aStudent
    .save()
    .then(() => {
      console.log("A student data has been saved.");
      res.status(201).json("Post has been successful.");
    })
    .catch(err => {
      console.log("Failed to save student data. error: " + err);
      res.status(201).json("Got an error while save: " + err);
    });
});

//:id is a dynamic parameter that will be extracted from the URL
app.delete("/students/:id", (req, res, next) => {
  student
    .deleteOne({ id: req.params.studentId })
    .then(result => {
      console.log(JSON.stringify(result));
      res
        .status(200)
        .json("A student has been Deleted! id: " + req.params.studentId);
    })
    .catch(err => {
      console.log("A error occured while delete: " + err);
    });
});

app.put("/students/:id", (req, res, next) => {
  console.log("Update a Student. ID : " + req.params.id);
  student
    .findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          specialization: req.body.specialization,
          education: req.body.education,
          interest: req.body.interest,
          selfIntro: req.body.selfIntro
        }
      },
      {
        new: true
      }
    )
    .then(updatedStudent => {
      if (updatedStudent) {
        //what was updated
        console.log("Record updated!");
        res
        .status(200)
        .json("An Applicant record has been Updated! Updated Info: " + updatedStudent);
      } else {
        console.log("no data exist for this id");
      }
    })
    .catch(err => {
      console.log(err);
    });
});

app.use("/students", (req, res, next) => {
  student
    .find()
    .then(data => res.status(200).json(data))
    .catch(err => {
      console.log("Error:${err}");
      res.status(500).json(err);
    });
});

module.exports = app;
