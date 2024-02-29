const mongoose = require('mongoose')

const chatSchema = mongoose.Schema(
    {
        chatId:{
            type:String
        },

    },
    {
        Timestamps:true
    }
)

const chatModel = mongoose.model('Chat',chatSchema)
module.exports = chatModel