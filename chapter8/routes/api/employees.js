const express = require("express");
const router = express.Router();
const employeeController = require('../../controllers/employeeController')

router.route('/employees')
    .get(employeeController.getAllEmployees)
    .post(employeeController.createEmployee)
    .put(employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee)

    router.route('/employees/:id') 
        .get(employeeController.getEmployee)
module.exports = router