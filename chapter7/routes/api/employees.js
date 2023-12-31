const express = require("express");
const router = express.Router();

const data = []

data.employees = require('./../../data/employeeData.json')

router.route('/employees')
    .get((req,res)=> {
        res.json(data.employees)
    })
    .post((req,res)=> {
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname,
        })
    })
    .put((req,res)=> {
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname,
        })
    })
    .delete((req, res) => {
        res.json({"id": req.body.id})
    })

    router.route('/employees/:id') 
        .get((req, res) => {
            res.json({"id": req.params.id})
        })
module.exports = router