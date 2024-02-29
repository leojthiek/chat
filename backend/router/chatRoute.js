const express = require('express')
const { createChat } = require('../controller/chatController')

const router = express.Router()


router.route('/').post(createChat)

module.exports = router