const db = require('../models');

module.exports = function (app) {
  // Route to get all unassigned tasks.
  app.get('/api/tasks', (req, res) => {
    db.Task.findAll({
      include: db.Category,
      where: {
        isAssigned: 0,
      },
    }).then((dbTask) => {
      res.json(dbTask);
    });
  });

  // Route to add a task.
  app.post('/api/tasks', function (req, res) {
    console.log(req.body);
    // res.end();
    db.Task.create({
      title: req.body.title,
      CategoryId: req.body.category,
      description: req.body.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).then(function (dbTask) {
      console.log(dbTask);
      res.json(dbTask);
    });
  });

  // Route to delete a task.
  app.delete('/api/tasks/:id', function (req, res) {
    db.Task.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbTask) {
      res.json(dbTask);
    });
  });

  // Route to edit a task.
  app.put('/api/tasks/:id', function (req, res) {
    console.log(req.body);
    db.Task.update({
      title: req.body.title,
      CategoryId: req.body.category,
      description: req.body.description,
      updatedAt: new Date()
    }, {
      where: {
        id: req.params.id
      }
    }).then(function (dbTask) {
      res.json(dbTask);
    })
  });

  // Route to get categories.
  app.get('/api/categories', (req, res) => {
    db.Category.findAll({}).then(function (dbCategory) {
      res.json(dbCategory);
    });
  });
};

// // routes for CC
// const express = require("express");
// const router = express.Router();

// // Import the model XXX to use its database functions.
// const index = require("../models/index.js");
// const task = require("../models/task.js");
// const user = require("../models/user.js");

// // Create a route to handle users
// router.post("/api/task", function (req, res) {
//     task.create([
//         "owner_id", "assignee_id", "category", "title", "details"
//     ], [
//      req.body.owner_id, req.body.assignee_id, req.body.category, req.body.title, req.body.details
//     ], function (result) {
//         res.json({ id: result.insertId });
//     });
// });

// // Create a route to handle tasks
// router.post("/api/task", function (req, res) {
//     user.create([
//         "email", "first_name", "last_name", "phone", "address"
//     ], [
//         req.body.email, req.body.first_name, req.body.last_name, req.body.phone, req.body.address
//     ], function (result) {
//         res.json({ id: result.insertId });
//     });
// });

// router.put("/api/user/:id", function (req, res) {
//     const condition = "id = " + req.params.id;

//     console.log("condition", condition);
//     console.log(req.body);
//     user.update({
//         assigned: req.body.assigned
//     }, condition, function (result) {
//         if (result.changedRows == 0) {
//             // If no rows were changed, then the ID must not exist, so 404
//             return res.status(404).end();
//         } else {
//             res.status(200).end();
//         }
//     });
// });

// router.delete("/api/task/:id", function (req, res) {
//     var condition = "id = " + req.params.id;

//     task.delete(condition, function (result) {
//         if (result.affectedRows == 0) {
//             // If no rows were changed, then the ID must not exist, so 404
//             return res.status(404).end();
//         } else {
//             res.status(200).end();
//         }
//     });
// });

// Export routes for server.js to use.
// module.exports = router;
