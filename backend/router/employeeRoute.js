const express = require('express')
const multer = require('multer')
const path = require('path')

const { getAllEmployee, createEmployee, updateEmployee, deleteEmployee, getOneEmployee } = require('../controller/employee')
const { admin, protect } = require('../middleware/userAuth')

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'frontend/public/upload');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({storage:storage})



router.route('/all-employee').get(protect,admin,getAllEmployee)
router.route('/create-employee').post(protect,admin,upload.single('image'), createEmployee)
router.route("/update-employee").put(protect, admin, upload.single("image"), updateEmployee);
router.route("/delete-employee").delete(protect,admin,deleteEmployee)
router.route('/one-employee').get(protect,admin,getOneEmployee)


module.exports = router