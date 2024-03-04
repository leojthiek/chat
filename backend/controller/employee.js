const validate = require("validator")

const Employeemodel = require("../model/employeeModel")

const createEmployee = async (req, res) => {
  try {
    const formdata = req.body
    const file = req.file

    if (
      !formdata.name ||
      !formdata.mobile ||
      !formdata.email ||
      !formdata.gender ||
      !formdata.designation ||
      !formdata.course
    ) {
      return res.status(400).json({ error: "Please fill all the fields" })
    }
    if (!validate.isEmail(formdata.email)) {
      return res.status(400).json({ error: "Please enter a valid email" })
    }

    if (
      !validate.isNumeric(formdata.mobile) &&
      !validate.isLength(mobile, { max: 10, min: 10 })
    ) {
      return res.status(400).json({
        error: "Mobile No. must be a number and must be 10 characters",
      })
    }

    const emailExists = await Employeemodel.findOne({ email: formdata.email })

    if (emailExists) {
      return res.status(400).json({ error: "Email already exists" })
    }

    const nameExists = await Employeemodel.findOne({name:formdata.name})

    if(nameExists){
      return res.status(400).json({ error: "Name already exists" })
    }

    if (file) {
      const imagePath = `upload/${file.filename}`
      formdata.image = imagePath
    }

    const newEmployee = new Employeemodel(formdata)
    await newEmployee.save()

    res.status(200).json({ newEmployee })
  } catch (error) {
    console.log(error)

    res
      .status(500)
      .json({ error: "Inrernal server error while creating employee" })
  }
}

const updateEmployee = async (req, res) => {
  try {
    const { employeeId } = req.query;

    const formdata = req.body
    const file = req.file


    const existingEmployee = await Employeemodel.findById(employeeId)

    if (!existingEmployee) {
      return res.status(400).json({ error: "Employee not found" })
    }

    const updatedFields = { ...existingEmployee._doc, ...formdata }
    
    if (
        !updatedFields.name ||
        !updatedFields.mobile ||
        !updatedFields.email ||
        !updatedFields.gender ||
        !updatedFields.designation ||
        !updatedFields.course
      ) {
        return res.status(400).json({ error: "Please fill all the required fields" });
      }

      const emailexists = await Employeemodel.findOne({email: updatedFields.email})

      if ( updatedFields.email &&
        updatedFields.email !== existingEmployee.email) {
        return res.status(400).json({ error: "Email already exists" })
      }

      if (!validate.isEmail(updatedFields.email)) {
        return res.status(400).json({ error: "Please enter a valid email" });
      }
  
      if (
        !validate.isNumeric(updatedFields.mobile) ||
        !validate.isLength(updatedFields.mobile.toString(), { min: 10, max: 10 })
      ) {
        return res.status(400).json({
          error: "Mobile No. must be a number and must be 10 characters",
        });
      }

      if (file) {
        const imagePath = `upload/${file.filename}`;
        updatedFields.image = imagePath;
      }
  
      const updatedEmployee = await Employeemodel.findByIdAndUpdate(
        employeeId,
        updatedFields,
        { new: true }
      );
  
      res.status(200).json({ updatedEmployee });
  } catch (error) {
    console.log(error)
    res
    .status(500)
    .json("Internal server error occurred while updating employee")
  }
}

const getAllEmployee = async (req, res) => {
  try {
     const allEmployee = await Employeemodel.find()

     if(allEmployee){
        return res.status(200).json({allEmployee})
     }
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json("Internal server error occurred while getting all employees")
  }
}

const deleteEmployee = async(req,res)=>{
    try {
        const { employeeId } = req.query;

        const existingEmployee = await Employeemodel.findById(employeeId)

        if (!existingEmployee) {
          return res.status(400).json({ error: "Employee not found" })
        }

        const deletedEmployee = await Employeemodel.findByIdAndDelete(employeeId)

        res.status(200).json({ deletedEmployee })
    } catch (error) {
        console.log(error)
        res
      .status(500)
      .json("Internal server error occurred while deleting employee")
    }

}

const getOneEmployee = async(req,res)=>{
  try {
    const { employeeId } = req.query;

    const existingEmployee = await Employeemodel.findById(employeeId)

    if (!existingEmployee) {
      return res.status(400).json({ error: "Employee not found" })
    }
    res.status(200).json({ existingEmployee })
  } catch (error) {
    console.log(error)
    res
     .status(500)
     .json("Internal server error occurred while getting one employee")
  }
}



module.exports = { getAllEmployee, createEmployee, updateEmployee , deleteEmployee,getOneEmployee}
