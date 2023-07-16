const Employee =  require('../model/Employee')

const getAllEmployees = async (req, res) => {
    const employees = await Employee.find().exec();
    if(!employees) return res.status(204).json({"message": "No Employee exists"});
    res.json(employees);
}

const createNewEmployee = async (req, res) => {
    if (!req.body.firstname || !req.body.lastname) {
        return res.status(400).json({ 'message': 'First and last names are required.' });
    }
    try {
        
        const newEmp = await Employee.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
        })
        res.status(201).json(newEmp);

    } catch (error) {
        console.error(error)
    }
};

const updateEmployee = async (req, res) => {

    if(!req?.body?.id)  return res.status(204).json({"messsage": "ID parameter is required"});

    const employee = await Employee.findOne({_id: req.body.id}).exec();
    console.log("Em", employee)
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` });
    }

    if (req.body?.firstname) employee.firstname = req.body?.firstname;
    if (req.body?.lastname) employee.lastname = req.body?.lastname;
    
    const updatedEmp = await employee.save();

    res.json(updatedEmp);
}

const deleteEmployee = async (req, res) => {
    if(!req?.body?.id)  return res.status(204).json({"messsage": "ID parameter is required"});

    const employee = await Employee.findOne({_id: req.body.id}).exec();

    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` });
    }
    const delEmp = await Employee.deleteOne({_id : req.body.id});

    res.json(delEmp);
}

const getEmployee = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ "message": "ID parameter is required" });
    }

    try {
        const employee = await Employee.findOne({ _id: req.params.id }).exec();

        if (!employee) {
            return res.status(400).json({ "message": `Employee ID ${req.params.id} not found` });
        }

        res.json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": "Internal server error" });
    }
};


module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}