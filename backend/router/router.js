const express = require('express')
const { joinController } = require('../controller/joinController')


const router = express.Router()

router.route('/join').get(joinController)

module.exports = router